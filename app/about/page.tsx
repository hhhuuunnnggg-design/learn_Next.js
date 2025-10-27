export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600">
            Learning Next.js App Router and modern web development
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What is this project?
            </h2>
            <p className="text-gray-700 mb-4">
              This is a comprehensive learning project designed to explore the
              latest features of Next.js, particularly the App Router and its
              modern approach to building React applications.
            </p>
            <p className="text-gray-700">
              Through this project, we'll learn about file-based routing, Server
              Components, Client Components, data fetching strategies, and
              Server Actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                App Router
              </h3>
              <p className="text-blue-800">
                File-based routing system that makes navigation intuitive and
                code organization clean.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                Server Components
              </h3>
              <p className="text-green-800">
                Components that render on the server for better performance and
                SEO optimization.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                Client Components
              </h3>
              <p className="text-purple-800">
                Interactive components that run in the browser for user
                interactions and state management.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-900 mb-3">
                Server Actions
              </h3>
              <p className="text-orange-800">
                Modern way to handle form submissions and server-side operations
                without API routes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
