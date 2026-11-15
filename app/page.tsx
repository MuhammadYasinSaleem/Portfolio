import Contact from "@/components/site/contact"
import Experience from "@/components/site/experience"
import Footer from "@/components/site/footer"
import Hero from "@/components/site/hero"
import Nav from "@/components/site/nav"
import Research from "@/components/site/research"
import Stack from "@/components/site/stack"
import Work from "@/components/site/work"
import Writing from "@/components/site/writing"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Research />
        <Experience />
        <Writing />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
