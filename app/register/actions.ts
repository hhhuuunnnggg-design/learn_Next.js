"use server";

import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  role: z.enum(["ADMIN", "USER"]),
});

export type RegisterFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
    role?: string[];
  };
};

export async function register(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  try {
    const raw = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as "ADMIN" | "USER",
    };

    const result = registerSchema.safeParse(raw);
    if (!result.success) {
      return {
        error: "Vui lòng sửa các lỗi bên dưới",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { email, password, role } = result.data;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ email, password, role }),
    });

    const data = (await res.json()) as { success?: boolean; message?: string };
    if (!res.ok || !data.success) {
      return { error: data.message || "Đăng ký thất bại" };
    }

    return { success: true };
  } catch (err) {
    console.error("Register error:", err);
    return { error: "Đã xảy ra lỗi. Vui lòng thử lại." };
  }
}
