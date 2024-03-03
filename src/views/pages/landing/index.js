// src/App.js or src/components/LandingPage.js

import React from "react";
 import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import BusinessSection from "./BusinessSection";

function LandingPage() {
  return (
    <main>
      <HeroSection Home={true} />
      <ServicesSection />
      <BusinessSection />
    </main>
  );
}

export default LandingPage;
