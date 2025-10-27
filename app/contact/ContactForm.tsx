"use client";

import { useFormState, useFormStatus } from "react-dom";
import { ContactFormState, submitContactForm } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
    >
      {pending ? "Đang gửi..." : "Gửi Tin Nhắn"}
    </button>
  );
}

export default function ContactForm() {
  const initialState: ContactFormState = {};
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Gửi tin nhắn cho chúng tôi
      </h2>

      {/* Success Message */}
      {state.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">
                <strong>Thành công!</strong> Tin nhắn của bạn đã được gửi thành
                công. Chúng tôi sẽ phản hồi sớm.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {state.error && !state.success && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">
                <strong>Lỗi:</strong> {state.error}
              </p>
            </div>
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tên *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              state.fieldErrors?.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Họ và tên của bạn"
          />
          {state.fieldErrors?.name && (
            <p className="mt-1 text-sm text-red-600">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        {/* Email Field */}
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
            placeholder="email.cua.ban@example.com"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-sm text-red-600">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tin nhắn *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
              state.fieldErrors?.message ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Hãy cho chúng tôi biết cách chúng tôi có thể giúp bạn..."
          />
          {state.fieldErrors?.message && (
            <p className="mt-1 text-sm text-red-600">
              {state.fieldErrors.message[0]}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <SubmitButton />

        {/* Form Info */}
        <div className="text-sm text-gray-500">
          <p>
            * Các trường bắt buộc. Chúng tôi sẽ phản hồi tin nhắn của bạn trong
            vòng 24 giờ.
          </p>
        </div>
      </form>
    </div>
  );
}
