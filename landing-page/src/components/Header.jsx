import { useEffect, useRef, useState } from "react";
import icon from "../assets/logo/icon-w.png";

function Header() {

    const [visible, setVisible] = useState(true);

    const lastScrollY = useRef(0);

    const [upcomingOpen, setUpcomingOpen] = useState(false);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const targetDate = new Date("2026-09-18T20:00:00");

    useEffect(() => {

        const handleScroll = () => {

            const currentScrollY = window.scrollY;

            if (currentScrollY <= 80) {
                setVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current) {
                setVisible(false);
            }

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

    useEffect(() => {

        const updateTimer = () => {

            const now = new Date();

            const difference = targetDate - now;

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

        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => {
            clearInterval(interval);
        };

    }, []);

    const formatNumber = (number) => {
        return String(number).padStart(2, "0");
    };

    return (
        <>

            <header
                className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-500 ease-in-out ${ visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" }`}
            >

                <div className="absolute -z-10 h-[200%] inset-0 bg-gradient-to-b from-slate-950/100 to-slate-950/0"></div>

                <nav
                    className="relative h-[70px] w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between bg-transparent"
                >

                    <ul className="flex items-center gap-10">

                        <li>
                            <a
                                href="#noticias"
                                className="text-white text-sm uppercase tracking-wider hover:text-white/70 transition"
                            >
                                Home
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="text-white text-sm uppercase tracking-wider hover:text-white/70 transition"
                            >
                                Noticias
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="text-white text-sm uppercase tracking-wider hover:text-white/70 transition"
                            >
                                Nosotros
                            </a>
                        </li>

                    </ul>

                    <a href="#" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img src={icon} alt="Icon" className="h-6" />
                    </a>

                    <ul className="flex items-center gap-10">

                        <li>
                            <a
                                href="#"
                                className="text-white text-sm uppercase tracking-wider hover:text-white/70 transition"
                            >
                                Líder
                            </a>
                        </li>

                        <li>

                            <button
                                onClick={() => setUpcomingOpen(true)}
                                className="text-white text-sm uppercase tracking-wider hover:text-white/70 transition"
                            >
                                Upcoming
                            </button>

                        </li>

                        <li>
                            <a
                                href="#"
                                className="text-white text-sm uppercase tracking-wider hover:text-white/70 transition"
                            >
                                Contact
                            </a>
                        </li>

                    </ul>

                </nav>

            </header>

            <div
                className={`fixed inset-0 z-[100] transition-opacity duration-500 ${ upcomingOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" }`}
            >

                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={() => setUpcomingOpen(false)}
                />

                <div
                    className={`absolute right-0 top-0 h-full w-full md:w-[600px] bg-[var(--bg)] text-white px-10 md:px-16 flex flex-col justify-center transition-transform duration-700 ease-out ${ upcomingOpen ? "translate-x-0" : "translate-x-full" }`}
                >

                    <button
                        onClick={() => setUpcomingOpen(false)}
                        className="absolute top-7 right-7 w-10 h-10 flex items-center justify-center text-3xl font-light text-white/50 hover:text-white transition"
                        aria-label="Close"
                    >
                        ×
                    </button>

                    <div>

                        <div className="flex items-center gap-3">

                            <span
                                className="w-2 h-2 rounded-full bg-white animate-pulse"
                            />

                            <p
                                className="text-xs uppercase tracking-[0.4em] text-white/50"
                            >
                                Transmission
                            </p>

                        </div>

                        <p
                            className="mt-3 text-xs uppercase tracking-[0.3em] text-white/30"
                        >
                            System / 001
                        </p>

                    </div>

                    <h2
                        className="mt-12 text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]"
                    >
                        Something
                        <br />
                        is coming.
                    </h2>

                    <p
                        className="mt-8 max-w-md text-sm md:text-base leading-relaxed text-white/50"
                    >
                        A new chapter is about to begin.
                        Stay tuned for the announcement.
                    </p>

                    <div
                        className="w-full h-px bg-white/10 my-10"
                    />

                    <div>

                        <p
                            className="text-xs uppercase tracking-[0.3em] text-white/40"
                        >
                            Countdown
                        </p>

                        <div
                            className="mt-5 flex justify-center items-baseline gap-2 font-mono"
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

                        <div
                            className="mt-2 flex justify-center gap-12 text-[9px] uppercase tracking-[0.25em] text-white/30"
                        >

                            <span>Days</span>

                            <span>Hours</span>

                            <span>Min</span>

                            <span>Sec</span>

                        </div>

                    </div>

                    <div className="mt-12">

                        <p
                            className="text-xs uppercase tracking-[0.3em] text-white/30"
                        >
                            Announcement
                        </p>

                        <p
                            className="mt-3 text-sm tracking-wider text-white/70"
                        >
                            SEPTEMBER 18, 2026
                        </p>

                    </div>

                    <div
                        className="absolute bottom-8 left-10 md:left-16 right-10 md:right-16 flex justify-between items-center"
                    >

                        <span
                            className="text-[9px] uppercase tracking-[0.3em] text-white/20"
                        >
                            Transmission Ready
                        </span>

                        <span
                            className="text-[9px] uppercase tracking-[0.3em] text-white/20"
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
