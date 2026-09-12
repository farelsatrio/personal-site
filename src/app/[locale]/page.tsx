import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Achievements from "@/components/Achievements";
import BlogPreview from "@/components/BlogPreview";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Experience />
        <TechStack />
        <Achievements />
        <BlogPreview />
        <SocialLinks />
      </main>

      <Footer />
    </>
  );
}
