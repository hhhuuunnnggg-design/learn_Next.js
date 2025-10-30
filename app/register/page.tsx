import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="bg-white">
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Đăng Ký</h1>
          <p className="text-gray-600">Tạo tài khoản mới</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
