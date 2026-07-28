export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">About Me</h2>
            <p className="mx-auto max-w-[700px] text-white/70 md:text-xl">
              Get to know more about my background and experience
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <div className="space-y-6 text-center sm:text-left">
            <p className="text-lg text-white">
              Full-stack software engineer specializing in Django/DRF, React, and Next.js, with a track record of designing scalable backend systems and AWS-based infrastructure. Worked across multiple backend frameworks, including FastAPI and Express.js, with experience in RESTful API design, system architecture, and shipping production-ready applications with integrated AI capabilities.
            </p>
            <p className="text-white/70">
              I focus on building robust, production-grade applications that solve real business problems. From designing complex backend systems to creating intuitive frontend interfaces, I turn requirements into scalable solutions.
            </p>
            <p className="text-white/70">
              My approach emphasizes clean architecture, automated testing, and continuous integration. I believe in the power of well-designed systems and intuitive interfaces to deliver exceptional user experiences while maintaining technical excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
