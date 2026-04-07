import React from 'react';
import HeroSection from '@/Components/home/HeroSection';
import TrustSection from '@/Components/home/TrustSection';
import CoursesPreview from '@/Components/home/CoursesPreview';
import HowItWorks from '@/Components/home/HowItWorks';
import SuccessStoriesSection from '@/Components/home/SuccessStoriesSection';
import CTASection from '@/Components/home/CTASection';
import { getContent } from '@/lib/content';

export async function getServerSideProps() {
  const content = getContent('home');
  return { props: { content } };
}

export default function Home({ content }) {
  const c = content || {};
  return (
    <>
      <HeroSection content={c.hero} />
      <TrustSection content={c.trust} />
      <CoursesPreview content={c.coursesPreview} />
      <HowItWorks content={c.howItWorks} />
      <SuccessStoriesSection content={c.successStories} />
      <CTASection />
    </>
  );
}
