import React from 'react';
import HeroSection from '@/Components/home/HeroSection';
import TrustSection from '@/Components/home/TrustSection';
import CoursesPreview from '@/Components/home/CoursesPreview';
import HowItWorks from '@/Components/home/HowItWorks';
import SuccessStoriesSection from '@/Components/home/SuccessStoriesSection';
import CTASection from '@/Components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <CoursesPreview />
      <HowItWorks />
      <SuccessStoriesSection />
      <CTASection />
    </>
  );
}