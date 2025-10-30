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

    const { email } = result.data;

    // Demo: ghi log. Tại đây bạn có thể gọi DB/NextAuth/bất kỳ dịch vụ nào
    console.log("User login:", {
      email,
      timestamp: new Date().toISOString(),
    });

    // Giả lập độ trễ
    await new Promise((r) => setTimeout(r, 600));

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Đã xảy ra lỗi. Vui lòng thử lại." };
  }
}
