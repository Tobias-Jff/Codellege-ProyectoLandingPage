import { useEffect, useState } from "react";
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
    image: ASSETS.tabs.energy
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
  }};

/* =========================================================
   CAROUSEL DATA — VITRINA DE PROYECTOS / LOGROS REALES
   Cada slide es un proyecto o invento concreto: categoría,
   métrica de impacto (prueba social), título y descripción.
   ========================================================= */

const carrusel = [
  {
    id: "01",
    image: area01,
    category: "ENERGY",
    metric: "50",
    metricUnit: "MW",
    title: "Planta Solar — Sonora",
    description:
      "Nuestra primera instalación de energía renovable, hoy suministrando electricidad limpia a más de 30,000 hogares.",
  },
  {
    id: "02",
    image: area02,
    category: "ROBOTICS",
    metric: "15",
    metricUnit: "plantas",
    title: "Línea de Ensamblaje Autónoma",
    description:
      "Sistema de automatización industrial desplegado en 15 plantas, reduciendo tiempos de producción en un 40%.",
  },
  {
    id: "03",
    image: area03,
    category: "BIOTECH",
    metric: "200",
    metricUnit: "%",
    title: "Bioreactor de Nueva Generación",
    description:
      "Cultivo celular optimizado que incrementó la producción de proteínas terapéuticas en más del doble.",
  },
  {
    id: "04",
    image: area04,
    category: "HUMANITY",
    metric: "40,000",
    metricUnit: "+",
    title: "Programa de Agua Potable",
    description:
      "Acceso a agua limpia para más de 40,000 personas en comunidades rurales a través de tecnología de filtrado propia.",
  },
];

// Tiempo por slide: 7 segundos
const AUTOPLAY_MS = 7000;

// Transiciones más rápidas y fluidas: sin tiempo muerto
const SLIDE_TRANSITION = {
  x: {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  },
  opacity: {
    duration: 0.4,
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

  // pausa el autoplay del carrusel de proyectos cuando el usuario
  // pasa el mouse encima (estándar UX: no competir con la lectura)
  const [showcasePaused, setShowcasePaused] = useState(false);

  const tabActual = tabs[tabActiva];
  const slideActual = carrusel[slideActivo];

  const cambiarSlide = (direccion) => {
    setDirection(direccion);
    setSlideActivo((actual) => (actual + direccion + carrusel.length) % carrusel.length);
  };

  // Auto-carousel: avanza horizontalmente cada AUTOPLAY_MS, salvo pausa por hover
  useEffect(() => {
    if (showcasePaused) return undefined;
    const intervalo = window.setInterval(() => cambiarSlide(1), AUTOPLAY_MS);
    return () => window.clearInterval(intervalo);
  }, [showcasePaused]);

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
          border-b border-zinc-900
          selection:bg-white
          selection:text-black
          py-20
        "
      >
        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
            bg-[size:5rem_5rem]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[800px]
            h-[500px]
            rounded-full
            bg-white/[0.025]
            blur-[140px]
          "
        />

 {/* VITRINA DE PROYECTOS */}
        <div 
          id="main-showcase"
          className="relative w-full max-w-6xl mx-auto px-6"
          onMouseEnter={() => setShowcasePaused(true)}
          onMouseLeave={() => setShowcasePaused(false)}
        ></div>


        {/* =====================================================
            EARTH — OPERACIÓN
        ===================================================== */}

        <section className="relative w-full h-[115vh] min-h-[600px] overflow-hidden bg-black">
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
        pt-10 sm:pt-16"
        >
          {/* =====================================================
              04 — MISSION / TABS
          ===================================================== */}

          <section aria-labelledby="mision-title" className="mt-0">
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
              07 — DIFFERENTIATOR (video galaxy)
          ===================================================== */}

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="relative mt-32 min-h-[520px] overflow-hidden sm:mt-40"
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

            <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

            <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-8 sm:p-10 lg:p-14">
                <p className="text-start font-zalando-sans-expanded text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.035em] leading-tight">
                  We don´t develop technology just because we can.
                </p>

                <p className="text-start font-zalando-sans mt-7 text-zinc-400 leading-relaxed max-w-2xl">
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
          aria-label="Proyectos y logros de la compañía"
          className="relative -mt-px w-screen left-1/2 -translate-x-1/2"
        >

          <div
            className="relative w-full h-[420px] sm:h-[520px] lg:h-[680px] overflow-hidden"
            onMouseEnter={() => setShowcasePaused(true)}
            onMouseLeave={() => setShowcasePaused(false)}
          >
            {/* SLIDES */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
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
                {/* Degradado arriba y abajo: legibilidad del título
                    superior y del texto del proyecto inferior */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/90" />

                {/* CONTENIDO DIRECTAMENTE EN LA IMAGEN */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slideActivo}
                      initial={{ opacity: 0, x: -20, y: 10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -10, y: -5 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
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
                      <h3
                        className="
                          font-zalando-sans-expanded
                          text-4xl
                          sm:text-5xl
                          lg:text-6xl
                          font-bold
                          tracking-tight
                          text-white
                          leading-tight
                          mb-6
                        "
                      >
                        {slideActual.title}
                      </h3>

                      <p
                        className="
                          text-sm
                          sm:text-base
                          lg:text-lg
                          text-zinc-200
                          leading-relaxed
                          max-w-xl
                        "
                      >
                        {slideActual.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* NAVEGACIÓN — barra de progreso + índice de proyectos */}
            <div className="absolute bottom-6 left-6 sm:left-10 lg:left-16 right-6 sm:right-10 lg:right-16 z-20">
              <div className="relative h-px w-full bg-zinc-700/50">
                <motion.div
                  key={slideActivo}
                  className="absolute top-0 left-0 h-px bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: AUTOPLAY_MS / 1000,
                    ease: "linear",
                  }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                {carrusel.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={slideActivo === index}
                    aria-label={`Ver proyecto ${slide.title}`}
                    onClick={() => {
                      setDirection(index > slideActivo ? 1 : -1);
                      setSlideActivo(index);
                    }}
                    className={`font-mono text-xs sm:text-sm tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                      slideActivo === index ? "text-white" : "text-zinc-600 hover:text-zinc-400"
                    }`}
                  >
                    {slide.id}
                  </button>
                ))}
              </div>
            </div>

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