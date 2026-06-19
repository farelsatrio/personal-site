import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import TechStack from "@/components/TechStack";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";

function SectionDivider() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <hr className="border-border" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Achievements />
        <SectionDivider />
        <TechStack />
        <SectionDivider />
        <SocialLinks />
      </main>

      <Footer />
    </>
  );
}