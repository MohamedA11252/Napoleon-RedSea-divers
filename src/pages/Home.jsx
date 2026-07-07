import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpeditionGallery from "@/components/ExpedetionGallery";
import VesselSection from "@/components/VesselSection";
import HeritageSection from "@/components/HeritageSection";
import TestimonialsSection from "@/components/TestimonialSection";
import GuestCommentsSection from "@/components/GeustCommentSection";
import Footer from "@/components/Footer";
import DepthMeter from "@/components/DeepthMeter";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <DepthMeter />
      <HeroSection />
      <ExpeditionGallery />
      <VesselSection />
      <HeritageSection />
      <TestimonialsSection />
      <GuestCommentsSection />
      <Footer />
    </div>
  );
}