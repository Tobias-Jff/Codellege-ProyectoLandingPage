import { useEffect, useRef, useMemo, useState } from "react";
import { motion, animate, AnimatePresence } from "framer-motion";


import {
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Database,
  Lock,
  Fingerprint,
  Terminal,
  Shield,
  Users,
  Rocket,
  Target,
} from "lucide-react";
import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Zap, Cpu, Orbit, ArrowUpRight, ShieldCheck, Milestone, Rocket, Target } from 'lucide-react';

/* =========================================================================
   
   -------------------------------------------------------------------------
   Base:    negro (#000) + zinc-950/900/800 para paneles y bordes
   Texto:   blanco / zinc-400 / zinc-500
   Acento:  ámbar-400 (#FBBF24) — se usa ÚNICAMENTE para estado "activo/en vivo"
            y para el único CTA interactivo por tarjeta. No se usa como color
            decorativo genérico.
   Radio:   0 en paneles grandes (identidad "hardware/ops"), rounded-sm solo
            en chips pequeños de icono.
   ========================================================================= */


const ASSETS = {
  
  aboutHero: "/ima/mision.png",
  production: {
    tabs: {
      mision: "/ima/mision.png",
      equipo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      infra: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
    },
    especificaciones: {
      core: "https://images.unsplash.com/photo-1541534401786-3f6a6aee7276",
      automation: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      security: "https://images.unsplash.com/photo-1543352634-4f4b3d0b7c10",
    },
  },
};

/* ---------- Fallback news (reemplázalo por tu import real cuando lo conectes) ---------- */
const defaultNewsArticles = [
  { id: "n1", title: "Infraestructura Base Desplegada", date: "2026-01-10", category: "Core", summary: "Despliegue inicial." },
  { id: "n2", title: "Automatización en Producción", date: "2025-08-02", category: "Automation", summary: "Automatizamos pipelines críticos." },
  { id: "n3", title: "Analítica Predictiva Escalada", date: "2025-04-15", category: "Data", summary: "Modelo predictivo en producción." },
  { id: "n4", title: "Auditoría y Cumplimiento", date: "2024-11-21", category: "Security", summary: "Certificación SOC2 tipo II." },
];

/* ---------- Hook: detecta preferencia reduce-motion (accesibilidad) ---------- */
function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setPrefersReduced(Boolean(mq.matches));
    handler();
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);
  return prefersReduced;
}

