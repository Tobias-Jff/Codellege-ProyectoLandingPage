function Sponsors() {

    const sponsors = [
        {
            name: "Accenture",
            logo: "/ima/accenture.svg",
            className: "h-7 md:h-8",
        },
        {
            name: "Google",
            logo: "/ima/google.svg",
            className: "h-7 md:h-8",
        },
        {
            name: "Intel",
            logo: "/ima/intel.svg",
            className: "h-10 md:h-14",
        },
        {
            name: "Meta",
            logo: "/ima/meta.svg",
            className: "h-8 md:h-9",
        },
        {
            name: "Nasa",
            logo: "/ima/nasa.svg",
            className: "h-10 md:h-14",
        },
        {
            name: "Tesla",
            logo: "/ima/tesla.svg",
            className: "h-9 md:h-11",
        },
    ];


    // Renderizamos una copia de los sponsors
    const SponsorGroup = ({ copy }) => (

        <div
            className="
                flex
                shrink-0
                items-center
            "
        >

            {sponsors.map((sponsor, index) => (

                <div
                    key={`${copy}-${index}`}
                    className="
                        flex
                        shrink-0

                        w-[220px]
                        md:w-[280px]

                        h-[70px]
                        md:h-[80px]

                        items-center
                        justify-center
                    "
                >

                    <img
                        src={sponsor.logo}
                        alt={`Logo de ${sponsor.name}`}

                        className={`
                            ${sponsor.className}

                            w-auto
                            max-w-[170px]
                            md:max-w-[210px]

                            object-contain

                            brightness-0
                            invert

                            opacity-50

                            transition
                            duration-300

                            hover:opacity-100
                        `}
                    />

                </div>

            ))}

        </div>

    );


    return (
        <section
            className="
                w-full
                overflow-hidden

                bg-black

                py-10
            "
        >

            {/* =====================================
                TÍTULO
            ===================================== */}

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


            {/* =====================================
                MARQUEE
            ===================================== */}

            <div className="relative w-full">


                {/* =================================
                    FADE IZQUIERDO
                ================================= */}

                <div
                    className="
                        pointer-events-none

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
                    "
                />


                {/* =================================
                    FADE DERECHO
                ================================= */}

                <div
                    className="
                        pointer-events-none

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
                    "
                />


                {/* =================================
                    TRACK
                ================================= */}

                <div
                    className="
                        flex
                        w-max

                        animate-marquee

                        hover:[animation-play-state:paused]
                    "
                >

                    {/* Primera copia */}

                    <SponsorGroup copy="first" />


                    {/* Segunda copia */}

                    <SponsorGroup copy="second" />

                </div>

            </div>

        </section>
    );
}

export default Sponsors;
