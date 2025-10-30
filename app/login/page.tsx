import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-white">
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Đăng Nhập</h1>
          <p className="text-gray-600">Truy cập tài khoản của bạn 123</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
