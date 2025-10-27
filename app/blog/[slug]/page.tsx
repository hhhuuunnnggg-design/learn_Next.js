import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getAllPosts } from "../../data/posts";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = await getRelatedPosts(params.slug);

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-gray-700">Blog</Link>
            <span>→</span>
            <span className="text-gray-900">{post.title}</span>
          </div>
        </nav>
        
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div 
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: post.content.replace(/\n/g, '<br />') 
            }}
          />
        </article>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    <Link 
                      href={`/blog/${relatedPost.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {relatedPost.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/blog/${relatedPost.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
        
        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Blog
          </Link>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
