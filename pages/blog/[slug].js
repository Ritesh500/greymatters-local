import Head from 'next/head';
import Link from 'next/link';
import { Clock, ArrowLeft, User, Tag } from 'lucide-react';
import { getContent } from '@/lib/content';
import CTASection from '@/Components/home/CTASection';

const CATEGORY_LABELS = {
  ielts_tips: 'IELTS Tips',
  pte_strategies: 'PTE Strategies',
  immigration_news: 'Immigration News',
  study_abroad: 'Study Abroad',
  general: 'General',
};

export async function getServerSideProps({ params }) {
  const content = getContent('blog');
  const posts = content.posts || [];
  const post = posts.find(p => p.slug === params.slug);
  if (!post) return { notFound: true };

  // Pass related posts (same category, excluding current)
  const related = posts
    .filter(p => p.slug !== params.slug && p.category === post.category)
    .slice(0, 3);

  return { props: { post, related } };
}

export default function BlogPost({ post, related }) {
  const categoryLabel = CATEGORY_LABELS[post.category] || post.category;

  return (
    <>
      <Head>
        <title>{post.title} — Grey Matters Blog</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <div className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full mb-4">
              {categoryLabel}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" /> {post.author}
                </span>
              )}
              {post.date && (
                <span>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {post.readTime} min read
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Cover image */}
        {post.image && (
          <div className="max-w-3xl mx-auto px-4 -mt-8">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Content */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-slate prose-lg max-w-none">
              <p className="text-xl text-slate-600 leading-relaxed font-medium border-l-4 border-red-500 pl-5 mb-8">
                {post.excerpt}
              </p>
              <p className="text-slate-500 italic text-sm">
                Full article content is managed via the admin panel. Add a content field to blog posts to display the full article here.
              </p>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 mt-10 pt-8 border-t border-slate-200">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">{categoryLabel}</span>
            </div>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="py-12 px-4 bg-slate-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rPost) => (
                  <Link key={rPost.slug} href={`/blog/${rPost.slug}`} className="group">
                    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow h-full">
                      {rPost.image && (
                        <div className="aspect-[16/9] overflow-hidden">
                          <img src={rPost.image} alt={rPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5">
                        <p className="text-xs font-semibold text-red-600 mb-2">{CATEGORY_LABELS[rPost.category] || rPost.category}</p>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">{rPost.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-3">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{rPost.readTime} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </div>
    </>
  );
}
