import HeroSection from "../components/homepage/herosection";
import Navbar from "../components/navbar";

export default async function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
    </div>
  );
}
