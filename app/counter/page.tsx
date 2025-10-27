import CounterButton from "./CounterButton";

export default function CounterPage() {
  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Server Component - Tiêu đề */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ví Dụ Đếm Số
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Điều này minh họa sự khác biệt giữa Server và Client Components
          </p>

          <div className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Cách hoạt động:
              </h2>
              <div className="text-left space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Server Component (trang này):</strong> Tiêu đề và
                      mô tả ở trên được render trên server
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Client Component (nút bên dưới):</strong> Nút đếm
                      sử dụng useState và chạy trong trình duyệt
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Tốt nhất của cả hai:</strong> Server components
                      cho nội dung tĩnh, Client components cho tính tương tác
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Component - Counter Button */}
            <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bộ Đếm Tương Tác (Client Component)
              </h3>
              <CounterButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
