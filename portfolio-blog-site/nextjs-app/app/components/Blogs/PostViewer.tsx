"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DateComponent from "@/app/components/Date";

const INITIAL_COUNT = 3;

const Post = ({ post }: { post: any }) => {
  const { title, slug, date, coverImage } = post;

  const src = coverImage?.asset?._ref
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${coverImage.asset._ref
        .replace("image-", "")
        .replace(/-(?=jpg|png|webp)/, ".")}`
    : "/placeholder.svg";

  return (
    <article className="flex flex-col rounded-lg border border-gray-700 bg-gray-800 shadow-sm overflow-hidden h-full hover:shadow-md transition-all duration-200 hover:border-cyan-400">
      {coverImage && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={src}
            alt={coverImage.alt || title || "Post cover image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="text-gray-400 text-sm font-medium">
          <DateComponent dateString={date} />
        </div>
        <h3 className="mt-3 text-xl font-bold text-white">
          <Link className="hover:text-cyan-400 transition-colors" href={`/posts/${slug}`}>
            {title}
          </Link>
        </h3>
        <div className="mt-auto pt-4 border-t border-gray-700">
          <Link
            href={`/posts/${slug}`}
            className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export function PostViewer({ data }: { data: any[] }) {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? data : data.slice(0, INITIAL_COUNT);
  const hasMore = data.length > INITIAL_COUNT;

  return (
    <div>
      <div className="mt-8 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-400 text-sm font-semibold hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-200"
          >
            {expanded ? (
              <>
                Show less
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                View all {data.length} posts
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}