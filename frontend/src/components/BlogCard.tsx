import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured }: BlogCardProps) {
  return (
    <div
      className={`card-animate group rounded-xl overflow-hidden flex flex-col h-full transition-all duration-200 ${featured ? 'md:flex-row md:col-span-2' : ''}`}
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <Link href={`/blog/${post.slug}`} className={`relative overflow-hidden block ${featured ? 'md:w-1/2 min-h-[250px]' : 'aspect-video'}`}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[var(--accent)] text-black text-[10px] font-bold px-2 py-1 rounded-md uppercase">
            {post.category}
          </span>
        </div>
      </Link>

      <div className={`p-6 flex flex-col flex-grow ${featured ? 'md:w-1/2 justify-center' : ''}`}>
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
          <span>📅 {new Date(post.publishedAt).toLocaleDateString()}</span>
          <span>⏱ {post.readTime}</span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className={`font-black uppercase mb-3 group-hover:text-[var(--accent)] transition-colors leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-lg'}`} style={{ color: 'var(--text-primary)' }}>
            {post.title}
          </h3>
        </Link>

        <p className="text-sm line-clamp-3 mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--accent)] rounded-full flex items-center justify-center text-[10px] font-bold text-black uppercase">
              {post.author.name.charAt(0)}
            </div>
            <span className="text-xs font-bold uppercase" style={{ color: 'var(--text-primary)' }}>{post.author.name}</span>
          </div>

          <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-[var(--accent)] uppercase hover:underline">
            READ MORE →
          </Link>
        </div>
      </div>
    </div>
  );
}
