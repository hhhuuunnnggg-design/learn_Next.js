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
    title: "Getting Started with Next.js App Router",
    slug: "getting-started-nextjs-app-router",
    excerpt:
      "Learn the fundamentals of Next.js App Router and how it revolutionizes React development.",
    content: `
# Getting Started with Next.js App Router

Next.js App Router is a powerful new routing system that brings many improvements to React applications. In this comprehensive guide, we'll explore the key concepts and features.

## What is App Router?

The App Router is Next.js's new routing system built on React Server Components. It provides:

- **File-based routing**: Organize your routes using the file system
- **Server Components**: Render components on the server for better performance
- **Client Components**: Add interactivity where needed
- **Nested layouts**: Create reusable layouts for different sections

## Key Benefits

1. **Better Performance**: Server Components reduce the JavaScript bundle size
2. **Improved SEO**: Server-side rendering by default
3. **Simplified Data Fetching**: Fetch data directly in Server Components
4. **Enhanced Developer Experience**: Better error handling and debugging

## Getting Started

To create a new Next.js app with App Router:

\`\`\`bash
npx create-next-app@latest my-app --app
\`\`\`

The \`--app\` flag ensures you're using the App Router from the start.

## Conclusion

The App Router represents a significant step forward in React development, offering better performance, developer experience, and user experience. Start exploring it today!
    `,
    author: "John Doe",
    publishedAt: "2024-01-15",
    tags: ["Next.js", "React", "Tutorial"],
  },
  {
    id: "2",
    title: "Understanding Server vs Client Components",
    slug: "understanding-server-vs-client-components",
    excerpt:
      "A deep dive into the differences between Server and Client Components in Next.js.",
    content: `
# Understanding Server vs Client Components

One of the most important concepts in Next.js App Router is understanding when to use Server Components versus Client Components.

## Server Components

Server Components run on the server and are rendered to HTML before being sent to the client. They:

- Run on the server during the build process or request time
- Can directly access backend resources (databases, file systems, etc.)
- Don't include JavaScript in the client bundle
- Cannot use browser-only APIs or React hooks like useState

## Client Components

Client Components run in the browser and provide interactivity. They:

- Include JavaScript that runs in the browser
- Can use React hooks and browser APIs
- Enable user interactions and state management
- Are marked with the 'use client' directive

## When to Use Each

**Use Server Components for:**
- Static content
- Data fetching
- SEO-critical content
- Components that don't need interactivity

**Use Client Components for:**
- Interactive elements (buttons, forms)
- State management
- Browser APIs
- Event handlers

## Best Practices

1. Start with Server Components by default
2. Only add 'use client' when you need interactivity
3. Keep Client Components small and focused
4. Pass data from Server to Client Components as props

## Conclusion

Understanding the distinction between Server and Client Components is crucial for building efficient Next.js applications. Use Server Components for performance and Client Components for interactivity.
    `,
    author: "Jane Smith",
    publishedAt: "2024-01-12",
    tags: ["Next.js", "Server Components", "Performance"],
  },
  {
    id: "3",
    title: "Data Fetching Strategies in Next.js",
    slug: "data-fetching-strategies-nextjs",
    excerpt:
      "Explore different data fetching strategies including SSG, SSR, and ISR in Next.js.",
    content: `
# Data Fetching Strategies in Next.js

Next.js provides multiple strategies for fetching data, each optimized for different use cases. Let's explore them in detail.

## Static Site Generation (SSG)

SSG generates pages at build time, making them extremely fast and SEO-friendly.

\`\`\`typescript
// This runs at build time
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
\`\`\`

## Server-Side Rendering (SSR)

SSR generates pages on each request, perfect for dynamic content.

\`\`\`typescript
// This runs on each request
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data');
  return { props: { data } };
}
\`\`\`

## Incremental Static Regeneration (ISR)

ISR combines the benefits of SSG with the ability to update content without rebuilding.

\`\`\`typescript
// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }
  });
  // ...
}
\`\`\`

## App Router Data Fetching

In the App Router, you can fetch data directly in Server Components:

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

## Caching Strategies

Next.js provides automatic caching with different strategies:

- **Request Memoization**: Deduplicates identical requests
- **Data Cache**: Caches fetch requests
- **Full Route Cache**: Caches entire page renders

## Conclusion

Choose your data fetching strategy based on your content's update frequency and performance requirements. SSG for static content, SSR for dynamic content, and ISR for the best of both worlds.
    `,
    author: "Mike Johnson",
    publishedAt: "2024-01-10",
    tags: ["Next.js", "Data Fetching", "Performance", "SSG", "SSR", "ISR"],
  },
  {
    id: "4",
    title: "Building Forms with Server Actions",
    slug: "building-forms-server-actions",
    excerpt:
      "Learn how to build modern forms using Next.js Server Actions for better performance and user experience.",
    content: `
# Building Forms with Server Actions

Server Actions are a powerful feature in Next.js that allows you to run server-side code directly from forms, eliminating the need for API routes.

## What are Server Actions?

Server Actions are functions that run on the server and can be called directly from Client Components or forms. They:

- Run on the server, not in the browser
- Can access server-side resources
- Provide progressive enhancement
- Work without JavaScript enabled

## Creating a Server Action

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

## Using Server Actions in Forms

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

## Form Validation with Zod

For better validation, use Zod with Server Actions:

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

Server Actions work with progressive enhancement:

- Forms work without JavaScript
- Enhanced with JavaScript when available
- Automatic form state management
- Built-in error handling

## Conclusion

Server Actions provide a modern, efficient way to handle form submissions and server-side operations in Next.js applications. They eliminate the need for API routes while providing better performance and user experience.
    `,
    author: "Sarah Wilson",
    publishedAt: "2024-01-08",
    tags: ["Next.js", "Server Actions", "Forms", "Validation"],
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
