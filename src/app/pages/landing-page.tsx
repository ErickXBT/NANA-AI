import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Tokenomics } from "../components/tokenomics";
import { Utilities } from "../components/utilities";
import { Roadmap } from "../components/roadmap";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white overflow-x-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <Navbar />
      <Hero />
      <About />
      <Tokenomics />
      <Utilities />
      <Roadmap />
      <Footer />
    </div>
  );
}
