import { useEffect, useRef, useState } from 'react'
import heroImage from '../assets/hero_sat.jpg'
import heroMask from '../assets/hero-mask_sat.png'
import '../components/Hero.css'

function Hero() {
  const heroRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let animationFrame

    const updateProgress = () => {
      const hero = heroRef.current
      if (!hero) return

      const viewportHeight = window.innerHeight || 1
      const travelDistance = Math.max(hero.offsetHeight - viewportHeight, 1)
      const progress = Math.min(Math.max(-hero.getBoundingClientRect().top / travelDistance, 0), 1)
      setScrollProgress(progress)
      animationFrame = undefined
    }

    const handleScroll = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [])

  const contentProgress = Math.min(Math.max((scrollProgress - 0.08) / 0.58, 0), 1)
  const contentOffset = 112 - contentProgress * 112
  const openingOpacity = 1 - Math.min(scrollProgress * 12, 1)

  return (
    <section ref={heroRef} id="inicio" aria-labelledby="hero-heading" className="relative h-[320svh] bg-black text-white">
      <div className="sticky top-0 isolate h-[100svh] overflow-hidden bg-black">
        <img
          src={heroImage}
          alt="Interfaz tecnológica iluminada en un entorno futurista"
          className="absolute inset-0 z-0 h-full w-full object-cover object-[62%_center]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 flex flex-col items-start pt-32 justify-start px-24 text-left transition-opacity duration-300"
          style={{ opacity: openingOpacity }}
        >
          <div className="flex flex-col">
            <p className="text-8xl text-[96px] text-white font-black font-zalando-sans-expanded">
              THE <br /> FUTURE IS
            </p>
            <p className="text-9xl text-[128px] -ml-1.5 text-white/15 font-black font-syncopate hero-highlighted-text tracking-tighter">
              HAPPENING.
            </p>
          </div>
          
        </div>

        <img
          src={heroMask}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-20 h-full w-full object-cover object-[62%_center] opacity-80"
        />

        {/* <div aria-hidden="true" className="absolute inset-0 z-30 bg-[linear-gradient(90deg,rgba(9,7,22,0.42)_0%,rgba(15,7,23,0.16)_54%,rgba(7,15,23,0.08)_100%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(0deg,rgba(9,7,22,0.78)_0%,rgba(9,7,22,0.4)_34%,transparent_76%)] backdrop-blur-[7px] [mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_85%)]"
          style={{ opacity: overlayOpacity }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-56 bg-linear-to-b from-transparent via-black/55 to-black sm:h-72"
        /> */}

        <div
          className="absolute inset-0 z-[60] flex w-full items-center px-6 sm:px-10 lg:px-16 xl:px-24"
          style={{
            opacity: Math.min(contentProgress * 1.8, 1),
            transform: `translateY(${contentOffset}%)`,
          }}
        >
          <div className="relative w-full max-w-[1160px] pl-8 py-8">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 blur-2xl w-full h-full -z-10"></div>
            <div className="max-w-4xl">
            {/*
            <div className="mb-6 flex items-center gap-3 text-xs font-dm-sans font-medium uppercase tracking-[0.28em] text-white">
              <Orbit size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>EVOLUTION</span>
            </div>*/}

            <h1 id="hero-heading" className="font-zalando-sans-expanded uppercase max-w-6xl text-left text-7xl font-black leading-[0.94] tracking-[-0.06em] text-white">
              We design the future from the <span className="font-syncopate -ml-[2.5px] hero-secondary-highlighted-text text-white/15">PRESENT.</span>
            </h1>

            <p className="mt-2 max-w-xl leading-normal text-left text-md font-dm-sans text-slate-200/80">
              Strategic technology to turn complex ideas into systems that think, learn, and advance with you.
            </p>

            {/*
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="#aboutUs" className="group font-dm-sans-semi-expanded font-bold inline-flex items-center gap-3 border border-white/35 rounded-sm px-5 py-3 text-sm text-white transition-colors hover:border-cyan-200 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
                EXPLORE
                <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>*/}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Hero
