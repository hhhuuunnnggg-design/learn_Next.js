export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Giới Thiệu</h1>
          <p className="text-xl text-gray-600">
            Học tập Next.js App Router và phát triển web hiện đại
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Dự án này là gì?
            </h2>
            <p className="text-gray-700 mb-4">
              Đây là một dự án học tập toàn diện được thiết kế để khám phá các
              tính năng mới nhất của Next.js, đặc biệt là App Router và cách
              tiếp cận hiện đại để xây dựng ứng dụng React.
            </p>
            <p className="text-gray-700">
              Thông qua dự án này, chúng ta sẽ học về file-based routing, Server
              Components, Client Components, các chiến lược data fetching, và
              Server Actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                App Router
              </h3>
              <p className="text-blue-800">
                Hệ thống routing dựa trên file giúp điều hướng trực quan và tổ
                chức code sạch sẽ.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                Server Components
              </h3>
              <p className="text-green-800">
                Các component được render trên server để có hiệu suất tốt hơn và
                tối ưu hóa SEO.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                Client Components
              </h3>
              <p className="text-purple-800">
                Các component tương tác chạy trong trình duyệt để xử lý tương
                tác người dùng và quản lý state.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-900 mb-3">
                Server Actions
              </h3>
              <p className="text-orange-800">
                Cách hiện đại để xử lý form submission và các thao tác
                server-side mà không cần API routes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
