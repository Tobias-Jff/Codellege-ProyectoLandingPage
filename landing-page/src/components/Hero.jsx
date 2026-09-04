import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ArrowRight, Orbit } from 'lucide-react'
import heroImage from '../assets/hero.jpg'

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
  const overlayOpacity = Math.min(contentProgress * 1.4, 1)
  const openingOpacity = 1 - Math.min(scrollProgress * 12, 1)

  return (
    <section ref={heroRef} id="inicio" aria-labelledby="hero-heading" className="relative h-[320svh] bg-black text-white">
      <div className="sticky top-0 isolate h-[100svh] overflow-hidden bg-black">
        <img
          src={heroImage}
          alt="Interfaz tecnológica iluminada en un entorno futurista"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_center]"
        />

        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,7,22,0.42)_0%,rgba(15,7,23,0.16)_54%,rgba(7,15,23,0.08)_100%)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(0deg,rgba(9,7,22,0.78)_0%,rgba(9,7,22,0.4)_34%,transparent_76%)] backdrop-blur-[7px] [mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_85%)]"
          style={{ opacity: overlayOpacity }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 flex items-center justify-start px-6 text-left transition-opacity duration-300 sm:px-10 lg:px-16 xl:px-24"
          style={{ opacity: openingOpacity }}
        >
          <p className="">
            Future is coming.
          </p>
        </div>

        <div
          className="absolute inset-0 z-20 flex w-full items-center px-6 sm:px-10 lg:px-16 xl:px-24"
          style={{
            opacity: Math.min(contentProgress * 1.8, 1),
            transform: `translateY(${contentOffset}%)`,
          }}
        >
          <div className="w-full max-w-[1440px]">
            <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-cyan-200/80">
              <Orbit size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>Inteligencia que evoluciona</span>
            </div>

            <h1 id="hero-heading" className="max-w-4xl text-left text-5xl font-light leading-[0.94] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              Diseñamos el futuro desde el <span className="text-cyan-200">presente.</span>
            </h1>

            <p className="mt-8 max-w-xl text-left text-base leading-7 text-slate-200/80 sm:text-lg">
              Tecnología estratégica para convertir ideas complejas en sistemas que piensan, aprenden y avanzan contigo.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="#aboutUs" className="group inline-flex items-center gap-3 border border-white/35 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-cyan-200 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
                EXPLORE
                <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Hero
