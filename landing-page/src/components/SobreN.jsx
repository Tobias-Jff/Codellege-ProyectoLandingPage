import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import area01 from "../assets/carrusel/area01.jpg";
import area02 from "../assets/carrusel/area02.jpg";
import area03 from "../assets/carrusel/area03.jpg";
import area04 from "../assets/carrusel/area04.jpg";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   ASSETS
   ========================================================= */

const ASSETS = {

  earth: "/vid/earth.mp4",
  galaxy: "/vid/galaxy.mp4",

  tabs: {
    energy: "/ima/energia.avif",
    robotics: "/ima/rob.avif",
    biotech: "/ima/biot.avif",
    humanity: "/ima/humanidad.avif",
  },
};

/* =========================================================
   DATA
   ========================================================= */

const tabs = {
  energy: {
    label: "ENERGY",
    number: "01",
    eyebrow: "366-0",

    title: "Powering a cleaner civilization.",
    description:
      "366-0 is our renewable energy technology, designed to provide affordable and exceptionally low-impact power. Generated across our plants around the world, it is helping build a cleaner and more accessible energy future.",
    image: ASSETS.tabs.energy,
  },

  robotics: {
    label: "ROBOTICS",
    number: "02",
    eyebrow: "Model 3",
    title: "Extending human potential",
    description:
      "We create intelligent machines designed to work alongside humanity, automate complex tasks, and expand what people can accomplish.",
    image: ASSETS.tabs.robotics,
  },

  biotech: {
    label: "BIOTECH",
    number: "03",
    eyebrow: "X-Gen",

    title: "Engineering a healthier future.",
    description:
      "We explore the intersection of biology and technology to develop solutions for human health, food production, and the challenges of a growing world.",
    image: ASSETS.tabs.biotech,
  },

  humanity: {
    label: "HUMANITY",
    number: "04",
    eyebrow: "Hope",
    title: "Technology in service of everyone.",
    description:
      "Our ultimate goal is not technological advancement alone. It is using that advancement to reduce poverty, fight hunger, protect our planet, and improve the quality of human life.",
    image: ASSETS.tabs.humanity,
  },
};

/* =========================================================
   CAROUSEL DATA — VITRINA DE PROYECTOS / LOGROS REALES
   ========================================================= */

const carrusel = [
  {
    id: "01",
    image: area01,
    category: "ENERGY",
    metric: "50",
    metricUnit: "MW",
    title: "Solar Plant — Sonora",
    description:
      "Our first renewable energy installation, now powering more than 30,000 homes with clean electricity.",
  },
  {
    id: "02",
    image: area02,
    category: "ROBOTICS",
    metric: "15",
    metricUnit: "plants",
    title: "Autonomous Assembly Line",
    description:
      "Industrial automation system deployed across 15 plants, cutting production time by 40%.",
  },
  {
    id: "03",
    image: area03,
    category: "BIOTECH",
    metric: "200",
    metricUnit: "%",
    title: "Next-Gen Bioreactor",
    description:
      "Optimized cell culture technology that more than doubled the production of therapeutic proteins.",
  },
  {
    id: "04",
    image: area04,
    category: "HUMANITY",
    metric: "40,000",
    metricUnit: "+",
    title: "Clean Water Program",
    description:
      "Bringing clean water access to over 40,000 people in rural communities through our own filtration technology.",
  },
];

// Tiempo por slide (ms). Es la ÚNICA fuente de verdad para la
// duración: tanto la barra de progreso como el cambio automático
// de imagen se calculan a partir de este mismo valor con rAF,
// por lo que nunca pueden desincronizarse.
const AUTOPLAY_MS = 8000;

// Transición horizontal fluida y sin tiempo muerto: al no usar
// mode="wait" en el AnimatePresence del slide, la imagen entrante
// se superpone con la saliente, evitando el destello negro.
const SLIDE_TRANSITION = {
  x: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  },
  opacity: {
    duration: 0.35,
    ease: "easeInOut",
  },
};

