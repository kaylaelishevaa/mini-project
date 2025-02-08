// components/HeroSection.tsx
import React from "react";

import HomeEvent from "../home-event";
import Welcome from "../welcome";

const HeroSection: React.FC = () => {
  return (
    <section>
      <div className="p-12">
        <Welcome />
      </div>
      <div>
        <HomeEvent />
      </div>
    </section>
  );
};

export default HeroSection;
