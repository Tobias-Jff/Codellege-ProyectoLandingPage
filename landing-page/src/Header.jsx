import { useEffect, useRef, useState } from "react";

function Header() {

    const [visible, setVisible] = useState(true);

    const lastScrollY = useRef(0);

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


    return (
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

                ${visible 
                    ? "opacity-100 pointer-events auto" 
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

                {/* Navegación izquierda */}

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
                            Services
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
                            Portfolio
                        </a>
                    </li>

                </ul>


                {/* Logo */}

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


                {/* Navegación derecha */}

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
                            Pricing
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
                            Upcoming
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
                            Contact
                        </a>
                    </li>

                </ul>

            </nav>

        </header>
    );
}

export default Header;
