import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className='text-lg h-[300px] flex items-center justify-center'>
        WELCOME TO CZSSCUP
      </div>
      <Footer />
    </main>
  );
}
