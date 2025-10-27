import Link from "next/link";
import { getAllPosts } from "./data/posts";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Chào Mừng Đến Với Ứng Dụng Next.js Của Tôi
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Đây là dự án học tập để hiểu về Next.js App Router, Server
            Components, Client Components, và các tính năng hiện đại của
            Next.js.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                App Router
              </h3>
              <p className="text-gray-600 mb-4">
                Tìm hiểu về file-based routing và nested layouts
              </p>
              <Link
                href="/about"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Khám Phá →
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Components
              </h3>
              <p className="text-gray-600 mb-4">
                Server vs Client Components với tính tương tác
              </p>
              <Link
                href="/counter"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Thử Đếm Số →
              </Link>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Bảng Điều Khiển
              </h3>
              <p className="text-gray-600 mb-4">
                Layout lồng nhau với thanh điều hướng bên
              </p>
              <Link
                href="/dashboard"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Xem Bảng Điều Khiển →
              </Link>
            </div>
          </div>

          {/* Blog Section */}
          <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Bài Viết Blog Mới Nhất
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.slice(0, 4).map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Đọc thêm →
                  </Link>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Xem Tất Cả Bài Viết
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
