import { useEffect, useRef, useState } from "react";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { X } from "lucide-react";
import { Map, MapMarker, MarkerContent, useMap } from "@/components/ui/map";
import headerLogo from "../assets/logo/icon-w.png";
import { officeDetails } from "../data/officeDetails";
import officePhotos from "../data/officePhotos.json";

const INITIAL_VIEW = { center: [15, -25], //longitude, latitude
  zoom: 0.2, // mas zoom = mas cerca
  bearing: 0, pitch: 0 };

// Match the restrained reveals used in SobreN; the camera eases in and out.
const PANEL_EASE = [0.16, 1, 0.3, 1];
const CAMERA_EASE = cubicBezier(0.45, 0, 0.2, 1);
const CAMERA_DURATION = 2200;

const CONTINENTS = {
  africa: { name: "Africa" },
  asia: { name: "Asia" },
  europe: { name: "Europe" },
  northAmerica: { name: "North America" },
  southAmerica: { name: "South America" },
  oceania: { name: "Oceania" },
  antarctica: { name: "Antarctica" },
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
  ["antarctica", "Aurora Station", -70.16, 125.67],
];

function LockMapInteraction() {
  const { map } = useMap();

  useEffect(() => {
    if (!map) return;

    // Also lock an existing instance retained by Fast Refresh.
    map.scrollZoom.disable();
    map.boxZoom.disable();
    map.dragRotate.disable();
    map.dragPan.disable();
    map.keyboard.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
    map.touchPitch.disable();
  }, [map]);

  return null;
}

function Mapa() {
  const mapRef = useRef(null);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const mapContainerRef = useRef(null);
  // Enable the requested transitions locally, with an explicit motion control.
  const [reduceMotion, setReduceMotion] = useState(false);
  const contentVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: PANEL_EASE },
    },
  };

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // Keep the canvas and markers aligned when the container resizes.
    const observer = new ResizeObserver(() => mapRef.current?.resize());
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleOfficeClick = (continentKey, city, longitude, latitude) => {
    const office = officeDetails[city];
    setSelectedContinent({ ...CONTINENTS[continentKey], ...office, image: officePhotos[office.photo], key: city, city, center: [longitude, latitude] });
    mapRef.current?.stop();
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 5,
      duration: reduceMotion ? 0 : CAMERA_DURATION,
      easing: CAMERA_EASE,
      essential: !reduceMotion,
    });
  };

  const handleClose = () => {
    setSelectedContinent(null);
    mapRef.current?.stop();
    mapRef.current?.flyTo({
      ...INITIAL_VIEW,
      duration: reduceMotion ? 0 : CAMERA_DURATION,
      easing: CAMERA_EASE,
      essential: !reduceMotion,
    });
  };

  return (
    <section className="relative overflow-hidden bg-black px-8 pb-24 pt-[88px] text-slate-100 before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[before:opacity-[0.035] max-[640px]:px-[18px] max-[640px]:pb-16 max-[640px]:pt-[58px]">
      <div className="relative z-10 mx-auto mb-7 max-w-[1400px]">
        <h2 className="font-syncopate mb-3.5 text-[clamp(2rem,4vw,4.5rem)] font-black uppercase leading-[0.98] tracking-[-0.055em] text-white">Global Presence</h2> 

      </div>
      <div style={{ gridTemplateColumns: "min(340px, 65%) minmax(0, 1fr)" }} className="relative z-10 mx-auto grid h-[min(600px,65vw)] min-h-[420px] max-w-[1400px] overflow-hidden border border-[#9dd8d6]/[0.34] bg-transparent max-[640px]:h-[620px] max-[640px]:min-h-0">

        <div className="relative min-w-0 overflow-hidden border-r border-[#9dd8d6]/50 bg-black/95">
        <AnimatePresence initial={false}>
          {selectedContinent && (
            <motion.div
              key={selectedContinent.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, ease: PANEL_EASE }}
              className="pointer-events-none absolute inset-0"
            >
              <motion.img
                src={selectedContinent.image?.image}
                alt={`Vista de ${selectedContinent.country}`}
                initial={{ scale: reduceMotion ? 1 : 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 1.1, ease: PANEL_EASE }}
                className="h-full w-full object-cover object-center saturate-[0.7]"
                onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,9,16,0.7)_0%,rgba(3,9,16,0.15)_45%,rgba(3,9,16,0.6)_100%)]" />
            </motion.div>
          )}
        </AnimatePresence>
