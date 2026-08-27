import Hero from './sections/Hero'
import Navbar from './sections/Navbar'
import Showcase from './sections/Showcase'

export default function App() {
  return (
    <>
      <div className="page-top">
        <Navbar />
        <Hero />
      </div>
      <main>
        <Showcase />
      </main>
    </>
  )
}
