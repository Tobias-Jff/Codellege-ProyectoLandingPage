import fs from 'node:fs/promises';

const destinations = {
  nigeria: 'Lagos', kenya: 'Nairobi', 'south-africa': 'Cape_Town',
  singapore: 'Marina_Bay_Sands', japan: 'Tokyo', india: 'New_Delhi',
  spain: 'Madrid', germany: 'Berlin', 'united-kingdom': 'London',
  'united-states': 'New_York_City', canada: 'Toronto', mexico: 'Mexico_City',
  brazil: 'São_Paulo', colombia: 'Bogotá', argentina: 'Buenos_Aires',
  australia: 'Sydney', 'new-zealand': 'Auckland', antarctica: 'Paradise_Harbour',
};
const directory = new URL('../public/images/offices/', import.meta.url);
await fs.mkdir(directory, { recursive: true });
const creditsPath = new URL('../src/data/officePhotos.json', import.meta.url);
const credits = await fs.readFile(creditsPath, 'utf8').then(JSON.parse).catch(() => ({}));
async function fetchChecked(url) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'OfficePhotoPreparation/1.0 (local website development)' },
      signal: AbortSignal.timeout(30000),
    });
    if (response.status === 429 && attempt < 3) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      continue;
    }
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return response;
  }
}

for (const [slug, page] of Object.entries(destinations)) {
  if (credits[slug]) continue;
  const summary = await (await fetchChecked(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`)).json();
  if (!summary.thumbnail?.source) throw new Error(`No photo for ${page}`);
  const image = summary.thumbnail.source.replace(/\/\d+px-/, '/960px-');
  const filename = decodeURIComponent(new URL(summary.originalimage.source).pathname.split('/').pop()).replace(/^\d+px-/, '');
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.search = new URLSearchParams({ action: 'query', format: 'json', maxlag: '5', titles: `File:${filename}`, prop: 'imageinfo', iiprop: 'extmetadata|url' });
  const metadata = await (await fetchChecked(url)).json();
  const info = Object.values(metadata.query.pages)[0].imageinfo?.[0];
  if (!info) throw new Error(`Missing credits for ${filename}`);
  const photo = await fetchChecked(image);
  const extension = photo.headers.get('content-type')?.includes('png') ? 'png' : 'jpg';
  await fs.writeFile(new URL(`${slug}.${extension}`, directory), Buffer.from(await photo.arrayBuffer()));
  credits[slug] = {
    image: `/images/offices/${slug}.${extension}`,
    alt: summary.description ?? page.replaceAll('_', ' '),
    source: info.descriptionurl,
    author: info.extmetadata.Artist?.value,
    license: info.extmetadata.LicenseShortName?.value,
    licenseUrl: info.extmetadata.LicenseUrl?.value,
  };
  await fs.writeFile(new URL('../src/data/officePhotos.json', import.meta.url), JSON.stringify(credits, null, 2));
  console.log(`${slug}: ${filename} (${credits[slug].license})`);
  await new Promise(resolve => setTimeout(resolve, 4000));
}

const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const plain = value => String(value ?? '').replace(/<[^>]*>/g, '').trim();
const entries = Object.entries(credits).map(([slug, credit]) => `<article id="${slug}"><h2>${escape(slug.replaceAll('-', ' '))}</h2><p>${escape(plain(credit.author))}</p><p><a href="${escape(credit.source)}">Original photograph and attribution</a> · <a href="${escape(credit.licenseUrl || credit.source)}">${escape(credit.license)}</a></p><p>Photo displayed cropped to fit the office card. Original image available at the source link.</p></article>`).join('\n');
await fs.writeFile(new URL('credits.html', directory), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Office photo credits</title><style>body{max-width:800px;margin:48px auto;padding:0 24px;background:#0b1118;color:#e2e8f0;font:16px/1.6 system-ui}article{padding:24px 0;border-top:1px solid #334155}h2{text-transform:capitalize}a{color:#93c5fd}</style><h1>Office photo credits</h1><p>Photographs from Wikimedia Commons. Each image retains its original license.</p>${entries}</html>`);
