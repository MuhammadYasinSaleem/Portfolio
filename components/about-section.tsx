export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#161130]/50">
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
              "Full-stack developer specializing in the MERN stack, with a strong passion for AI—building intelligent,
              scalable solutions that merge user experience with cutting-edge innovation." "From crafting sleek frontend
              interfaces to deploying AI-powered features, I turn complex ideas into impactful, real-world
              applications."
            </p>
            <p className="text-white/70">
              I started my journey as a frontend developer and gradually expanded my skills to include backend
              development and database management. I'm constantly learning and exploring new technologies to stay at the
              forefront of web development.
            </p>
            <p className="text-white/70">
              My approach to development focuses on creating clean, maintainable code that delivers exceptional user
              experiences. I believe in the power of well-designed systems and intuitive interfaces to solve real-world
              problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
