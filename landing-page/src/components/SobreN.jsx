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
  hero: "/ima/Lo.png",

  earth: "/vid/earth.mp4",

  capabilities: {
    infrastructure: "/ima/im.png",
    automation: "/ima/Pin.png",
    security: "/ima/SE.png",
  },

  tabs: {
    mission: "/ima/Lo.png",
    architecture:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
    security:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
};

/* =========================================================
   DATA
   ========================================================= */

const tabs = {
  mission: {
    label: "Misión",
    number: "01",
    eyebrow: "PROPÓSITO",

    title: "Construir continuidad donde detenerse no es una opción.",

    description:
      "No construimos software. Construimos continuidad. En EGCO diseñamos arquitecturas resilientes para entornos de criticidad extrema, permitiendo a organizaciones de alto impacto automatizar operaciones donde un fallo no es una opción y la desconexión no es viable.",

    image: ASSETS.tabs.mission,
  },

  architecture: {
    label: "Arquitectura",
    number: "02",
    eyebrow: "FORMA DE PENSAR",

    title: "La resiliencia comienza antes de que ocurra el fallo.",

    description:
      "Diseñamos considerando desde el inicio la disponibilidad, la redundancia, la observabilidad, la recuperación y el comportamiento del sistema ante escenarios adversos. La arquitectura no debe reaccionar al fallo: debe estar preparada para él.",

    image: ASSETS.tabs.architecture,
  },

  security: {
    label: "Seguridad",
    number: "03",
    eyebrow: "PRINCIPIO OPERATIVO",

    title: "La seguridad forma parte de la arquitectura.",

    description:
      "Integramos principios de seguridad en las decisiones de diseño, operación y automatización. Reducimos superficies de exposición y construimos controles que acompañan al sistema durante todo su ciclo de vida.",

    image: ASSETS.tabs.security,
  },
};

const principles = [
  {
    number: "01",
    icon: <Activity />,
    title: "Continuidad",
    text:
      "Diseñamos sistemas pensando en lo que sucede cuando una parte deja de funcionar.",
  },

  {
    number: "02",
    icon: <Network />,
    title: "Resiliencia",
    text:
      "La arquitectura debe tolerar condiciones adversas sin comprometer la operación completa.",
  },

  {
    number: "03",
    icon: <Workflow />,
    title: "Automatización",
    text:
      "Convertimos procesos repetitivos y críticos en flujos controlables, observables y reproducibles.",
  },

  {
    number: "04",
    icon: <Lock />,
    title: "Seguridad",
    text:
      "La protección no se agrega al final. Se considera desde las primeras decisiones de arquitectura.",
  },
];

