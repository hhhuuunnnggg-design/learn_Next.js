import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL && !process.env.DB_HOST) {
      return NextResponse.json(
        {
          success: false,
          message: "Thiếu cấu hình database (DATABASE_URL hoặc DB_*)",
        },
        { status: 500 }
      );
    }

    const json = await request.json();
    const parse = bodySchema.safeParse(json);
    if (!parse.success) {
      return NextResponse.json(
        { success: false, message: "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const { email, password } = parse.data;

    const [rows] = await db.query(
      "SELECT id, password, role FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const user =
      Array.isArray(rows) && rows.length > 0 ? (rows as any)[0] : null;
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, user.password as string);
    if (!ok) {
      return NextResponse.json(
        { success: false, message: "Email hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // TODO: Thiết lập session/JWT nếu cần
    return NextResponse.json(
      { success: true, role: user.role },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.code || error?.message || "Lỗi máy chủ",
      },
      { status: 500 }
    );
  }
}