/* =========================================================
   ANIMATION
   ========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const slideVariant = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),

  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },

  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function SobreNosotros() {
  const [tabActiva, setTabActiva] = useState("energy");
  const [slideActivo, setSlideActivo] = useState(0);
  const [direction, setDirection] = useState(0);

  // estado para mantener la luminosidad del hero superior
  const [heroSelected, setHeroSelected] = useState(false);


  // progreso real (0–100) de la barra, calculado cuadro a cuadro
  const [progress, setProgress] = useState(0);

  const tabActual = tabs[tabActiva];
  const slideActual = carrusel[slideActivo];

  const cambiarSlide = (direccion) => {
    setDirection(direccion);
    setSlideActivo((actual) => (actual + direccion + carrusel.length) % carrusel.length);
  };

  // Reinicia el conteo cada vez que cambia el slide (automático o manual)
  const elapsedRef = useRef(0);
  useEffect(() => {
    elapsedRef.current = 0;
  
  }, [slideActivo]);

 
  useEffect(() => {
  let rafId;
  let last = performance.now();

  const tick = (now) => {
    elapsedRef.current += now - last;
    last = now;

    const pct = Math.min(
      (elapsedRef.current / AUTOPLAY_MS) * 100,
      100
    );

    setProgress(pct);

    if (pct >= 100) {
      cambiarSlide(1);
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(rafId);
}, [slideActivo]);

  // permitir cerrar la luminosidad con Escape (mejora de accesibilidad)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setHeroSelected(false);
      }
      if (e.key === "ArrowLeft") cambiarSlide(-1);
      if (e.key === "ArrowRight") cambiarSlide(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Skip link visible on focus (keyboard users / AT) */}
      <a
        href="#main-showcase"
        className="sr-only focus:left-4 focus:top-4 focus:z-50 focus:absolute focus:bg-black focus:text-white focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>

      {/* Hidden live region to announce hero selection changes to AT users */}
      <div aria-live="polite" className="sr-only">
        {heroSelected ? "Imagen principal activada" : "Imagen principal desactivada"}
      </div>

      <section
        id="aboutUs"
        aria-labelledby="sobre-nosotros-title"
        className="
          relative
          overflow-hidden
          bg-black
          text-white
          selection:bg-white
          selection:text-black
          py-20
        "
      >
      

        {/* =====================================================
            EARTH — OPERACIÓN
        ===================================================== */}

        <section className="relative w-full h-[30vh] min-h-[600px] overflow-hidden bg-black">
          {/* VIDEO */}
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src={ASSETS.earth}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* CONTENIDO */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-end justify-end pb-16 sm:pb-20 lg:pb-24">
            <div className="w-5/8 mb-16">
              {/* TÍTULO */}
              <h2 className="text-6xl font-syncopate font-black tracking-[-0.055em] leading-[0.95] text-white">
                WE IMAGINE THE GREATEST
              </h2>
            </div>
          </div>
        </section>

        <div
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 
        pt-0"
        >
          {/* =====================================================
              04 — MISSION / TABS
          ===================================================== */}

          <section aria-labelledby="mision-title" className="mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative aspect-[4/5] bg-zinc-950 border border-zinc-900 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={tabActiva}
                      src={tabActual.image}
                      alt={tabActual.title}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.45] contrast-125"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                  <div className="absolute bottom-6 left-6">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">
                      {tabActual.number} / {tabActual.eyebrow}
                    </span>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <h2
                  id="mision-title"
                  className="font-zalando-sans-expanded text-start mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-tight"
                >
                  We push technology beyond what is possible.
                </h2>

                <div
                  role="tablist"
                  aria-label="Información sobre EGCO"
                  className="mt-12 flex border-b border-zinc-900 overflow-x-auto"
                >
                  {Object.entries(tabs).map(([key, tab]) => {
                    const active = tabActiva === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-controls={`panel-${key}`}
                        onClick={() => setTabActiva(key)}
                        className={`relative shrink-0 px-5 py-4 first:pl-0 font-mono text-[10px] tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                          active ? "text-white" : "text-zinc-600 hover:text-zinc-300"
                        }`}
                      >
                        <span className="mr-2 text-zinc-700">{tab.number}</span>
                        {tab.label}
                        {active && (
                          <motion.span
                            layoutId="active-tab"
                            className="absolute bottom-0 left-0 right-0 h-px bg-white"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div id={`panel-${tabActiva}`} role="tabpanel" className="relative min-h-[270px] pt-9">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tabActiva}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
                        {tabActual.eyebrow}
                      </span>
                      <h3 className="text-start font-zalando-sans-expanded mt-3 text-2xl sm:text-3xl font-bold tracking-tight max-w-2xl">
                        {tabActual.title}
                      </h3>
                      <p className="text-start font-zalando-sans mt-5 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                        {tabActual.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              07 — DIFFERENTIATOR (video ciudad)
          ===================================================== */}

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="relative left-1/2 w-screen -translate-x-1/2 mt-12 min-h-[620px] overflow-hidden"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={ASSETS.galaxy}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />

            <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

            <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-8 sm:p-10 lg:p-14">
                <p className="text-start font-zalando-sans-expanded uppercase text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.035em] leading-tight">
                  We don´t develop technology just because we can.
                </p>

                <p className="text-start font-dm-sans mt-4 text-slate-200/80 leading-relaxed max-w-2xl">
                  Every breakthrough has a purpose. At EGCO, we pursue technology that can solve
                  real problems, expand human potential, and create a better future for everyone.
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* =====================================================
            CAROUSEL SECTION — VITRINA DE PROYECTOS / LOGROS
            Full-bleed: rompe el contenedor max-w-7xl y ocupa
            todo el ancho de la pantalla, pegado al bloque anterior.
        ===================================================== */}

        <section
          id="main-showcase"
          aria-label="Proyectos y logros de la compañía"
          className="relative -mt-px w-screen left-1/2 -translate-x-1/2"
        >
          <div
            className="relative w-full h-[480px] sm:h-[580px] lg:h-[750px] overflow-hidden"
          >
            {/* SLIDES — sin mode="wait": la imagen entrante se
                superpone a la saliente, sin destello negro */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={slideActivo}
                custom={direction}
                variants={slideVariant}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SLIDE_TRANSITION}
                className="absolute inset-0"
              >
                <img
                  src={slideActual.image}
                  alt={slideActual.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                {/* Difuminado general: da profundidad a toda la imagen */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />

                {/* Difuminado reforzado en la mitad inferior, donde
                    vive el texto del proyecto — legible sin importar
                    qué tan clara sea la foto */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                {/* CONTENIDO DIRECTAMENTE EN LA IMAGEN */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <div
                    className="
                      absolute
                      left-6
                      sm:left-10
                      lg:left-16
                      bottom-24
                      sm:bottom-28
                      lg:bottom-32
                      max-w-2xl
                      text-left
                    "
                  >
                    <span className="font-mono ml-[2px] text-[10px] tracking-[0.2em] text-zinc-200">
                      {slideActual.category}
                    </span>

                    <h3
                      className="
                        mt-2
                        font-zalando-sans-expanded
                        font-black
                        text-3xl
                        sm:text-5xl
                        lg:text-6xl
                        tracking-[-0.03em]
                        leading-[0.95]
                        text-white
                        mb-4
                        whitespace-normal
                        sm:whitespace-nowrap
                      "
                    >
                      {slideActual.title}
                    </h3>

                    <p
                      className="
                        text-base
                        font-dm-sans
                        text-slate-200/80
                        leading-relaxed
                        max-w-xl
                      "
                    >
                      {slideActual.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* NAVEGACIÓN — barra de progreso (sincronizada con rAF)
                + índice de proyectos */}


            {/* FLECHA IZQUIERDA */}
            <button
              type="button"
              onClick={() => cambiarSlide(-1)}
              aria-label="Proyecto anterior"
              className="absolute left-6 top-1/2 -translate-y-1/2 grid size-8 place-items-center text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-10 z-20"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>

            {/* FLECHA DERECHA */}
            <button
              type="button"
              onClick={() => cambiarSlide(1)}
              aria-label="Siguiente proyecto"
              className="absolute right-6 top-1/2 -translate-y-1/2 grid size-8 place-items-center text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-10 z-20"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </section>
      </section>
    </>
  );
}
