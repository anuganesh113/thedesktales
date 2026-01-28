import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import CustomDesignCTA from '@/components/home/CustomDesignCTA';
import BestsellersSection from '@/components/home/BestsellersSection';
import LatestAdditionsSection from '@/components/home/LatestAdditionsSection';
import DesignerSpotlight from '@/components/home/DesignerSpotlight';
import FeaturesSection from '@/components/home/FeaturesSection';
import SocialProofSection from '@/components/home/SocialProofSection';
import FinalCTASection from '@/components/home/FinalCTASection';

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <CategorySection />
      <CustomDesignCTA />
      <BestsellersSection />
      <LatestAdditionsSection />
      <DesignerSpotlight />
      <FeaturesSection />
      <SocialProofSection />
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
