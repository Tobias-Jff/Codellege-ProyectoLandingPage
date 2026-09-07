import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Map, MapControls, MapMarker, MarkerContent } from "@/components/ui/map";

const CONTINENTS = {
  africa: {
    name: "Africa",
    eyebrow: "Regional presence",
    offices: [
      ["Lagos", "Nigeria", "Marketing and communications"],
      ["Nairobi", "Kenya", "Innovation and partnerships"],
      ["Cape Town", "South Africa", "Operations"],
    ],
  },
  asia: {
    name: "Asia",
    eyebrow: "Regional presence",
    offices: [
      ["Singapur", "Singapore", "Technology and innovation"],
      ["Tokio", "Japan", "Research"],
      ["Bangalore", "India", "Community and growth"],
    ],
  },
  europe: {
    name: "Europe",
    eyebrow: "Regional presence",
    offices: [
      ["Madrid", "Spain", "Regional operations"],
      ["Berlin", "Germany", "Innovation"],
      ["Londres", "United Kingdom", "Global relations"],
    ],
  },
  northAmerica: {
    name: "North America",
    eyebrow: "Regional presence",
    offices: [
      ["New York", "United States", "Finance"],
      ["Toronto", "Canada", "Research"],
      ["Mexico City", "Mexico", "Regional impact"],
    ],
  },
  southAmerica: {
    name: "South America",
    eyebrow: "Regional presence",
    offices: [
      ["Sao Paulo", "Brasil", "Operations"],
      ["Bogota", "Colombia", "Community and partnerships"],
      ["Buenos Aires", "Argentina", "Culture"],
    ],
  },
  oceania: {
    name: "Oceania",
    eyebrow: "Regional presence",
    offices: [
      ["Sydney", "Australia", "Technology"],
      ["Melbourne", "Australia", "Service Design"],
      ["Auckland", "New Zealand", "Alliances"],
    ],
  },
  antarctica: {
    name: "Antarctica",
    eyebrow: "Regional presence",
    offices: [
      ["Aurora Station", "Antarctica", "Exploration and research"],
    ],
  },
};

const OFFICE_MARKERS = [
  ["africa", "Lagos", 3.38, 6.52],
  ["africa", "Nairobi", -1.29, 36.82],
  ["africa", "Ciudad del Cabo", -33.92, 18.42],
  ["asia", "Singapur", 1.35, 103.82],
  ["asia", "Tokio", 35.68, 139.69],
  ["asia", "Nueva Delhi", 28.61, 77.21],
  ["europe", "Madrid", 40.42, -3.7],
  ["europe", "Berlin", 52.52, 13.4],
  ["europe", "Londres", 51.51, -0.13],
  ["northAmerica", "Nueva York", 40.71, -74.01],
  ["northAmerica", "Toronto", 43.65, -79.38],
  ["northAmerica", "Ciudad de Mexico", 19.43, -99.13],
  ["southAmerica", "Sao Paulo", -23.55, -46.63],
  ["southAmerica", "Bogota", 4.71, -74.07],
  ["southAmerica", "Buenos Aires", -34.6, -58.38],
  ["oceania", "Sydney", -33.87, 151.21],
  ["oceania", "Melbourne", -37.81, 144.96],
  ["oceania", "Auckland", -36.85, 174.76],
  ["antarctica", "Aurora Station", -78.16, 166.67],
];

