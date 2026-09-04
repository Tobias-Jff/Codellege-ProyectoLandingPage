function Sponsors() {

    const sponsors = [
        {
            name: "NEXUS",
        },
        {
            name: "VERTEX",
        },
        {
            name: "ORBIT",
        },
        {
            name: "AETHER",
        },
        {
            name: "QUANTUM",
        },
        {
            name: "NOVA",
        },
    ];


    return (
        <section className="w-full bg-black py-10 overflow-hidden">

            {/* Título */}

            <div className="mb-8 text-center">

                <p
                    className="
                        text-xs
                        uppercase
                        tracking-[0.35em]
                        text-white/40
                    "
                >
                    Trusted by
                </p>

            </div>


            {/* Marquee */}

            <div className="relative w-full">

                {/* Fade izquierda */}

                <div
                    className="
                        absolute
                        left-0
                        top-0
                        z-10
                        h-full
                        w-24
                        md:w-40

                        bg-gradient-to-r
                        from-black
                        to-transparent

                        pointer-events-none
                    "
                />


                {/* Fade derecha */}

                <div
                    className="
                        absolute
                        right-0
                        top-0
                        z-10
                        h-full
                        w-24
                        md:w-40

                        bg-gradient-to-l
                        from-black
                        to-transparent

                        pointer-events-none
                    "
                />


                {/* Contenedor que se mueve */}

                <div
                    className="
                        flex
                        w-max

                        animate-marquee

                        hover:[animation-play-state:paused]
                    "
                >

                    {/* Primera copia */}

                    <div className="flex items-center">

                        {sponsors.map((sponsor, index) => (

                            <div
                                key={`first-${index}`}
                                className="
                                    flex
                                    items-center
                                    justify-center

                                    px-12
                                    md:px-20

                                    shrink-0
                                "
                            >

                                <span
                                    className="
                                        text-xl
                                        md:text-2xl

                                        font-semibold

                                        tracking-[0.2em]

                                        text-white/50

                                        whitespace-nowrap

                                        transition
                                        duration-300

                                        hover:text-white
                                    "
                                >
                                    {sponsor.name}
                                </span>

                            </div>

                        ))}

                    </div>


                    {/* Segunda copia */}

                    <div className="flex items-center">

                        {sponsors.map((sponsor, index) => (

                            <div
                                key={`second-${index}`}
                                className="
                                    flex
                                    items-center
                                    justify-center

                                    px-12
                                    md:px-20

                                    shrink-0
                                "
                            >

                                <span
                                    className="
                                        text-xl
                                        md:text-2xl

                                        font-semibold

                                        tracking-[0.2em]

                                        text-white/50

                                        whitespace-nowrap

                                        transition
                                        duration-300

                                        hover:text-white
                                    "
                                >
                                    {sponsor.name}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Sponsors;
