import "../components/ceo.css";

function Ceo() {
    return (
        <section id="ceo" className="relative w-full py-18 bg-gray-950 overflow-hidden flex justify-center items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
                
                <div className="flex-1 text-left flex flex-col justify-center font-google-sans">
                    {/*
                    <div className="inline-block mb-4">
                        <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-800/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                            Liderazgo
                        </span>
                    </div>
                    */}
                    
                    <h2 className="text-2xl md:text-4xl font-extralight text-white mb-4 tracking-tight">
                        Conoce a nuestro CEO
                    </h2>

                    <hr className="border-gray-700 mb-4"></hr>
                    
                    <p className="text-gray-400 text-sm mb-32 font-extralight leading-relaxed max-w-xl">
                        El hombre detrás de la visión y la estrategia de nuestra empresa, Leonardo 
                        es un líder apasionado y comprometido con la innovación y el crecimiento. 
                        Con una trayectoria impresionante en el mundo empresarial, ha guiado a nuestro 
                        equipo hacia el éxito con su enfoque estratégico y su capacidad para inspirar a otros.
                    </p>

                    <div className="border-l-2 border-gray-500 pl-4 py-2 ml-8">
                        <h3 className="text-2xl font-bold text-gray-100 tracking-wide">Leonardo Da' Preston</h3>
                        <p className="text-gray-400 font-medium font-mono text-sm uppercase tracking-wider">CEO & FOUNDER</p>
                        {/* <p className="text-gray-400/60 font-medium text-xs mt-1 tracking-wider">Ingeniero de software, </p> */}
                    </div>
                </div>

                <div className="flex-1 w-full max-w-xs relative group">
                    {/*
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-60 transition-opacity duration-500"></div>
                    */}
                    <img 
                        src="https://images.unsplash.com/photo-1597859682726-d5010f58e240?q=80&w=1469&auto=format&fit=crop" 
                        alt="Leonardo Da' Preston, CEO" 
                        className="relative w-full h-125 object-cover object-center rounded-sm border border-gray-800 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] grayscale group-hover:grayscale-0" 
                    />
                </div>
                
            </div>
        </section>
    );
}

export default Ceo;