function Mapa() {
  const mapRef = useRef(null);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });

  const updatePanelPosition = (marker) => {
    if (!mapRef.current || !marker) return;

    const mapContainer = mapRef.current.getContainer();
    const width = mapContainer.clientWidth;
    const height = mapContainer.clientHeight;
    const { x, y } = mapRef.current.project([marker.lng, marker.lat]);
    const panelWidth = 340;
    const panelHeight = 360;
    const gap = 18;

    const prefersLeft = x > width - panelWidth - 60;
    const nextLeft = prefersLeft
      ? x - panelWidth - gap
      : x + gap;
    const nextTop = Math.min(Math.max(y - panelHeight / 2, 18), height - panelHeight - 18);

    setPanelPosition({
      x: Math.min(Math.max(nextLeft, 12), width - panelWidth - 12),
      y: Math.min(Math.max(nextTop, 12), height - panelHeight - 12),
    });
  };

  useEffect(() => {
    if (!selectedContinent?.marker || !mapRef.current) return;

    updatePanelPosition(selectedContinent.marker);

    const map = mapRef.current;
    const handleMapChange = () => updatePanelPosition(selectedContinent.marker);

    map.on("move", handleMapChange);
    map.on("zoom", handleMapChange);
    map.on("pitch", handleMapChange);
    map.on("rotate", handleMapChange);

    return () => {
      map.off("move", handleMapChange);
      map.off("zoom", handleMapChange);
      map.off("pitch", handleMapChange);
      map.off("rotate", handleMapChange);
    };
  }, [selectedContinent]);

  const handleOfficeClick = (continentKey, longitude, latitude) => {
    setSelectedContinent({
      ...CONTINENTS[continentKey],
      marker: { lng: longitude, lat: latitude },
    });
  };

  return (
    <section className="relative overflow-hidden bg-black px-8 pb-24 pt-[88px] text-slate-100 before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] before:bg-[size:5rem_5rem] before:opacity-[0.035] max-[640px]:px-[18px] max-[640px]:pb-16 max-[640px]:pt-[58px]">
      <div className="relative z-10 mx-auto mb-7 max-w-[1400px]">
        <h2 className="font-syncopate mb-3.5 text-[clamp(2rem,4vw,4.5rem)] font-black uppercase leading-[0.98] tracking-[-0.055em] text-white">Global Presence</h2>
      </div>
      <div className="relative z-10 mx-auto h-[min(580px,62vw)] min-h-[420px] max-w-[1400px] overflow-hidden border border-[#9dd8d6]/[0.34] bg-transparent max-[640px]:h-[620px] max-[640px]:min-h-0">
        <Map ref={mapRef} center={[10, 25]} zoom={1.5} projection="globe">
          <MapControls showCompass position="bottom-right" />
          {OFFICE_MARKERS.map(([continentKey, city, latitude, longitude]) => (
            <MapMarker
              key={city}
              longitude={longitude}
              latitude={latitude}
              onClick={() => handleOfficeClick(continentKey, longitude, latitude)}
            >
              <MarkerContent>
                <span
                  className="block h-[15px] w-[15px] rounded-full border-[3px] border-[#071722] bg-[#9dd8d6] shadow-[0_0_0_5px_rgba(157,216,214,0.22),0_5px_14px_rgba(0,0,0,0.38)] transition-transform duration-200 hover:scale-125 hover:bg-white"
                  aria-label={`Oficina de ${city}`}
                />
              </MarkerContent>
            </MapMarker>
          ))}
        </Map>

        <AnimatePresence mode="wait">
          {selectedContinent && (
            <motion.aside
              key={selectedContinent.marker.lng + selectedContinent.marker.lat}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="pointer-events-auto absolute z-20 w-[min(340px,calc(100%-48px))] border border-[#9dd8d6]/50 bg-black/95 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.28)] max-[640px]:w-auto"
              style={{
                left: `${panelPosition.x}px`,
                top: `${panelPosition.y}px`,
              }}
              aria-live="polite"
            >
              <button
                className="absolute right-4 top-4 cursor-pointer border-0 bg-transparent text-white/70 transition-colors hover:text-white"
                type="button"
                aria-label="Cerrar oficinas"
                onClick={() => setSelectedContinent(null)}
              >
                <X size={16} aria-hidden="true" />
              </button>
              <p className="mb-3 font-zalando-sans-semi-expanded text-[0.72rem] uppercase tracking-[0.16em] text-[#9dd8d6]">{selectedContinent.eyebrow}</p>
              <h3 className="mb-[22px] font-zalando-sans-expanded font-bold text-[2.25rem] tracking-[-0.06em] text-white">{selectedContinent.name}</h3>
              <div className="grid gap-4">
                {selectedContinent.offices.map(([city, country, focus], index) => (
                  <motion.div
                    key={city}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.2 }}
                    className="grid grid-cols-[28px_1fr] items-start gap-2.5 border-t border-white/[0.18] pt-3.5"
                  >
                    <span className="text-[0.72rem] font-zalando-sans-expanded tracking-[0.1em] text-[#9dd8d6]">0{index + 1}</span>
                    <div>
                      <strong className="mb-1 font-zalando-sans-semi-expanded block text-base text-white">{city}</strong>
                      <span className="block font-zalando-sans-semi-expanded text-[0.78rem] leading-[1.45] text-white/[0.62]">{country} · {focus}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Mapa;
