"use server";

import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Vui lòng nhập email hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type RegisterFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
};

export async function register(
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  try {
    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const result = registerSchema.safeParse(raw);
    if (!result.success) {
      return {
        error: "Vui lòng sửa các lỗi bên dưới",
        fieldErrors: result.error.flatten().fieldErrors,
      };
    }

    const { name, email } = result.data;

    // Demo: ghi log. Tại đây bạn có thể lưu DB/gọi API
    console.log("User register:", {
      name,
      email,
      timestamp: new Date().toISOString(),
    });

    // Giả lập độ trễ
    await new Promise((r) => setTimeout(r, 700));

    return { success: true };
  } catch (err) {
    console.error("Register error:", err);
    return { error: "Đã xảy ra lỗi. Vui lòng thử lại." };
  }
}


