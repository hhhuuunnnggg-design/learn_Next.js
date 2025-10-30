// Script test kết nối MySQL
const mysql = require("mysql2/promise");

async function testConnection() {
  console.log("🔍 Đang kiểm tra kết nối MySQL...\n");

  // Đọc từ .env
  require("dotenv").config();

  const connectionString = process.env.DATABASE_URL;
  console.log(
    "DATABASE_URL:",
    connectionString ? "✓ Đã cấu hình" : "✗ CHƯA cấu hình"
  );

  if (!connectionString) {
    console.log("\n❌ Thiếu DATABASE_URL trong file .env");
    console.log("Vui lòng tạo file .env với nội dung:");
    console.log("DATABASE_URL=mysql://root:123456@localhost:3306/learn_nextjs");
    process.exit(1);
  }

  console.log("Chuỗi kết nối:", connectionString);
  console.log("\n📡 Đang thử kết nối...\n");

  try {
    const connection = await mysql.createConnection(connectionString);
    console.log("✅ KẾT NỐI THÀNH CÔNG!\n");

    // Test query
    const [rows] = await connection.query(
      "SELECT DATABASE() as db, USER() as user, VERSION() as version"
    );
    console.log("📊 Thông tin kết nối:");
    console.log("   Database:", rows[0].db);
    console.log("   User:", rows[0].user);
    console.log("   MySQL Version:", rows[0].version);

    // Kiểm tra bảng users
    console.log("\n🔍 Kiểm tra bảng users...");
    const [tables] = await connection.query("SHOW TABLES LIKE 'users'");
    if (tables.length > 0) {
      console.log("✅ Bảng users tồn tại");
      const [columns] = await connection.query("DESCRIBE users");
      console.log("\n📋 Cấu trúc bảng users:");
      columns.forEach((col) => {
        console.log(
          `   - ${col.Field}: ${col.Type} ${
            col.Null === "NO" ? "NOT NULL" : ""
          } ${col.Key === "PRI" ? "(PRIMARY KEY)" : ""}`
        );
      });
    } else {
      console.log("⚠️  Bảng users CHƯA tồn tại");
      console.log("\nTạo bảng bằng SQL:");
      console.log(`
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'USER') DEFAULT 'USER'
);
      `);
    }

    await connection.end();
    console.log("\n✅ Test hoàn tất!");
  } catch (error) {
    console.log("❌ LỖI KẾT NỐI!\n");
    console.log("Chi tiết lỗi:");
    console.log("   Code:", error.code);
    console.log("   Message:", error.message);

    if (error.code === "ER_ACCESS_DENIED_ERROR") {
      console.log("\n🔧 HƯỚNG DẪN SỬA LỖI ER_ACCESS_DENIED_ERROR:\n");
      console.log("1. Mở MySQL Command Line hoặc phpMyAdmin/MySQL Workbench");
      console.log("2. Chạy các lệnh sau:\n");
      console.log("   -- Tạo user nếu chưa có");
      console.log(
        "   CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY '123456';"
      );
      console.log("");
      console.log("   -- Hoặc đổi mật khẩu user root");
      console.log("   ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';");
      console.log("");
      console.log("   -- Cấp quyền");
      console.log(
        "   GRANT ALL PRIVILEGES ON learn_nextjs.* TO 'root'@'localhost';"
      );
      console.log("   FLUSH PRIVILEGES;");
      console.log("");
      console.log("3. Hoặc thử kết nối không cần mật khẩu:");
      console.log("   DATABASE_URL=mysql://root@localhost:3306/learn_nextjs");
      console.log("");
      console.log("4. Hoặc dùng user khác (nếu bạn có):");
      console.log(
        "   DATABASE_URL=mysql://YOUR_USER:YOUR_PASSWORD@localhost:3306/learn_nextjs"
      );
    } else if (error.code === "ECONNREFUSED") {
      console.log(
        "\n🔧 MySQL server không chạy hoặc không lắng nghe port 3306"
      );
      console.log("   - Kiểm tra MySQL service đã start chưa");
      console.log(
        "   - Hoặc thử port khác: mysql://root:123456@localhost:3307/learn_nextjs"
      );
    } else if (error.code === "ER_BAD_DB_ERROR") {
      console.log('\n🔧 Database "learn_nextjs" chưa tồn tại');
      console.log("   Tạo database: CREATE DATABASE learn_nextjs;");
    }

    process.exit(1);
  }
}

testConnection();
