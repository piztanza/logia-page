import { SEO } from './components/common/SEO';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { useAppLoading } from './hooks/useAppLoading';

// Layout & Sections
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Methodology } from './components/sections/Methodology';
import { ProductStage } from './components/sections/ProductStage';
import { Market } from './components/sections/Market';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export default function App() {
  const { isLoading, onAssetsReady } = useAppLoading();

  return (
    <div className="min-h-screen relative">
      <SEO />
      
      {/* Loading Screen overlays everything */}
      <LoadingScreen isLoading={isLoading} />
      
      {/* Ambient Subtle Light */}
      <div className="fixed top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 z-50"></div>

      <Navbar />
      <Hero />
      <About />

      <Services onReady={onAssetsReady} />

      <Methodology />

      <ProductStage />

      <Market />

      <Contact />

      <Footer />
    </div>
  );
}
