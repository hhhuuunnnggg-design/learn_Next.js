export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

// Mock data for blog posts
export const posts: Post[] = [
  {
    id: "1",
    title: "Bắt Đầu Với Next.js App Router",
    slug: "bat-dau-voi-nextjs-app-router",
    excerpt:
      "Tìm hiểu những điều cơ bản về Next.js App Router và cách nó cách mạng hóa việc phát triển React.",
    content: `
# Bắt Đầu Với Next.js App Router

Next.js App Router là một hệ thống routing mới mạnh mẽ được xây dựng trên React Server Components. Trong hướng dẫn toàn diện này, chúng ta sẽ khám phá các khái niệm và tính năng chính.

## App Router là gì?

App Router là hệ thống routing mới của Next.js được xây dựng trên React Server Components. Nó cung cấp:

- **File-based routing**: Tổ chức các route của bạn bằng hệ thống file
- **Server Components**: Render các component trên server để có hiệu suất tốt hơn
- **Client Components**: Thêm tính tương tác khi cần thiết
- **Nested layouts**: Tạo các layout có thể tái sử dụng cho các phần khác nhau

## Lợi ích chính

1. **Hiệu suất tốt hơn**: Server Components giảm kích thước JavaScript bundle
2. **SEO cải thiện**: Server-side rendering theo mặc định
3. **Data fetching đơn giản hóa**: Fetch dữ liệu trực tiếp trong Server Components
4. **Trải nghiệm nhà phát triển tốt hơn**: Xử lý lỗi và debug tốt hơn

## Bắt đầu

Để tạo một ứng dụng Next.js mới với App Router:

\`\`\`bash
npx create-next-app@latest my-app --app
\`\`\`

Flag \`--app\` đảm bảo bạn sử dụng App Router ngay từ đầu.

## Kết luận

App Router đại diện cho một bước tiến đáng kể trong việc phát triển React, mang lại hiệu suất, trải nghiệm nhà phát triển và trải nghiệm người dùng tốt hơn. Hãy bắt đầu khám phá ngay hôm nay!
    `,
    author: "Nguyễn Văn A",
    publishedAt: "2024-01-15",
    tags: ["Next.js", "React", "Hướng dẫn"],
  },
  {
    id: "2",
    title: "Hiểu Về Server vs Client Components",
    slug: "hieu-ve-server-vs-client-components",
    excerpt:
      "Một cái nhìn sâu sắc về sự khác biệt giữa Server và Client Components trong Next.js.",
    content: `
# Hiểu Về Server vs Client Components

Một trong những khái niệm quan trọng nhất trong Next.js App Router là hiểu khi nào nên sử dụng Server Components so với Client Components.

## Server Components

Server Components chạy trên server và được render thành HTML trước khi gửi đến client. Chúng:

- Chạy trên server trong quá trình build hoặc thời gian request
- Có thể truy cập trực tiếp các tài nguyên backend (cơ sở dữ liệu, hệ thống file, v.v.)
- Không bao gồm JavaScript trong client bundle
- Không thể sử dụng các API chỉ dành cho trình duyệt hoặc React hooks như useState

## Client Components

Client Components chạy trong trình duyệt và cung cấp tính tương tác. Chúng:

- Bao gồm JavaScript chạy trong trình duyệt
- Có thể sử dụng React hooks và browser APIs
- Cho phép tương tác người dùng và quản lý state
- Được đánh dấu bằng directive 'use client'

## Khi nào sử dụng mỗi loại

**Sử dụng Server Components cho:**
- Nội dung tĩnh
- Data fetching
- Nội dung quan trọng cho SEO
- Các component không cần tính tương tác

**Sử dụng Client Components cho:**
- Các phần tử tương tác (nút, form)
- Quản lý state
- Browser APIs
- Event handlers

## Thực hành tốt nhất

1. Bắt đầu với Server Components theo mặc định
2. Chỉ thêm 'use client' khi bạn cần tính tương tác
3. Giữ Client Components nhỏ và tập trung
4. Truyền dữ liệu từ Server sang Client Components dưới dạng props

## Kết luận

Hiểu sự khác biệt giữa Server và Client Components là rất quan trọng để xây dựng các ứng dụng Next.js hiệu quả. Sử dụng Server Components cho hiệu suất và Client Components cho tính tương tác.
    `,
    author: "Trần Thị B",
    publishedAt: "2024-01-12",
    tags: ["Next.js", "Server Components", "Hiệu suất"],
  },
  {
    id: "3",
    title: "Chiến Lược Data Fetching Trong Next.js",
    slug: "chien-luoc-data-fetching-trong-nextjs",
    excerpt:
      "Khám phá các chiến lược data fetching khác nhau bao gồm SSG, SSR, và ISR trong Next.js.",
    content: `
# Chiến Lược Data Fetching Trong Next.js

Next.js cung cấp nhiều chiến lược để fetch dữ liệu, mỗi chiến lược được tối ưu hóa cho các trường hợp sử dụng khác nhau. Hãy khám phá chúng một cách chi tiết.

## Static Site Generation (SSG)

SSG tạo ra các trang tại thời điểm build, làm cho chúng cực kỳ nhanh và thân thiện với SEO.

\`\`\`typescript
// Điều này chạy tại thời điểm build
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
\`\`\`

## Server-Side Rendering (SSR)

SSR tạo ra các trang trên mỗi request, hoàn hảo cho nội dung động.

\`\`\`typescript
// Điều này chạy trên mỗi request
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data');
  return { props: { data } };
}
\`\`\`

## Incremental Static Regeneration (ISR)

ISR kết hợp lợi ích của SSG với khả năng cập nhật nội dung mà không cần rebuild.

\`\`\`typescript
// Revalidate mỗi 60 giây
export const revalidate = 60;

export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }
  });
  // ...
}
\`\`\`

## Data Fetching trong App Router

Trong App Router, bạn có thể fetch dữ liệu trực tiếp trong Server Components:

\`\`\`typescript
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}
\`\`\`

## Chiến lược Caching

Next.js cung cấp caching tự động với các chiến lược khác nhau:

- **Request Memoization**: Loại bỏ các request giống nhau
- **Data Cache**: Cache các fetch request
- **Full Route Cache**: Cache toàn bộ page renders

## Kết luận

Chọn chiến lược data fetching dựa trên tần suất cập nhật nội dung và yêu cầu hiệu suất của bạn. SSG cho nội dung tĩnh, SSR cho nội dung động, và ISR cho sự kết hợp tốt nhất của cả hai.
    `,
    author: "Lê Văn C",
    publishedAt: "2024-01-10",
    tags: ["Next.js", "Data Fetching", "Hiệu suất", "SSG", "SSR", "ISR"],
  },
  {
    id: "4",
    title: "Xây Dựng Form Với Server Actions",
    slug: "xay-dung-form-voi-server-actions",
    excerpt:
      "Học cách xây dựng form hiện đại sử dụng Next.js Server Actions để có hiệu suất và trải nghiệm người dùng tốt hơn.",
    content: `
# Xây Dựng Form Với Server Actions

Server Actions là một tính năng mạnh mẽ trong Next.js cho phép bạn chạy code server-side trực tiếp từ form, loại bỏ nhu cầu về API routes.

## Server Actions là gì?

Server Actions là các function chạy trên server và có thể được gọi trực tiếp từ Client Components hoặc form. Chúng:

- Chạy trên server, không phải trong trình duyệt
- Có thể truy cập các tài nguyên server-side
- Cung cấp progressive enhancement
- Hoạt động mà không cần JavaScript được bật

## Tạo Server Action

\`\`\`typescript
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  // Validate data
  if (!title || !content) {
    return { error: 'Title and content are required' };
  }
  
  // Save to database
  const post = await db.posts.create({
    title,
    content,
  });
  
  return { success: true, post };
}
\`\`\`

## Sử dụng Server Actions trong Form

\`\`\`typescript
import { createPost } from './actions';

export default function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Post content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
\`\`\`

## Form Validation với Zod

Để validation tốt hơn, sử dụng Zod với Server Actions:

\`\`\`typescript
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

export async function createPost(formData: FormData) {
  const result = postSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });
  
  if (!result.success) {
    return { error: result.error.flatten() };
  }
  
  // Process valid data...
}
\`\`\`

## Progressive Enhancement

Server Actions hoạt động với progressive enhancement:

- Form hoạt động mà không cần JavaScript
- Được nâng cao với JavaScript khi có sẵn
- Quản lý trạng thái form tự động
- Xử lý lỗi tích hợp

## Kết luận

Server Actions cung cấp một cách hiện đại, hiệu quả để xử lý form submission và các thao tác server-side trong ứng dụng Next.js. Chúng loại bỏ nhu cầu về API routes trong khi cung cấp hiệu suất và trải nghiệm người dùng tốt hơn.
    `,
    author: "Phạm Thị D",
    publishedAt: "2024-01-08",
    tags: ["Next.js", "Server Actions", "Form", "Validation"],
  },
];

// Function to get all posts
export async function getAllPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return posts;
}

// Function to get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return posts.find((post) => post.slug === slug) || null;
}

// Function to get related posts
export async function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const currentPost = posts.find((post) => post.slug === currentSlug);
  if (!currentPost) return [];

  return posts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, limit);
}
