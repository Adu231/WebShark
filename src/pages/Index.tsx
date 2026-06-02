import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import HeroSection from '@/components/features/HeroSection';
import FeaturesSection from '@/components/features/FeaturesSection';
import WorkflowSection from '@/components/features/WorkflowSection';
import BenefitsSection from '@/components/features/BenefitsSection';
import DashboardPreviewSection from '@/components/features/DashboardPreviewSection';
import TestimonialsSection from '@/components/features/TestimonialsSection';
import PricingSection from '@/components/features/PricingSection';
import FAQSection from '@/components/features/FAQSection';
import CTABanner from '@/components/features/CTABanner';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <BenefitsSection />
        <DashboardPreviewSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