const capabilities = [
  {
    number: "01",
    category: "INFRAESTRUCTURA",
    title: "Arquitecturas resilientes",

    description:
      "Diseño de arquitecturas orientadas a disponibilidad, redundancia, tolerancia a fallos y continuidad operativa.",

    image: ASSETS.capabilities.infrastructure,

    icon: <Database />,
  },

  {
    number: "02",
    category: "AUTOMATIZACIÓN",
    title: "Operaciones automatizadas",

    description:
      "Diseño y orquestación de procesos que reducen intervención manual y permiten operar sistemas complejos de forma consistente.",

    image: ASSETS.capabilities.automation,

    icon: <Cpu />,
  },

  {
    number: "03",
    category: "SEGURIDAD",
    title: "Seguridad desde el diseño",

    description:
      "Integración de controles, aislamiento, protección de información y principios de seguridad dentro de la arquitectura.",

    image: ASSETS.capabilities.security,

    icon: <ShieldCheck />,
  },
];

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
  const [tabActiva, setTabActiva] = useState("mission");

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

        <section className="relative w-full h-[115vh] h-[min-h-[600px]] overflow-hidden bg-black">

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


          {/* INDICADOR INFERIOR */}

          <div className="absolute bottom-6 left-6 sm:left-10 lg:left-16 z-10">

            <span className="font-mono text-[9px] tracking-[0.25em] text-white/30">
              01 / EARTH SYSTEM
            </span>

          </div>

        </section>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36">



          {/* =====================================================
              03 — PRINCIPLES
          ===================================================== */}

          <section aria-labelledby="principios-title" className="mt-28 sm:mt-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-zinc-900 pb-6">
              <div>
               
                <h2 id="principios-title" className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">Cómo pensamos.</h2>
              </div>

              <p className="font-mono text-[10px] text-zinc-600">EGCO / ENGINEERING PRINCIPLES</p>
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
              {principles.map((principle) => (
                <motion.article key={principle.number} variants={fadeUp} className="bg-black p-7 sm:p-8 min-h-[250px] flex flex-col justify-between group hover:bg-zinc-950 transition-colors duration-300">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] text-zinc-600">{principle.number}</span>
                    <div className="text-zinc-600 group-hover:text-white transition-colors">{principle.icon}</div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{principle.title}</h3>
                    <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{principle.text}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </section>

          {/* =====================================================
              04 — MISSION / TABS
          ===================================================== */}

          <section aria-labelledby="mision-title" className="mt-32 sm:mt-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* IMAGE */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative aspect-[4/5] bg-zinc-950 border border-zinc-900 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img key={tabActiva} src={tabActual.image} alt={tabActual.title} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.45] contrast-125" />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

                  <div className="absolute bottom-6 left-6">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500">{tabActual.number} / {tabActual.eyebrow}</span>
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                

                <h2 id="mision-title" className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] leading-tight">
                  Lo que hacemos
                  <br />
                  comienza con
                  <br />
                  <span className="text-zinc-600">cómo pensamos.</span>
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
              05 — CAPABILITIES (con iluminación)
          ===================================================== */}

          <section aria-labelledby="capacidades-title" className="mt-32 sm:mt-40">
            <div className="border-b border-zinc-900 pb-6">
             

              <div className="mt-3 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                <h2 id="capacidades-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Ingeniería orientada<br className="hidden sm:block" /> a la continuidad.</h2>

                <p className="max-w-md text-sm text-zinc-500 leading-relaxed">
                  Tres áreas que convergen para construir operaciones tecnológicas más resistentes, controlables y seguras.
                </p>
              </div>
            </div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {capabilities.map((capability) => {
                const isSelected = selectedCap === capability.number;
                return (
                  <motion.article key={capability.number} variants={fadeUp} onClick={() => setSelectedCap(isSelected ? null : capability.number)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedCap(isSelected ? null : capability.number); }}} tabIndex={0} role="button" aria-pressed={isSelected} className={`relative group cursor-pointer overflow-hidden border bg-zinc-950/30 transition-colors duration-300 ${isSelected ? "border-amber-400/40" : "border-zinc-900 hover:border-amber-400/40 focus-within:border-amber-400/40"}`}>
                    <div className="relative h-56 overflow-hidden bg-black">
                      <img src={capability.image} alt={`Diagrama: ${capability.title}`} className={`w-full h-full object-cover filter brightness-[0.85] saturate-[0.9] contrast-[1.05] transition-all duration-700 ease-out ${isSelected ? "brightness-100 saturate-110 scale-105" : "group-hover:brightness-100 group-hover:saturate-110 group-hover:scale-105 group-focus-within:brightness-100"}`} loading="lazy" decoding="async" />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent transition-opacity duration-700 ${isSelected ? "opacity-60" : "opacity-90 group-hover:opacity-60"}`} />
                      <div aria-hidden="true" className={`absolute inset-0 shadow-[inset_0_0_50px_10px_rgba(251,191,36,0.15)] transition-opacity duration-700 pointer-events-none ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                      <span className="absolute top-4 left-4 inline-flex items-center justify-center px-2 py-1 text-[10px] font-mono bg-black/60 border border-zinc-800">{capability.number}</span>
                    </div>

                    <div className="p-7">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-600">{capability.category}</span>
                        <div className="text-zinc-600">{capability.icon}</div>
                      </div>

                      <h3 className={`mt-6 text-xl font-semibold tracking-tight transition-colors duration-300 ${isSelected ? "text-amber-200" : "group-hover:text-amber-200"}`}>{capability.title}</h3>

                      <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{capability.description}</p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </section>

          {/* =====================================================
              06 — METHODOLOGY
          ===================================================== */}

          <section aria-labelledby="metodologia-title" className="mt-32 sm:mt-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
             

                <h2 id="metodologia-title" className="mt-4 text-3xl sm:text-4xl font-black tracking-[-0.04em]">
                  Del problema
                  <br />
                  a una arquitectura
                  <br />
                  <span className="text-zinc-600">preparada.</span>
                </h2>

                <p className="mt-6 text-sm text-zinc-500 leading-relaxed max-w-sm">Nuestro proceso parte de la operación, no de una tecnología determinada. Primero entendemos el problema; después diseñamos la solución.</p>
              </div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="lg:col-span-8 border-t border-zinc-900">
                {methodology.map((step) => (
                  <motion.div key={step.number} variants={fadeUp} className="group grid grid-cols-[55px_1fr_auto] sm:grid-cols-[80px_1fr_auto] gap-4 sm:gap-8 items-start py-7 border-b border-zinc-900">
                    <span className="font-mono text-[10px] text-zinc-600">{step.number}</span>

                    <div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm text-zinc-500 leading-relaxed max-w-xl">{step.description}</p>
                    </div>

                    <div className="text-zinc-700 group-hover:text-zinc-300 transition-colors">{step.icon}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* =====================================================
              07 — DIFFERENTIATOR
          ===================================================== */}

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mt-32 sm:mt-40 border border-zinc-900 bg-zinc-950/40">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              

              <div className="lg:col-span-8 p-8 sm:p-10 lg:p-14">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.035em] leading-tight">No diseñamos tecnología <span className="text-zinc-600"> para demostrar que podemos hacerlo.</span></p>

                <p className="mt-7 text-zinc-400 leading-relaxed max-w-2xl">La tecnología debe responder a una necesidad operativa. Por eso en EGCO cada decisión de arquitectura parte de una pregunta fundamental:</p>

                <div className="mt-8 pl-5 border-l border-zinc-700">
                  <p className="text-lg sm:text-xl font-medium text-white">¿Qué debe ocurrir cuando algo falla?</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* =====================================================
              08 — FINAL STATEMENT
          ===================================================== */}

          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-32 sm:mt-40 text-center max-w-5xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">EGCO / CONTINUIDAD</span>

            <h2 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.055em] leading-[0.95]">La operación no debería<br/>depender de que todo<br/><span className="text-zinc-600">salga perfecto.</span></h2>

            <p className="mt-8 mx-auto max-w-2xl text-zinc-500 text-base sm:text-lg leading-relaxed font-light">Diseñamos sistemas preparados para operar, evolucionar y responder cuando las condiciones cambian.</p>
          </motion.section>

          {/* =====================================================
              09 — CTA
          ===================================================== */}

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-24 sm:mt-28 border border-zinc-800 bg-white text-black p-7 sm:p-10 lg:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500">INICIAR CONVERSACIÓN</span>

              <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight">¿Tu operación puede permitirse un fallo?</h3>

              <p className="mt-3 text-sm text-zinc-600 max-w-xl">Hablemos de la arquitectura que necesita tu operación y de dónde puede comenzar la resiliencia.</p>
            </div>

            <a href="#iniciar-mision" className="inline-flex items-center justify-center gap-3 shrink-0 px-7 py-4 bg-black text-white font-mono text-[10px] tracking-wider font-bold border border-black hover:bg-white hover:text-black transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
              EVALUAR MI INFRAESTRUCTURA
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}