/* ---------- ContadorTelemetria: animado pero accesible ---------- */
function ContadorTelemetria({ value, duration = 1.6, decimals = 0, suffix = "" }) {
  const nodeRef = useRef(null);
  const numericValue = Number(value) || 0;
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (prefersReduced) {
      node.textContent = numericValue.toFixed(decimals) + suffix;
      return;
    }

    const controls = animate(0, numericValue, {
      duration,
      ease: [0.1, 0.9, 0.2, 1],
      onUpdate(v) {
        node.textContent = Number.isFinite(v) ? Number(v).toFixed(decimals) + suffix : numericValue.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [numericValue, duration, decimals, suffix, prefersReduced]);

  return (
    <span ref={nodeRef} aria-live="polite" role="status" aria-atomic="true">
      {prefersReduced ? `${numericValue.toFixed(decimals)}${suffix}` : "0"}
    </span>
  );
}

/* ---------- Componente principal unificado ---------- */
export default function SobreNosotros({ newsArticles = defaultNewsArticles, assets = ASSETS }) {
  const articles = Array.isArray(newsArticles) && newsArticles.length ? newsArticles : defaultNewsArticles;

  const [tabActiva, setTabActiva] = useState("mision");

  const [bloquesProcesados, setBloquesProcesados] = useState(412_920);
  const [latenciaRed, setLatenciaRed] = useState("12ms");

  useEffect(() => {
    const interval = setInterval(() => {
      setBloquesProcesados((prev) => prev + Math.floor(1 + Math.random() * 6));
      const ms = Math.floor(10 + Math.random() * 6);
      setLatenciaRed(`${ms}ms`);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const metricasIngenieria = useMemo(
    () => [
      { label: "Sistemas desplegados", value: "140+" },
      { label: "Latencia promedio", value: "12ms" },
      { label: "Disponibilidad núcleo", value: "99.99%" },
    ],
    []
  );

  const datosTabs = useMemo(
    () => ({
      mision: {
        sub: "01 — Perfil de operación",
        titulo: "Resiliencia digital absoluta.",
        texto:
          "No desarrollamos software convencional. En egco estructuramos arquitecturas inmunes a fallos de criticidad extrema, permitiendo a corporaciones de alto impacto automatizar entornos donde la desconexión no es una opción viable.",
        imagen: assets.production.tabs.mision,
      },
      equipo: {
        sub: "02 — Operadores de sistema",
        titulo: "Ingeniería de confiabilidad SRE.",
        texto:
          "Nuestro núcleo operativo está integrado por especialistas en criptografía, redes de baja latencia y sistemas distribuidos con experiencia previa en entornos aeroespaciales y financieros de alta exigencia.",
        imagen: assets.production.tabs.equipo,
      },
      infra: {
        sub: "03 — Escalabilidad core",
        titulo: "Sistemas globales redundantes.",
        texto:
          "Operamos bajo topologías descentralizadas con replicación síncrona de datos. Cada nodo desplegado cuenta con blindaje perimetral activo y capacidades de autorrecuperación inmediata ante contingencias críticas.",
        imagen: assets.production.tabs.infra,
      },
    }),
    [assets]
  );

  const analisisEvidencia = useMemo(() => {
    const totalArticulos = articles.length;
    const categoriasUnicas = Array.from(new Set(articles.map((item) => item.category)));
    const [reciente, ...antiguas] = articles;
    return {
      desplieguesCalculados: 50 + totalArticulos,
      verticalesActivas: categoriasUnicas.length || 1,
      nodoMasReciente: reciente || { title: "Infraestructura Base Inicializada", date: "2026", category: "Core", summary: "Despliegue inicial." },
      nodosHistoricos: antiguas || [],
    };
  }, [articles]);

  const capacidadesEgco = useMemo(
    () => [
      {
        id: "cap-1",
        numero: "01 — Infraestructura",
        titulo: "Arquitecturas de alta disponibilidad",
        descripcion: "Diseño de ecosistemas lógicos distribuidos con tolerancia a fallos extremos. Ingeniería redundante para el resguardo de datos globales.",
        icono: <Database className="w-4 h-4 text-zinc-500" aria-hidden="true" />,
        imagen: assets.production.especificaciones.core,
      },
      {
        id: "cap-2",
        numero: "02 — Automatización",
        titulo: "Pipelines de datos a hiperescala",
        descripcion: "Orquestación autónoma de flujos de trabajo críticos. Mitigamos el riesgo operativo eliminando la intervención manual en producción masiva.",
        icono: <Cpu className="w-4 h-4 text-zinc-500" aria-hidden="true" />,
        imagen: assets.production.especificaciones.automation,
      },
      {
        id: "cap-3",
        numero: "03 — Seguridad",
        titulo: "Criptografía avanzada y SOC2",
        descripcion: "Aislamiento estricto de procesos en entornos hostiles, cifrado asimétrico en tránsito/reposo y protección bajo normativas internacionales.",
        icono: <ShieldCheck className="w-4 h-4 text-zinc-500" aria-hidden="true" />,
        imagen: assets.production.especificaciones.security,
      },
    ],
    [assets]
  );

  const hitosMision = useMemo(
    () => [
      {
        id: "h-2024",
        año: "2024 — Ignición",
        titulo: "Fase de lanzamiento 01",
        descripcion:
          "Nace egco con el propósito de romper el paradigma del desarrollo tradicional. Consolidamos un equipo núcleo de ingenieros dedicados a diseñar arquitecturas escalables de alto rendimiento.",
        icono: <Rocket className="w-5 h-5" aria-hidden="true" />,
        estado: "COMPLETADO",
        activo: false,
      },
      {
        id: "h-2025",
        año: "2025 — Escalamiento",
        titulo: "Expansión de operación",
        descripcion: `Desplegamos más de ${analisisEvidencia.desplieguesCalculados} ecosistemas complejos en producción e implementamos módulos de analítica que respaldan la evidencia pública de nuestras noticias.`,
        icono: <Cpu className="w-5 h-5" aria-hidden="true" />,
        estado: "COMPLETADO",
        activo: false,
      },
      {
        id: "h-2026",
        año: "2026 — Vanguardia",
        titulo: "Consolidación y proyección",
        descripcion: `Nos posicionamos como el hub técnico preferido por organizaciones de alto impacto gracias a nuestras ${analisisEvidencia.verticalesActivas} divisiones técnicas activas.`,
        icono: <Target className="w-5 h-5" aria-hidden="true" />,
        estado: "EN CURSO",
        activo: true,
      },
    ],
    [analisisEvidencia.desplieguesCalculados, analisisEvidencia.verticalesActivas]
  );

  /* ---------- Motion: un único ritmo de entrada, reutilizado en toda la sección ---------- */
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.1, 0.9, 0.2, 1] } } };
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

  return (
    <section
      id="sobre-nosotros"
      role="region"
      aria-labelledby="sobre-nosotros-title"
      className="bg-black text-white pt-36 pb-36 px-6 sm:px-12 lg:px-24 font-sans relative overflow-hidden border-b border-zinc-900 selection:bg-amber-400 selection:text-black"
    >
      {/* Retícula técnica (decorativa) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-32">
        {/* ================= HERO / DASHBOARD ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div
            className="lg:col-span-7 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <div className="font-mono text-xs tracking-[0.3em] text-zinc-500 uppercase flex items-center gap-2.5">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              Perfil de misión — Sobre nosotros
            </div>

            <h2 id="sobre-nosotros-title" className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] text-white">
              Diseñamos la infraestructura del mañana.
            </h2>

            {/* Tabs selectors */}
            <div className="flex border-b border-zinc-800 font-mono text-xs tracking-wide">
              {(["mision", "equipo", "infra"]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTabActiva(tab)}
                  className={`pb-3 pr-6 relative transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black ${
                    tabActiva === tab ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                  aria-pressed={tabActiva === tab}
                >
                  {tab === "mision" && (
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" aria-hidden="true" /> Misión
                    </span>
                  )}
                  {tab === "equipo" && (
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" aria-hidden="true" /> Equipo
                    </span>
                  )}
                  {tab === "infra" && (
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Redundancia
                    </span>
                  )}
                  {tabActiva === tab && (
                    <motion.div layoutId="activeTabBorder" className="absolute bottom-0 left-0 right-6 h-[2px] bg-white" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="h-48 sm:h-36 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tabActiva}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="space-y-3 absolute inset-0"
                >
                  <p className="font-mono text-[11px] tracking-wide text-zinc-500">{datosTabs[tabActiva].sub}</p>
                  <h3 className="text-xl font-bold tracking-tight text-white">{datosTabs[tabActiva].titulo}</h3>
                  <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-xl">{datosTabs[tabActiva].texto}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800 max-w-lg">
              {metricasIngenieria.map((metrica) => (
                <div key={metrica.label} className="space-y-1">
                  <p className="font-mono text-[10px] tracking-wide text-zinc-500">{metrica.label}</p>
                  <p className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">{metrica.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual sincronizado con las tabs */}
          <div className="lg:col-span-5 w-full aspect-[4/5] bg-zinc-950 border border-zinc-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70" />
            <AnimatePresence mode="wait">
              <motion.img
                key={tabActiva}
                src={datosTabs[tabActiva].imagen}
                alt={`Equipo e infraestructura de egco — ${datosTabs[tabActiva].titulo}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full h-full object-cover absolute inset-0 filter grayscale contrast-[1.3] brightness-[0.45] hover:grayscale-0 hover:brightness-75 transition-all duration-700"
                loading="eager"
                decoding="async"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* ================= CAPACIDADES ================= */}
        <div className="space-y-16">
          <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row justify-between items-baseline gap-4">
            <h3 className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">Especificaciones de capacidad</h3>
            <span className="font-mono text-[10px] text-zinc-600">Sistemas verificados: OK</span>
          </div>
          

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
          >
            {capacidadesEgco.map((capacidad) => (
              <motion.div
                key={capacidad.id}
                variants={fadeUp}
                className="border border-zinc-900 bg-zinc-950/30 hover:border-zinc-700 transition-colors duration-300 flex flex-col h-full group"
              >
                <div className="w-full h-52 overflow-hidden relative bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <img
                    src={capacidad.imagen}
                    alt={capacidad.titulo}
                    className="w-full h-full object-cover filter grayscale contrast-[1.3] brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-wide text-zinc-500">{capacidad.numero}</span>
                    {capacidad.icono}
                  </div>
                  <h4 className="text-lg font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
                    {capacidad.titulo}
                  </h4>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed">{capacidad.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================= BITÁCORA / HITOS ================= */}
        <div className="space-y-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="font-mono text-xs tracking-wide text-zinc-500 block mb-2">Bitácora de evolución</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Cómo llegamos hasta aquí</h3>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {hitosMision.map((hito) => (
              <motion.article
                key={hito.id}
                variants={fadeUp}
                className="bg-zinc-950/40 border border-zinc-900 p-6 space-y-4 flex flex-col justify-between relative"
              >
                <header className="flex justify-between items-center">
                  <span className="text-xs font-mono text-zinc-500">{hito.año}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 border ${
                      hito.activo
                        ? "border-amber-400/40 text-amber-400 bg-amber-400/10"
                        : "border-zinc-800 text-zinc-500"
                    }`}
                  >
                    {hito.activo && <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 align-middle animate-pulse" aria-hidden="true" />}
                    {hito.estado}
                  </span>
                </header>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 shrink-0">{hito.icono}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{hito.titulo}</h4>
                    <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{hito.descripcion}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs text-zinc-500">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                    Infraestructura verificable
                  </span>
                  <button
                    className="text-white font-semibold hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    aria-label={`Ver detalle de ${hito.titulo}`}
                  >
                    Ver detalle →
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Evidencia pública */}
            <section aria-labelledby="evidencia-publica-title" className="bg-zinc-950/40 border border-zinc-900 p-6">
              <h4 id="evidencia-publica-title" className="text-sm text-white font-semibold mb-4">
                Evidencia pública
              </h4>
              <div className="space-y-3">
                {articles.slice(0, 4).map((n) => (
                  <article key={n.id} className="flex items-start gap-3 bg-black/40 border border-zinc-900 p-3">
                    <div className="flex-none w-9 h-9 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400" aria-hidden="true">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-zinc-100">{n.title}</h5>
                      <p className="text-xs text-zinc-500 mt-1 font-mono">
                        {n.date} · {n.category}
                      </p>
                      {n.summary ? <p className="text-xs text-zinc-400 mt-1">{n.summary}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Telemetría / Panel de seguridad */}
            <aside className="bg-zinc-950/40 border border-zinc-900 p-6 space-y-5 text-zinc-400">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-zinc-400" aria-hidden="true" />
                <div>
                  <div className="text-xs text-zinc-500">Seguridad y cumplimiento</div>
                  <div className="text-sm text-white font-semibold">AES-256 · Redundancia · Auditorías</div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900 font-mono">
                <div className="text-[10px] text-zinc-500 tracking-wide">Paquetes de datos procesados</div>
                <div className="text-white font-bold text-2xl">
                  <ContadorTelemetria value={bloquesProcesados} duration={1} decimals={0} />
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  Latencia: <span className="text-zinc-200 font-medium">{latenciaRed}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900 text-sm text-zinc-400 flex items-start gap-2">
                <Fingerprint className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" aria-hidden="true" />
                Identidad e integridad verificadas por registros inmutables.
              </div>
            </aside>
          </motion.div>
        </div>

        {/* ================= CTA FINAL ================= */}
        <motion.div
          className="border border-zinc-900 p-8 sm:p-12 bg-zinc-950/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="space-y-2">
            <h4 className="text-xl font-bold tracking-tight text-white">¿Listo para desplegar tu infraestructura?</h4>
            <p className="text-xs text-zinc-400 max-w-md font-light">
              "Somete tu ecosistema actual a nuestro diagnóstico de resiliencia y optimización perimetral"
            </p>
          </div>
          <a
            href="#iniciar-mision"
            className="inline-flex items-center gap-3 border border-white bg-white text-black hover:bg-transparent hover:text-white font-mono text-xs tracking-wide font-bold px-8 py-4 transition-colors duration-300 shrink-0 w-full sm:w-auto justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            aria-label="Iniciar diagnóstico de misión"
          >
            Iniciar diagnóstico de misión
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}