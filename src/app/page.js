import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import LogoMarquee from '../components/LogoMarquee';
import TeamRegistration from '../components/TeamRegistration';
import NewsUpdates from '../components/NewsUpdates';
import './globals.css';
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoMarquee />
      <TeamRegistration />
      <NewsUpdates />
      <Footer />
    </main>
  );
}
