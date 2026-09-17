import AboutStats from "@/components/sections/AboutStats";
import CTABanner from "@/components/sections/CTABanner";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import Solutions from "@/components/sections/Solutions";
import Testimonials from "@/components/sections/Testimonials";


export default function Home() {
  return (
  <main>
    <Hero/>
    <AboutStats/>
    <Solutions/>
    <Pricing/>
    <Testimonials/>
    <HowItWorks/>
    <CTABanner/>
  </main>
  );
}
