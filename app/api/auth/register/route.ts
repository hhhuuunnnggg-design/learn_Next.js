import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "USER"]).optional().default("USER"),
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

    const { email, password, role } = parse.data;

    const [rows] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    // rows typed as any due to mysql2 typings
    const exists = Array.isArray(rows) && rows.length > 0;
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Email đã tồn tại" },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      [email, hash, role]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Register API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.code || error?.message || "Lỗi máy chủ",
      },
      { status: 500 }
    );
  }
}
