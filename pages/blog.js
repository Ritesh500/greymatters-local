import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight, Search } from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import CTASection from '@/Components/home/CTASection';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Input } from '@/Components/ui/input';
import { getContent } from '@/lib/content';

export async function getServerSideProps() {
  const content = getContent('blog');
  return { props: { content } };
}

const CATEGORIES = [
  { id: 'all', label: 'All Posts' },
  { id: 'ielts_tips', label: 'IELTS Tips' },
  { id: 'pte_strategies', label: 'PTE Strategies' },
  { id: 'immigration_news', label: 'Immigration' },
  { id: 'study_abroad', label: 'Study Abroad' },
];

function getCategoryLabel(id) {
  return CATEGORIES.find(c => c.id === id)?.label || id;
}

export default function Blog({ content }) {
  const c = content || {};
  const hero = c.hero || {};
  const posts = c.posts || [];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter(p => p.featured);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded-full mb-6">
              {hero.badge ?? 'Expert Insights'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              {hero.heading ?? 'Resources &'} <span className="text-red-600">{hero.headingHighlight ?? 'Guides'}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">{hero.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <Link key={post.id || index} href={`/blog/${post.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">{post.title}</h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime} min read</span>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search & Filters */}
      <section className="py-8 bg-slate-50 border-y sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-white p-1 rounded-full border">
                {CATEGORIES.map(cat => (
                  <TabsTrigger key={cat.id} value={cat.id} className="rounded-full px-4 text-sm">{cat.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link key={post.id || index} href={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full mb-3">
                      {getCategoryLabel(post.category)}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime} min</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
