"use server";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export type LoginFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export async function login(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  try {
    const raw = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = loginSchema.safeParse(raw);
    if (!result.success) {
      return {
        error: "Vui lòng sửa các lỗi bên dưới",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { email, password } = result.data;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ email, password }),
    });

    const data = (await res.json()) as { success?: boolean; message?: string };
    if (!res.ok || !data.success) {
      return { error: data.message || "Đăng nhập thất bại" };
    }

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Đã xảy ra lỗi. Vui lòng thử lại." };
  }
}
