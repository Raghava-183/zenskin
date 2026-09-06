import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProofBand } from "@/components/ProofBand";
import { Benefits } from "@/components/Benefits";
import { Ritual } from "@/components/Ritual";
import { CampaignLines } from "@/components/CampaignLines";
import { OrderSection } from "@/components/OrderSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Marquee />
        <ProofBand />
        <Benefits />
        <Ritual />
        <CampaignLines />
        <OrderSection />
      </main>
      <SiteFooter />
    </>
  );
}
