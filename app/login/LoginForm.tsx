"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { login, type LoginFormState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
    >
      {pending ? "Đang đăng nhập..." : "Đăng Nhập"}
    </button>
  );
}

export default function LoginForm() {
  const initialState: LoginFormState = {};
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Đăng Nhập</h2>

      {state.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Thành công!</strong> Bạn đã đăng nhập.
          </p>
        </div>
      )}

      {state.error && !state.success && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>Lỗi:</strong> {state.error}
          </p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              state.fieldErrors?.email ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="ban@example.com"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-sm text-red-600">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mật khẩu *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              state.fieldErrors?.password ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {state.fieldErrors?.password && (
            <p className="mt-1 text-sm text-red-600">
              {state.fieldErrors.password[0]}
            </p>
          )}
        </div>

        <SubmitButton />
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Chưa có tài khoản có đúng không ku?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