<AnimatePresence mode="wait" initial={false}>
  {selectedContinent ? (
    <motion.aside
      key={selectedContinent.key}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: { opacity: 0, x: reduceMotion ? 0 : -90 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: reduceMotion ? 0 : 0.85,
            ease: PANEL_EASE,
            delayChildren: reduceMotion ? 0 : 0.18,
            staggerChildren: reduceMotion ? 0 : 0.1,
          },
        },
        exit: {
          opacity: 0,
          x: reduceMotion ? 0 : -60,
          transition: { duration: reduceMotion ? 0 : 0.4, ease: "easeInOut" },
        },
      }}
      
      className="absolute inset-0 z-20 flex flex-col justify-between overflow-hidden text-left max-[640px]:inset-x-2 max-[640px]:top-2 max-[640px]:bottom-2"
      aria-live="polite"
    >
      {/* Encabezado superior dentro de la tarjeta */}
      <div className="relative flex items-center justify-between gap-2 p-5 pb-0 max-[640px]:p-3 max-[640px]:pb-0">
        <motion.h3 
          variants={contentVariants} 
          className="font-zalando-sans-expanded text-[clamp(0.85rem,1.2vw,1rem)] font-semibold uppercase tracking-[0.05em] text-white/80"
        >
          {selectedContinent.name}
        </motion.h3>
        <button
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-black/40 text-white/80 transition-colors hover:bg-black/70 hover:text-white focus:outline-none"
          type="button"
          aria-label="Cerrar oficinas"
          onClick={handleClose}
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Bloque inferior con fondo oscuro y borde superior turquesa para el País y Descripción */}
      <motion.div 
        variants={contentVariants} 
        className="mt-auto w-full bg-[linear-gradient(to_top,rgba(11,17,24,0.95)_50%,rgba(11,17,24,0.7)_0%,transparent_100%)] p-6 pt-12  max-[640px]:p-3.5"
      >
        <h4 className="mb-2 font-zalando-sans-expanded text-[clamp(1.2rem,1.8vw,1.5rem)] font-semibold leading-tight tracking-[0.02em] text-[#9dd8d6]">
          {selectedContinent.country}
        </h4>
        <p className="font-zalando-sans-semi-expanded text-[0.82rem] leading-[1.65] text-white/80">
          {selectedContinent.description}
        </p>
      </motion.div>
    </motion.aside>
  ) : (
    <motion.div
      key="office-placeholder"
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: reduceMotion ? 1 : 0.82,
        transition: { duration: reduceMotion ? 0 : 0.4, ease: "easeInOut" },
      }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: PANEL_EASE }}
      className="absolute inset-0 flex items-center justify-center p-8"
    >
      <img
        src={headerLogo}
        alt="Logo"
        className="opacity-20 h-auto w-full max-w-[150px] object-contain"
      />
    </motion.div>
  )}
</AnimatePresence>
        </div>
        <div ref={mapContainerRef} className="relative min-w-0 overflow-hidden">
        <Map ref={mapRef} {...INITIAL_VIEW} projection="globe" interactive={false}>
          <LockMapInteraction />
          {OFFICE_MARKERS.map(([continentKey, city, latitude, longitude]) => (
            <MapMarker
              key={city}
              longitude={longitude}
              latitude={latitude}
              onClick={() => handleOfficeClick(continentKey, city, longitude, latitude)}
            >
              <MarkerContent>
                <motion.button
                  type="button"
                  initial={false}
                  animate={{
                    scale: selectedContinent?.city === city ? 1.25 : 1,
                    backgroundColor: selectedContinent?.city === city ? "#ffffff" : "#9dd8d6",
                  }}
                  whileHover={reduceMotion ? undefined : { scale: 1.4 }}
                  whileTap={reduceMotion ? undefined : { scale: 1.1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: PANEL_EASE }}
                  className="block h-[15px] w-[15px] cursor-pointer rounded-full border-[3px] border-[#071722] shadow-[0_0_0_5px_rgba(157,216,214,0.22),0_5px_14px_rgba(0,0,0,0.38)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  aria-label={`Oficina de ${city}`}
                  aria-pressed={selectedContinent?.city === city}
                />
              </MarkerContent>
            </MapMarker>
          ))}
        </Map>

        </div>
      </div>
    </section>
  );
}

export default Mapa;
