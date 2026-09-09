import { useEffect, useRef, useState } from "react";
import icon from "../assets/logo/icon-w.png";

const targetDate = new Date("2026-09-18T20:00:00");

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
                className={`fixed flex flex-row px-8 top-0 left-0 w-full z-50 items-center transition-opacity duration-500 ease-in-out ${ visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" }`}
            >

                <div className="absolute -z-10 h-[183px] inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/0">
                </div>

                <a href="#" className="relative mt-1.5">
                    <img src={icon} alt="Icon" className="h-[30px] aspect-[1/1.112]" />
                </a>

                <nav
                    className="relative font-audiowide font-black text-slate-300 h-[70px] w-auto px-12 flex items-center justify-between bg-transparent"
                >

                    <ul className="flex items-center gap-4">
                        <li>
                            <a href="#inicio" className="group text-[12px] uppercase tracking-wider px-3 py-0.5 hover:text-slate-100 transition duration-300">
                                <span className="relative inline-block after:content-[''] after:absolute after:bg-white after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-[120%] after:h-[2px] after:bg-current after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center">
                                    Home
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#noticias" className="group text-[12px] uppercase tracking-wider py-0.5 hover:text-slate-100 transition">
                                <span className="relative inline-block after:content-[''] after:absolute after:bg-white after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-[120%] after:h-[2px] after:bg-current after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center">
                                    News
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#aboutUs" className="group text-[12px] uppercase tracking-wider px-3 py-0.5 hover:text-slate-100 transition">
                                <span className="relative inline-block after:content-[''] after:absolute after:bg-white after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-[120%] after:h-[2px] after:bg-current after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center">
                                    Who we are
                                </span>
                            </a>
                        </li>

                        <li>
                            <a href="#footer" className="group text-[12px] uppercase tracking-wider px-3 py-0.5 hover:text-slate-100 transition">
                                <span className="relative inline-block after:content-[''] after:absolute after:bg-white after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-[120%] after:h-[2px] after:bg-current after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:origin-center">
                                    Contact
                                </span>
                            </a>
                        </li>
                    </ul>

                </nav>

                <button
                    onClick={() => setUpcomingOpen(true)}
                    className="group relative ml-auto mt-2 overflow-hidden font-audiowide border-1 border-slate-300/40 rounded-xs text-slate-300 text-[12px] uppercase tracking-wider px-4 py-1 transition-colors duration-500 cursor-pointer"
                >
                    <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full"
                    >
                        <defs>
                            <mask id="countdown-text-mask" maskUnits="userSpaceOnUse">
                                <rect width="100%" height="100%" fill="white" />
                                <text
                                    x="50%"
                                    y="48%"
                                    dy="0.35em"
                                    textAnchor="middle"
                                    fill="black"
                                    fontFamily="Audiowide, sans-serif"
                                    fontSize="12"
                                    letterSpacing="0.6"
                                >
                                    Upcoming Countdown
                                </text>
                            </mask>
                        </defs>
                        <rect
                            width="0"
                            height="100%"
                            fill="white"
                            mask="url(#countdown-text-mask)"
                            className="transition-[width] duration-500 ease-out group-hover:w-full"
                        />
                    </svg>
                    <span className="relative z-10 inline-block transition-colors duration-500 group-hover:text-transparent">
                        Upcoming Countdown
                    </span>
                </button>

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
               

                </div>

                    <h2
                        className="font-zalando-sans-expanded text-start mt-12 text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]"
                    >
                        Be prepared.
                    </h2>


                    <div
                        className="w-full h-px bg-white/10 my-10"
                    />

                    <div>

                        <p
                            className="font-zalando-sans-semi-expanded text-xs uppercase tracking-[0.3em] text-white/40"
                        >
                            Countdown
                        </p>

                        <div
                            className="font-zalando-sans-semi-expanded mt-5 flex justify-center items-baseline gap-2 font-mono"
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
                            className="font-zalando-sans-semi-expanded mt-2 flex justify-center gap-12 text-[9px] uppercase tracking-[0.25em] text-white/30"
                        >

                            <span>Days</span>

                            <span>Hours</span>

                            <span>Min</span>

                            <span>Sec</span>

                        </div>

                    </div>

                    <div className="mt-12">

                        <p
                            className="font-zalando-sans-semi-expanded text-xs uppercase tracking-[0.3em] text-white/30"
                        >
                            Announcement
                        </p>

                        <p
                            className="font-zalando-sans-semi-expanded mt-3 text-sm tracking-wider text-white/70"
                        >
                            SEPTEMBER 7, 2026
                        </p>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Header;
