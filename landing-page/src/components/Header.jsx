import { useEffect, useRef, useState } from "react";

function Header() {

    // =========================
    // HEADER / SCROLL
    // =========================

    const [visible, setVisible] = useState(true);

    const lastScrollY = useRef(0);


    // =========================
    // UPCOMING
    // =========================

    const [upcomingOpen, setUpcomingOpen] = useState(false);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });


    // Fecha del gran anuncio
    const targetDate = new Date("2026-09-18T20:00:00");


    // =========================
    // SCROLL
    // =========================

    useEffect(() => {

        const handleScroll = () => {

            const currentScrollY = window.scrollY;

            // Mantener visible cerca del inicio
            if (currentScrollY <= 80) {
                setVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            // Bajando
            if (currentScrollY > lastScrollY.current) {
                setVisible(false);
            }

            // Subiendo
            else if (currentScrollY < lastScrollY.current) {
                setVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };


        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);


    // =========================
    // COUNTDOWN
    // =========================

    useEffect(() => {

        const updateTimer = () => {

            const now = new Date();

            const difference = targetDate - now;


            // Si llegó la fecha
            if (difference <= 0) {

                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });

                return;
            }


            const days = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );


            const hours = Math.floor(
                (difference / (1000 * 60 * 60)) % 24
            );


            const minutes = Math.floor(
                (difference / (1000 * 60)) % 60
            );


            const seconds = Math.floor(
                (difference / 1000) % 60
            );


            setTimeLeft({
                days,
                hours,
                minutes,
                seconds
            });

        };


        // Ejecutar inmediatamente
        updateTimer();


        // Actualizar cada segundo
        const interval = setInterval(updateTimer, 1000);


        return () => {
            clearInterval(interval);
        };

    }, []);


    // =========================
    // FORMAT TIMER
    // =========================

    const formatNumber = (number) => {
        return String(number).padStart(2, "0");
    };


    return (
        <>

            {/* =========================================
                HEADER
            ========================================= */}

            <header
                className={`
                    fixed
                    top-0
                    left-0
                    w-full
                    z-50

                    transition-opacity
                    duration-500
                    ease-in-out

                    ${
                        visible
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }
                `}
            >

                <nav
                    className="
                        h-[70px]
                        w-full
                        px-6
                        md:px-16
                        lg:px-24
                        xl:px-32

                        flex
                        items-center
                        justify-between

                        bg-transparent
                    "
                >

                    {/* =================================
                        NAVEGACIÓN IZQUIERDA
                    ================================= */}

                    <ul className="flex items-center gap-10">

                        <li>
                            <a
                                href="#noticias"
                                className="
                                    text-white
                                    text-sm
                                    uppercase
                                    tracking-wider
                                    hover:text-white/70
                                    transition
                                "
                            >
                                Home
                            </a>
                        </li>


                        <li>
                            <a
                                href="#"
                                className="
                                    text-white
                                    text-sm
                                    uppercase
                                    tracking-wider
                                    hover:text-white/70
                                    transition
                                "
                            >
                                Noticias
                            </a>
                        </li>


                        <li>
                            <a
                                href="#"
                                className="
                                    text-white
                                    text-sm
                                    uppercase
                                    tracking-wider
                                    hover:text-white/70
                                    transition
                                "
                            >
                                Nosotros
                            </a>
                        </li>

                    </ul>


                    {/* =================================
                        LOGO
                    ================================= */}

                    <a
                        href="#"
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                        "
                    >

                        {/* Tu SVG */}

                    </a>


                    {/* =================================
                        NAVEGACIÓN DERECHA
                    ================================= */}

                    <ul className="flex items-center gap-10">

                        <li>
                            <a
                                href="#"
                                className="
                                    text-white
                                    text-sm
                                    uppercase
                                    tracking-wider
                                    hover:text-white/70
                                    transition
                                "
                            >
                                Líder
                            </a>
                        </li>


                        <li>

                            <button
                                onClick={() => setUpcomingOpen(true)}
                                className="
                                    text-white
                                    text-sm
                                    uppercase
                                    tracking-wider
                                    hover:text-white/70
                                    transition
                                "
                            >
                                Upcoming
                            </button>

                        </li>


                        <li>
                            <a
                                href="#"
                                className="
                                    text-white
                                    text-sm
                                    uppercase
                                    tracking-wider
                                    hover:text-white/70
                                    transition
                                "
                            >
                                Contact
                            </a>
                        </li>

                    </ul>

                </nav>

            </header>


            {/* =========================================
                UPCOMING OVERLAY
            ========================================= */}

            <div
                className={`
                    fixed
                    inset-0
                    z-[100]

                    transition-opacity
                    duration-500

                    ${
                        upcomingOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }
                `}
            >

                {/* =================================
                    FONDO
                ================================= */}

                <div
                    className="
                        absolute
                        inset-0

                        bg-black/70
                        backdrop-blur-sm
                    "
                    onClick={() => setUpcomingOpen(false)}
                />


                {/* =================================
                    PANEL
                ================================= */}

                <div
                    className={`
                        absolute
                        right-0
                        top-0

                        h-full
                        w-full
                        md:w-[600px]

                        bg-[var(--bg)]
                        text-white

                        px-10
                        md:px-16

                        flex
                        flex-col
                        justify-center

                        transition-transform
                        duration-700
                        ease-out

                        ${
                            upcomingOpen
                                ? "translate-x-0"
                                : "translate-x-full"
                        }
                    `}
                >

                    {/* =================================
                        CLOSE BUTTON
                    ================================= */}

                    <button
                        onClick={() => setUpcomingOpen(false)}
                        className="
                            absolute
                            top-7
                            right-7

                            w-10
                            h-10

                            flex
                            items-center
                            justify-center

                            text-3xl
                            font-light

                            text-white/50
                            hover:text-white

                            transition
                        "
                        aria-label="Close"
                    >
                        ×
                    </button>


                    {/* =================================
                        HEADER DEL PANEL
                    ================================= */}

                    <div>

                        <div className="flex items-center gap-3">

                            <span
                                className="
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-white
                                    animate-pulse
                                "
                            />

                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-[0.4em]
                                    text-white/50
                                "
                            >
                                Transmission
                            </p>

                        </div>


                        <p
                            className="
                                mt-3

                                text-xs
                                uppercase
                                tracking-[0.3em]

                                text-white/30
                            "
                        >
                            System / 001
                        </p>

                    </div>


                    {/* =================================
                        TITULO
                    ================================= */}

                    <h2
                        className="
                            mt-12

                            text-5xl
                            md:text-7xl

                            font-bold
                            tracking-tight

                            leading-[0.95]
                        "
                    >
                        Something
                        <br />
                        is coming.
                    </h2>


                    {/* =================================
                        DESCRIPCIÓN
                    ================================= */}

                    <p
                        className="
                            mt-8

                            max-w-md

                            text-sm
                            md:text-base

                            leading-relaxed

                            text-white/50
                        "
                    >
                        A new chapter is about to begin.
                        Stay tuned for the announcement.
                    </p>


                    {/* =================================
                        DIVISOR
                    ================================= */}

                    <div
                        className="
                            w-full
                            h-px

                            bg-white/10

                            my-10
                        "
                    />


                    {/* =================================
                        COUNTDOWN
                    ================================= */}

                    <div>

                        <p
                            className="
                                text-xs
                                uppercase
                                tracking-[0.3em]

                                text-white/40
                            "
                        >
                            Countdown
                        </p>


                        <div
                            className="
                                mt-5

                                flex
                                justify-center
                                items-baseline
                                gap-2
                                font-mono
                            "
                        >

                            <span className="text-4xl md:text-5xl">
                                {formatNumber(timeLeft.days)}
                            </span>

                            <span className="text-white/30">
                                :
                            </span>

                            <span className="text-4xl md:text-5xl">
                                {formatNumber(timeLeft.hours)}
                            </span>

                            <span className="text-white/30">
                                :
                            </span>

                            <span className="text-4xl md:text-5xl">
                                {formatNumber(timeLeft.minutes)}
                            </span>

                            <span className="text-white/30">
                                :
                            </span>

                            <span className="text-4xl md:text-5xl">
                                {formatNumber(timeLeft.seconds)}
                            </span>

                        </div>


                        {/* Labels */}

                        <div
                            className="
                                mt-2

                                flex
                                justify-center
                                gap-12

                                text-[9px]
                                uppercase
                                tracking-[0.25em]

                                text-white/30
                            "
                        >

                            <span>Days</span>

                            <span>Hours</span>

                            <span>Min</span>

                            <span>Sec</span>

                        </div>

                    </div>


                    {/* =================================
                        FECHA
                    ================================= */}

                    <div className="mt-12">

                        <p
                            className="
                                text-xs
                                uppercase
                                tracking-[0.3em]

                                text-white/30
                            "
                        >
                            Announcement
                        </p>


                        <p
                            className="
                                mt-3

                                text-sm

                                tracking-wider

                                text-white/70
                            "
                        >
                            SEPTEMBER 18, 2026
                        </p>

                    </div>


                    {/* =================================
                        FOOTER
                    ================================= */}

                    <div
                        className="
                            absolute
                            bottom-8
                            left-10
                            md:left-16
                            right-10
                            md:right-16

                            flex
                            justify-between
                            items-center
                        "
                    >

                        <span
                            className="
                                text-[9px]
                                uppercase
                                tracking-[0.3em]

                                text-white/20
                            "
                        >
                            Transmission Ready
                        </span>


                        <span
                            className="
                                text-[9px]
                                uppercase
                                tracking-[0.3em]

                                text-white/20
                            "
                        >
                            001
                        </span>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Header;
