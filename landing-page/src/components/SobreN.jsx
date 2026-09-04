import { useEffect, useRef, useMemo, useState } from "react";
import { motion, animate, AnimatePresence } from "framer-motion";


import {
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Database,
  Lock,
  Activity,
  Network,
  Workflow,
  Search,
  PenTool,
  Code2,
  CheckCircle2,
  Target,
  
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
    biotech:"/ima/biot.avif",
    humanity:"/ima/humanidad.avif"
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
    description:"We create intelligent machines designed to work alongside humanity, automate complex tasks, and expand what people can accomplish.",
    image: ASSETS.tabs.robotics,
  },

  biotech: {
    label: "BIOTECH",
    number: "03",
    eyebrow: "X-Gen",

    title: "Engineering a healthier future.",
    description: "We explore the intersection of biology and technology to develop solutions for human health, food production, and the challenges of a growing world.",
    image: ASSETS.tabs.biotech,
  },

  humanity:{
    label: "HUMANITY",
    number: "04",
    eyebrow: "Hope",
    title:"Technology in service of everyone.",
    description:"Our ultimate goal is not technological advancement alone. It is using that advancement to reduce poverty, fight hunger, protect our planet, and improve the quality of human life.",
    image: ASSETS.tabs.humanity,
  }

};




const methodology = [
  {
    number: "01",
    title: "Entender",
    description:
      "Analizamos la operación, sus dependencias, puntos críticos y escenarios de interrupción.",

    icon: <Search />,
  },

  {
    number: "02",
    title: "Diseñar",
    description:
      "Convertimos los requerimientos operativos en una arquitectura preparada para escenarios reales.",

    icon: <PenTool />,
  },

  {
    number: "03",
    title: "Construir",
    description:
      "Implementamos los componentes necesarios manteniendo como prioridad la estabilidad del sistema.",

    icon: <Code2 />,
  },

  {
    number: "04",
    title: "Validar",
    description:
      "Probamos comportamiento, dependencias y mecanismos de recuperación antes de considerar la solución lista.",

    icon: <CheckCircle2 />,
  },
];

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

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function SobreNosotros() {
  const [tabActiva, setTabActiva] = useState("energy");

  // estado para mantener la luminosidad del hero superior
  const [heroSelected, setHeroSelected] = useState(false);

  // estado como antes para capacidades
  const [selectedCap, setSelectedCap] = useState(null);

  const tabActual = tabs[tabActiva];

  // permitir cerrar la luminosidad con Escape (mejora de accesibilidad)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setHeroSelected(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Skip link visible on focus (keyboard users / AT) */}
      <a
        href="#"
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

            <div className="w-full lg:w-1/2 xl:w-[45%]">

              {/* TÍTULO */}

              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[-0.055em] leading-[0.95] text-white">

                Future is happening

              </h2>


            </div>

          </div>


        </section>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 
        pb-28 pt-10 sm:pb-36 sm:pt-16">


          {/* =====================================================
              04 — MISSION / TABS
          ===================================================== */}

          <section aria-labelledby="mision-title" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              
              <div className="lg:col-span-5 order-2 lg:order-1">
                
                <div className="relative aspect-[4/5] bg-zinc-950 border border-zinc-900 overflow-hidden">
                  
                  <AnimatePresence mode="wait">
                    <motion.img key={tabActiva} src={tabActual.image} alt={tabActual.title} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.45] contrast-125" />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                  <div className="absolute bottom-6 left-6">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">{tabActual.number} / {tabActual.eyebrow}</span>
                  </div>

                </div>

              </div>

              {/* CONTENT */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                
                <h2 id="mision-title" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-tight">
                  We push technology beyond what is possible.
                </h2>

                <div role="tablist" aria-label="Información sobre EGCO" className="mt-12 flex border-b border-zinc-900 overflow-x-auto">
                  {Object.entries(tabs).map(([key, tab]) => {
                    const active = tabActiva === key;
                    return (
                      <button key={key} type="button" role="tab" aria-selected={active} aria-controls={`panel-${key}`} onClick={() => setTabActiva(key)} className={`relative shrink-0 px-5 py-4 first:pl-0 font-mono text-[10px] tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${active ? "text-white" : "text-zinc-600 hover:text-zinc-300"}`}>
                        <span className="mr-2 text-zinc-700">{tab.number}</span>
                        {tab.label}
                        {active && <motion.span layoutId="active-tab" className="absolute bottom-0 left-0 right-0 h-px bg-white" />}
                      </button>
                    );
                  })}
                </div>

                <div id={`panel-${tabActiva}`} role="tabpanel" className="relative min-h-[270px] pt-9">
                  <AnimatePresence mode="wait">
                    <motion.div key={tabActiva} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">{tabActual.eyebrow}</span>
                      <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight max-w-2xl">{tabActual.title}</h3>
                      <p className="mt-5 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">{tabActual.description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              
              </div>

            </div>
          </section>

          

          {/* =====================================================
              07 — DIFFERENTIATOR
          ===================================================== */}

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="relative mt-32 min-h-[520px] overflow-hidden border border-zinc-900 bg-zinc-950/40 sm:mt-40">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/vid/galaxy.mp4"
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

                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.035em] leading-tight">We don´t develop technology just because we can.</p>
                
                <p className="mt-7 text-zinc-400 leading-relaxed max-w-2xl">Every breakthrough has a purpose. At EGCO, we pursue technology that can solve real problems, expand human potential, and create a better future for everyone.</p>

              </div>

            </div>

          </motion.section>


        </div>
      </section>
    </>
  );
}