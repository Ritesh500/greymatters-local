import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Clock, ArrowRight, Search, Tag } from 'lucide-react';
import SectionHeading from '@/Components/common/SectionHeading';
import CTASection from '@/Components/home/CTASection';
import { Tabs, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Input } from '@/Components/ui/input';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'IELTS Writing Task 2: Complete Guide to Band 8+',
      slug: 'ielts-writing-task-2-guide',
      category: 'ielts_tips',
      excerpt: 'Master the art of essay writing with our comprehensive guide covering structure, vocabulary, and common mistakes to avoid.',
      image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800',
      author: 'Dr. Priya Sharma',
      readTime: 8,
      date: '2024-01-15',
      featured: true
    },
    {
      id: 2,
      title: 'Canada Express Entry 2024: Complete CRS Calculator Guide',
      slug: 'canada-express-entry-crs-2024',
      category: 'immigration_news',
      excerpt: 'Everything you need to know about the Comprehensive Ranking System and how to maximize your CRS score.',
      image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800',
      author: 'Vikram Singh',
      readTime: 12,
      date: '2024-01-12',
      featured: true
    },
    {
      id: 3,
      title: 'PTE Speaking: AI Scoring Secrets Revealed',
      slug: 'pte-speaking-ai-scoring',
      category: 'pte_strategies',
      excerpt: 'Understand how the PTE AI evaluates your speaking responses and learn strategies to score 90+.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      author: 'Rahul Menon',
      readTime: 6,
      date: '2024-01-10',
      featured: false
    },
    {
      id: 4,
      title: '10 Common IELTS Speaking Mistakes Indians Make',
      slug: 'ielts-speaking-mistakes-indians',
      category: 'ielts_tips',
      excerpt: 'Avoid these frequent errors that cost Indian students valuable band scores in the speaking module.',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800',
      author: 'Dr. Priya Sharma',
      readTime: 5,
      date: '2024-01-08',
      featured: false
    },
    {
      id: 5,
      title: 'Australia Student Visa (Subclass 500): Step-by-Step Guide',
      slug: 'australia-student-visa-500-guide',
      category: 'study_abroad',
      excerpt: 'Complete roadmap for Indian students applying for Australian student visa in 2024.',
      image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800',
      author: 'Meera Krishnan',
      readTime: 10,
      date: '2024-01-05',
      featured: false
    },
    {
      id: 6,
      title: 'IELTS vs PTE: Which Test Should You Take in 2024?',
      slug: 'ielts-vs-pte-2024',
      category: 'general',
      excerpt: 'A detailed comparison to help you choose the right English proficiency test for your goals.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
      author: 'Dr. Priya Sharma',
      readTime: 7,
      date: '2024-01-03',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'ielts_tips', label: 'IELTS Tips' },
    { id: 'pte_strategies', label: 'PTE Strategies' },
    { id: 'immigration_news', label: 'Immigration' },
    { id: 'study_abroad', label: 'Study Abroad' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(p => p.featured);

  const getCategoryLabel = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.label || categoryId;
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded-full mb-6">
              Expert Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Resources & <span className="text-red-600">Guides</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Expert tips, strategies, and updates to help you succeed in your 
              IELTS, PTE, and immigration journey.
            </p>
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
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                >
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                          {getCategoryLabel(post.category)}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} min read
                      </span>
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
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="bg-white p-1 rounded-full border">
                {categories.map(cat => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id}
                    className="rounded-full px-4 text-sm"
                  >
                    {cat.label}
                  </TabsTrigger>
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
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
              >
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full mb-3">
                      {getCategoryLabel(post.category)}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} min
                      </span>
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