

import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Zap, Cpu, Orbit, ArrowUpRight, ShieldCheck, Milestone, Rocket, Target } from 'lucide-react';

// Componente de telemetría numérica de precisión
function ContadorTelemetria({ value, duration = 2, decimals = 0, suffix = "" }) {
  const nodeRef = useRef(null);
  const numericValue = parseFloat(value);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, numericValue, {
      duration: duration,
      ease: [0.1, 0.9, 0.2, 1], // Curva balística SpaceX
      onUpdate(value) {
        node.textContent = value.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [numericValue, duration, decimals, suffix]);

  return <span ref={nodeRef}>0</span>;
}

export default function SobreNosotros() {
  // Datos reales de la bitácora de evolución tecnológica de egco
  const hitosMision = [
    {
      año: "2024 // IGNICIÓN",
      titulo: "Fase de Lanzamiento O1",
      descripcion: "Nace egco con el firme propósito de romper el paradigma del desarrollo tradicional. Consolidamos un equipo núcleo de ingenieros de software dedicados exclusivamente a diseñar arquitecturas escalables de alto rendimiento.",
      icono: <Rocket className="w-4 h-4" />,
      estado: "COMPLETED"
    },
    {
      año: "2025 // ESCALAMIENTO",
      titulo: "Expansión de Órbita",
      descripcion: "Desplegamos más de 50 ecosistemas tecnológicos complejos a nivel de producción. Implementamos módulos avanzados de inteligencia de datos y automatización robótica de procesos que optimizaron la operación de nuestros socios técnicos globales.",
      icono: <Cpu className="w-4 h-4" />,
      estado: "COMPLETED"
    },
    {
      año: "2026 // VANGUARDIA",
      titulo: "Consolidación y Proyección Matriz",
      descripcion: "Evolucionamos hacia la integración de analítica predictiva masiva e interfaces neuronales intuitivas. Nos posicionamos como el hub técnico de vanguardia preferido por organizaciones de alto impacto para liderar el mercado digital.",
      icono: <Target className="w-4 h-4" />,
      estado: "ACTIVE_MISSION"
    }
  ];

  // Configuración de Viewport flexible para asegurar el renderizado
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.1, 0.9, 0.2, 1] } 
    }
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section id="sobre-nosotros" className="bg-[#020617] text-white py-32 px-6 sm:px-12 lg:px-24 font-mono relative overflow-hidden border-b border-slate-900">
      {/* Retícula técnica industrial de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto space-y-24 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Renderiza de inmediato al tocar 10% de la pantalla
      >
        
        {/* 1. ENCABEZADO PRINCIPAL (Estilo Consola de Misión) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-12 border-b border-slate-900/60">
          <motion.div variants={fadeUpVariant} className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-indigo-950/40 border border-indigo-500/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
              <span className="text-indigo-400 font-bold tracking-[0.25em] text-[10px] uppercase">
                SYS.CORE // IDENTIDAD_EGCO_v2.6
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-[1.15]">
              En egco transformamos ideas complejas en ecosistemas tecnológicos de alto impacto.
            </h2>
          </motion.div>
          
          <motion.div variants={fadeUpVariant} className="lg:pt-14">
            <p className="text-base text-slate-400 leading-relaxed border-l-2 border-indigo-500/30 pl-6 font-sans text-left">
              En <strong className="text-indigo-400 font-semibold tracking-wider">egco</strong> nos dedicamos a acelerar la evolución digital de las organizaciones a través de ingeniería de frontera. No nos limitamos a programar; diseñamos e implementamos soluciones de arquitectura de software distribuido, inteligencia masiva de datos y automatizaciones autónomas que aseguran que tu infraestructura lidere el mercado global.
            </p>
          </motion.div>
        </div>

        {/* 2. PANEL DE TELEMETRÍA (Métricas de Confianza) */}
        <motion.div 
          variants={fadeUpVariant}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-10 bg-[#070a12]/80 backdrop-blur-xl rounded-xl p-8 border border-slate-800/40 shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          <div className="text-left md:text-center md:border-r border-slate-900/60 last:border-0 px-2">
            <p className="text-4xl sm:text-5xl font-black text-indigo-400 tracking-tighter tabular-nums">
              <ContadorTelemetria value="99.98" decimals={2} suffix="%" />
            </p>
            <p className="text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-sans font-bold opacity-80">
              Uptime en Sistemas
            </p>
          </div>

          <div className="text-left md:text-center md:border-r border-slate-900/60 last:border-0 px-2">
            <p className="text-4xl sm:text-5xl font-black text-indigo-400 tracking-tighter tabular-nums">
              <ContadorTelemetria value="50" suffix="+" />
            </p>
            <p className="text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-sans font-bold opacity-80">
              Sistemas Desplegados
            </p>
          </div>

          <div className="text-left md:text-center md:border-r border-slate-900/60 last:border-0 px-2">
            <p className="text-4xl sm:text-5xl font-black text-indigo-400 tracking-tighter tabular-nums">
              <ContadorTelemetria value="4.9" decimals={1} suffix="/5" />
            </p>
            <p className="text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-sans font-bold opacity-80">
              Satisfacción Cliente
            </p>
          </div>

          <div className="text-left md:text-center px-2">
            <p className="text-4xl sm:text-5xl font-black text-indigo-400 tracking-tighter tabular-nums">
              24/7
            </p>
            <p className="text-[10px] text-slate-400 mt-3 uppercase tracking-widest font-sans font-bold opacity-80">
              Soporte Especializado
            </p>
          </div>
        </motion.div>

        {/* 3. PILARES CORPORATIVOS (Módulos HUD con Asimetría SpaceX) */}
        <div className="relative pt-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />

          <motion.div 
            variants={containerVariant}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          >
            {/* Pilar 1 */}
            <motion.div 
              variants={fadeUpVariant}
              whileHover={{ y: -8 }}
              className="p-8 bg-[#070a12]/70 rounded-xl border border-slate-800/60 hover:border-indigo-500/40 transition-all duration-300 relative group overflow-hidden text-left backdrop-blur-md"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-indigo-950/30 border border-indigo-900/40 rounded-lg flex items-center justify-center text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-300 shadow-inner">
                  <Orbit className="w-5 h-5 animate-[spin_25s_linear_infinite]" />
                </div>
                <span className="text-[9px] text-slate-600 font-bold tracking-wider group-hover:text-indigo-400/70 transition-colors">
                  [ STATUS: NOMINAL ]
                </span>
              </div>
              <h3 className="text-base font-bold mt-6 mb-2 text-slate-200 group-hover:text-indigo-400 transition-colors duration-300">
                01 // Eficiencia y Escalabilidad
              </h3>
              <div className="h-[1px] w-8 bg-indigo-500/20 my-3 group-hover:w-24 transition-all duration-300" />
              <p className="text-slate-400 text-xs leading-relaxed font-sans opacity-90">
                En egco creamos plataformas preparadas para el crecimiento masivo, garantizando velocidad síncrona y estabilidad técnica ante cualquier demanda global extrema.
              </p>
            </motion.div>

            {/* Pilar 2 */}
            <motion.div 
              variants={fadeUpVariant}
              whileHover={{ y: -2 }}
              className="p-8 bg-[#070a12]/70 rounded-xl border border-slate-800/60 hover:border-indigo-500/40 transition-all duration-300 relative group overflow-hidden text-left backdrop-blur-md md:translate-y-6"


            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-indigo-950/30 border border-indigo-900/40 rounded-lg flex items-center justify-center text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-300 shadow-inner">
                  <Cpu className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500 ease-out" />
                </div>
                <span className="text-[9px] text-slate-600 font-bold tracking-wider group-hover:text-indigo-400/70 transition-colors">
                  [ COGNITIVE_DRIVE ]
                </span>
              </div>
              
              <h3 className="text-base font-bold mt-6 mb-2 text-slate-200 group-hover:text-indigo-400 transition-colors duration-300">
                02 // Desarrollo a la Medida
              </h3>
              <div className="h-[1px] w-8 bg-indigo-500/20 my-3 group-hover:w-24 transition-all duration-300" />
              <p className="text-slate-400 text-xs leading-relaxed font-sans opacity-90">

              Integramos herramientas modernas de analítica predictiva e interfaces intuitivas que mantienen a nuestros socios técnicos un paso adelante.
            </p>
          </motion.div>
        </motion.div>
      </div>
      </motion.div>
    </section>
  );
}
