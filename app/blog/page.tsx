import Link from "next/link";
import { posts } from "../../lib/content/posts";
import styles from "./page.module.css";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <div className="page">
      <div className="container">
        <p className="eyebrow">Engineering journal</p>
        <h1 className="section-title">Blog</h1>
        <p className="section-sub">
          Notes from the 48-week program and the builds along the way —
          written to survive explanation, rough edges included.
        </p>
        <div className={styles.list}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`glass-regular glass-specular ${styles.card}`}
            >
              <div className={styles.top}>
                <span className={styles.date}>{post.date}</span>
                <span className={styles.read}>{post.readMinutes} min read</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className={styles.tags}>
                {post.tags.map((t) => (
                  <span key={t} className="glass-thin badge">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
