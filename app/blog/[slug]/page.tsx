import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../../lib/content/posts";
import { PostBlock } from "../../../lib/content/types";
import styles from "./post.module.css";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post ? post.title : "Post" };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className={styles.h2}>{block.text}</h2>;
    case "quote":
      return <blockquote className={styles.quote}>{block.text}</blockquote>;
    case "code":
      return (
        <pre className={`glass-thin block ${styles.code}`}>
          <code>{block.text}</code>
        </pre>
      );
    default:
      return <p className={styles.p}>{block.text}</p>;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="page">
      <div className={`container ${styles.narrow}`}>
        <Link href="/blog" className={styles.back}>
          ← All posts
        </Link>
        <article className={`glass-regular ${styles.article}`}>
          <p className="eyebrow">{post.date} · {post.readMinutes} min read</p>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.tags}>
            {post.tags.map((t) => (
              <span key={t} className="glass-thin badge">{t}</span>
            ))}
          </div>
          <div className={styles.body}>
            {post.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
