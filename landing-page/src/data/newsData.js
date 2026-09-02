const newsArticles = [
  {
    id: 1,
    title: "Chips Cuánticos de Silicio: Revolución en el Entrenamiento de IA",
    summary: "Nuevas arquitecturas de procesamiento cuántico reducen el tiempo de entrenamiento de modelos masivos de meses a solo unas cuantas horas.",
    category: "IA",
    date: "24/08/2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "La integración de qubits de espín en obleas de silicio tradicional ha logrado un hito histórico en la industria del cómputo de alto rendimiento. Hasta ahora, el entrenamiento de redes neuronales con billones de parámetros requería centros de datos completos consumiendo megavatios durante meses. Con esta arquitectura cuántica híbrida, los cálculos matriciales complejos se resuelven en paralelo a velocidad casi instantánea.",
        "El mayor avance radica en el control magnético a escala nanométrica, lo que permite estabilizar los qubits a temperaturas mucho más accesibles que los sistemas criogénicos tradicionales. Esto abre la puerta a que medianas empresas e instituciones de investigación puedan entrenar sus propios modelos avanzados sin depender exclusivamente de los gigantes tecnológicos."
      ],
      quote: "No estamos ante una mejora incremental del 10%; estamos presenciando un salto exponencial en capacidad de cómputo que transformará la investigación científica.",
      keyPoints: [
        "Aceleración de procesos de aprendizaje profundo hasta 1,000 veces más rápida.",
        "Reducción del consumo energético en centros de datos en más del 80%.",
        "Compatibilidad directa con las líneas de fabricación de semiconductores actuales."
      ]
    }
  },
  {
    id: 2,
    title: "Microrobots Autónomos para Reparación de Tuberías Subterráneas",
    summary: "Enjambres de microrobots inspirados en hormigas reparan infraestructuras urbanas sin necesidad de excavar o interrumpir servicios.",
    category: "ROBOTICA",
    date: "18/07/2026",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "Las grandes metrópolis pierden diariamente millones de litros de agua por fugas imperceptibles en sus tuberías subterráneas. Para solucionar esto, se han desplegado unidades robóticas de menos de dos centímetros equipadas con sensores ultrasónicos y dispensadores de resina polimérica de curado rápido.",
        "Los dispositivos navegan por los conductos y se comunican entre sí mediante radiofrecuencia de bajo alcance. Cuando una unidad detecta una grieta o corrosión, emite una señal y el enjambre se reúne en el punto crítico para aplicar el sellador en cuestión de minutos sin interrumpir el suministro público."
      ],
      quote: "El mantenimiento urbano pasa de ser destructivo y costoso a ser preventivo, silencioso e invisible para los ciudadanos.",
      keyPoints: [
        "Eliminación total de excavaciones para reparaciones menores de fontanería y gas.",
        "Autonomía de batería de 48 horas con recarga continua mediante el flujo hidráulico.",
        "Uso de resinas de sellado ecológicas no tóxicas aptas para agua potable."
      ]
    }
  },
  {
    id: 3,
    title: "IA Neuro-Simbólica: Uniendo la Lógica Estricta y el Aprendizaje Profundo",
    summary: "La convergencia entre redes neuronales y sistemas de lógica matemática elimina las alucinaciones en diagnósticos médicos y análisis de código.",
    category: "IA",
    date: "02/06/2026",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "El principal obstáculo para la adopción masiva de la IA en sectores críticos ha sido la falta de razonamiento determinista. La aproximación neuro-simbólica resuelve este dilema combinando el aprendizaje estadístico de los transformadores con motores de inferencia lógica formal.",
        "En la práctica, la red neuronal analiza patrones masivos y propone respuestas, mientras que el módulo simbólico actúa como un verificador estricto que valida si la propuesta cumple con las leyes físicas, matemáticas o lógicas antes de mostrar el resultado final."
      ],
      quote: "Hemos pasado de modelos que solo predicen la palabra más probable a sistemas que comprenden y verifican las reglas del mundo real.",
      keyPoints: [
        "Eliminación total de alucinaciones e invención de datos en procesos críticos.",
        "Explicabilidad transparente paso a paso de cada decisión tomada por el sistema.",
        "Reducción masiva de la cantidad de datos e información requerida para el entrenamiento."
      ]
    }
  },
  {
    id: 4,
    title: "Procesadores Neuromórficos de Grafeno: Cómputo a la Velocidad del Cerebro",
    summary: "Nuevos circuitos integrados basados en estructuras de carbono imitan las sinapsis biológicas para lograr eficiencia energética extrema.",
    category: "COMPUTO",
    date: "19/05/2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "Los chips tradicionales basados en la arquitectura Von Neumann sufren el clásico cuello de botella entre la memoria y la unidad de procesamiento. Los nuevos procesadores neuromórficos fabricados con mallas de grafeno procesan y almacenan datos exactamente en el mismo punto físico, imitando el comportamiento de las neuronas biológicas.",
        "Esta arquitectura permite ejecutar algoritmos de procesamiento de imagen y voz en tiempo real con una millonésima parte de la energía requerida por un procesador convencional, abriendo la puerta a dispositivos móviles verdaderamente autónomos."
      ],
      quote: "Estamos replicando la eficiencia del cerebro humano, que realiza cálculos sumamente complejos consumiendo menos energía que una pequeña bombilla.",
      keyPoints: [
        "Consumo eléctrico reducido hasta en un 99% en tareas de inferencia continua.",
        "Procesamiento analógico en memoria de ultra baja latencia.",
        "Resistencia térmica extrema que no requiere sistemas complejos de refrigeración."
      ]
    }
  },
  {
    id: 5,
    title: "Bio-Impresoras 3D de Órganos y Tejidos Funcionales a Escala Nanométrica",
    summary: "Avances en biotintas inteligentes permiten la creación de redes vasculares complejas para el trasplante sintético de tejidos humanos.",
    category: "BIOTECNOLOGIA",
    date: "04/05/2026",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "Imprimir células vivas siempre presentó el desafío de mantenerlas nutridas durante la construcción del tejido. Mediante el uso de bio-impresoras láser multi-eje y matrices hidrogel auto-ensamblables, investigadores han logrado imprimir arterias y capilares sanguíneos de escala microscópica.",
        "Este avance permite que los tejidos biológicos sintéticos reciban oxígeno y nutrientes de forma inmediata, permitiendo la fabricación de parches cardíacos y estructuras hepáticas listas para ensayos clínicos y compatibilidad con pacientes."
      ],
      quote: "Nos acercamos al día en que las listas de espera para donantes de órganos sean un concepto del pasado gracias a la ingeniería de tejidos.",
      keyPoints: [
        "Generación de redes vasculares microscópicas viables con precisión quirúrgica.",
        "Uso de células madre del propio paciente para evitar cualquier tipo de rechazo inmunológico.",
        "Aceleración de pruebas de laboratorios farmacéuticos sin necesidad de experimentación animal."
      ]
    }
  },
  {
    id: 6,
    title: "Drones Aéreos con Navegación Óptica Local y Helices Toroidales Silenciosas",
    summary: "Flotas de logística autónoma integran visión computacional sin GPS y diseño aerodinámico para operar en entornos urbanos densos.",
    category: "ROBOTICA",
    date: "22/04/2026",
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "El principal obstáculo de las aeronaves no tripuladas comerciales en entornos urbanos era el ruido de alta frecuencia y la dependencia de las señales GPS, vulnerables en zonas con rascacielos. Utilizando hélices de geometría toroidal inspiradas en dinámicas marinas, el ruido disminuye drásticamente.",
        "A nivel informático, las unidades incorporan cámaras estereofónicas y sensores LiDAR procesados localmente mediante chips Edge-AI. Esto les permite reconstruir mapas 3D del entorno en tiempo real y esquivar cables, aves y estructuras dinámicas en microsegundos."
      ],
      quote: "Logramos que la logística urbana automatizada opere en completo silencio y con máxima seguridad en cualquier punto de la ciudad.",
      keyPoints: [
        "Reducción de contaminación acústica a menos de 35 decibelios.",
        "Navegación precisa e inmune a inhibidores de señal o pérdida de satélites.",
        "Sistemas de seguridad pasiva con paracaídas balístico y aterrizaje autónomo de emergencia."
      ]
    }
  },
  {
    id: 7,
    title: "Interfases Cerebro-Computadora Optogénicas sin Cirugía Invasiva",
    summary: "Nanopartículas fotosensibles administradas de forma intravenosa permiten controlar prótesis y dispositivos con el pensamiento.",
    category: "BIOTECNOLOGIA",
    date: "11/03/2026",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "A diferencia de los implantes cerebrales tradicionales que requieren neurocirugías de alto riesgo para colocar electrodos de titanio, la nueva tecnología utiliza nanopartículas biocompatibles que se adhieren temporalmente a grupos neuronales específicos en la corteza motora.",
        "Mediante un casco de lectura óptica de baja frecuencia, los impulsos de luz emitidos por estas nanopartículas son traducidos en comandos digitales de ultra alta precisión, permitiendo que personas con movilidad reducida controlen extremidades robóticas o entornos virtuales sin dolor ni riesgos de infección."
      ],
      quote: "Hemos eliminado la necesidad del bisturí para conectar el sistema nervioso directamente con el mundo digital.",
      keyPoints: [
        "Procedimiento totalmente no invasivo administrado por infusión médica ligera.",
        "Ancho de banda de transmisión de datos 10 veces superior a las mallas de electrodos físicas.",
        "Degradación natural no tóxica y eliminación del organismo tras finalizar su uso."
      ]
    }
  },
  {
    id: 8,
    title: "Sistemas de Ciberseguridad IA en Inmune-Cómputo Autónomo",
    summary: "Algoritmos inspirados en el sistema inmunitario biológico detectan y neutralizan ciberataques desconocidos en milisegundos.",
    category: "IA",
    date: "28/02/2026",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "Los antivirus convencionales dependen de bases de datos de 'firmas' de virus conocidos, lo que los deja vulnerables a ciberataques de día cero. Los nuevos sistemas de inmunidad digital analizan la actividad sintáctica del tráfico de datos en lugar de buscar archivos específicos.",
        "Al identificar una anomalía funcional en la red, el sistema genera 'anticuerpos virtuales' que aíslan el proceso afectado, parchean el código vulnerable al vuelo y comparten la vacuna digital con el resto de la infraestructura conectada en cuestión de microsegundos."
      ],
      quote: "Las redes informáticas ahora responden ante las infecciones cibernéticas exactamente como un organismo vivo que se defiende de un patógeno.",
      keyPoints: [
        "Detección y contención instantánea de malware no documentado previamente.",
        "Reconfiguración automática de reglas de firewall en tiempo real.",
        "Cero tiempo de inactividad durante la neutralización de la amenaza."
      ]
    }
  },
  {
    id: 9,
    title: "Almacenamiento de Datos en ADN Sintético de Ultra Alta Densidad",
    summary: "Técnicas de codificación molecular permiten guardar petabytes de información digital en un solo gramo de material genético.",
    category: "COMPUTO",
    date: "15/02/2026",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "Los centros de datos globales se están quedando sin espacio físico y energía para almacenar la enorme cantidad de datos generados diariamente. La solución viene de la propia naturaleza: el ADN. Un nuevo sintetizador molecular convierte los ceros y unos binarios en secuencias de las bases nitrogenadas A, C, G y T.",
        "Una vez sintetizado, el material se deshidrata y puede conservarse intacto durante miles de años sin consumir energía eléctrica. Para leer los datos, se utilizan secuenciadores portátiles de nanoporos que convierten la secuencia genética de vuelta a datos informáticos."
      ],
      quote: "Toda la información contenida en la internet global podría guardarse dentro de una caja de zapatos utilizando almacenamiento genético.",
      keyPoints: [
        "Capacidad de almacenar hasta 215 petabytes de información en un solo gramo de ADN.",
        "Durabilidad extrema garantizada por siglos sin riesgo de degradación magnética.",
        "Eliminación del consumo eléctrico continuo para la preservación de servidores."
      ]
    }
  },
  {
    id: 10,
    title: "Exoesqueletos Biónicos Autónomos con Aprendizaje por Refuerzo",
    summary: "Sistemas robóticos vestibles adaptan su asistencia motora en tiempo real al estilo de caminata único de cada usuario.",
    category: "ROBOTICA",
    date: "27/01/2026",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "Los exoesqueletos tradicionales solían ser rígidos y obligaban al usuario a adaptarse a una caminata robótica preprogramada. La nueva generación utiliza actuadores elásticos y algoritmos de IA que aprenden del movimiento natural de las articulaciones del individuo.",
        "Mediante sensores de presión en las plantillas y electromiografía en los músculos de las piernas, la IA anticipa la intención de movimiento milisegundos antes de que el pie toque el suelo, aplicando la fuerza exacta necesaria para reducir el esfuerzo físico hasta en un 60%."
      ],
      quote: "No se siente como llevar puesta una máquina; se siente como si tus propias piernas tuvieran una super fuerza natural.",
      keyPoints: [
        "Reducción drástica de la fatiga muscular en operarios industriales y rehabilitación médica.",
        "Ajuste automático a terrenos irregulares, escaleras y rampas pronunciadas.",
        "Estructura ligera de fibra de carbono de menos de tres kilogramos de peso."
      ]
    }
  },
  {
    id: 11,
    title: "Edición Genética de Precisión mediante CRISPR de Quinta Generación",
    summary: "Nuevas enzimas de corte genético permiten corregir mutaciones moleculares específicas sin alterar el resto del genoma.",
    category: "BIOTECNOLOGIA",
    date: "10/01/2026",
    image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "Las primeras versiones de la herramienta CRISPR actuaban como tijeras moleculares que a veces realizaban cortes no deseados en regiones adyacentes del ADN. Las nuevas enzimas reprogramadas funcionan como editores de texto molecular, capaces de cambiar un solo nucleótido defectuoso por uno sano sin romper la hebra genómica.",
        "Esta precisión quirúrgica abre la puerta al tratamiento directo en origen de enfermedades hereditarias raras y trastornos cardiovasculares con intervenciones únicas de una sola dosis."
      ],
      quote: "Hemos pasado de cortar y pegar tramos completos de ADN a corregir letras tipográficas individuales dentro del código de la vida.",
      keyPoints: [
        "Cero margen de cortes involuntarios o mutaciones fuera de objetivo.",
        "Capacidad de reprogramación celular directa en tejidos vivos dentro del paciente.",
        "Simplificación radical de los procesos de desarrollo en laboratorios biológicos."
      ]
    }
  },
  {
    id: 12,
    title: "Cómputo Fotonico Integrado: Procesamiento de Datos a la Velocidad de la Luz",
    summary: "Nuevos procesadores reemplazan los electrones por fotones de luz para eliminar por completo el calentamiento por resistencia en los chips.",
    category: "COMPUTO",
    date: "03/01/2026",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    details: {
      paragraphs: [
        "A medida que los transistores eléctricos de cobre se vuelven microscópicos, el calor generado por la resistencia limita la frecuencia máxima del procesador. El cómputo fotónico sustituye las pistas metálicas por micro-guías de onda de silicio que conducen pulsos de luz láser.",
        "Dado que los fotones no generan calor por fricción ni sufren interferencias electromagnéticas, los chips ópticos pueden operar a frecuencias terahertz, ofreciendo un rendimiento inalcanzable para la electrónica tradicional con un gasto energético casi nulo."
      ],
      quote: "La velocidad de los fotones es el límite físico del universo, y ahora es la velocidad a la que procesamos información.",
      keyPoints: [
        "Frecuencia de procesamiento en rango de Terahertz sin generación de calor.",
        "Ancho de banda masivo mediante la transmisión simultánea de múltiples colores de luz.",
        "Eliminación total de los ventiladores y sistemas criogénicos de refrigeración."
      ]
    }
  }
]

export default newsArticles