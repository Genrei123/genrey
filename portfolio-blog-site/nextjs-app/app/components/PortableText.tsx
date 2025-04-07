/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";

import ResolvedLink from "@/app/components/ResolvedLink";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      // Normal paragraph
      normal: ({ children }) => (
        <p className="my-4 text-gray-300">{children}</p>
      ),
      // Headings
      h1: ({ children, value }) => (
        <h1 
          id={value?._key} 
          className="group relative text-3xl font-bold mt-8 mb-4 text-white"
        >
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({ children, value }) => {
        return (
          <h2 
            id={value?._key} 
            className="group relative text-2xl font-bold mt-6 mb-3 text-white"
          >
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </h2>
        );
      },
      h3: ({ children, value }) => (
        <h3 
          id={value?._key} 
          className="text-xl font-bold mt-5 mb-3 text-white"
        >
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-lg font-bold mt-4 mb-2 text-white">{children}</h4>
      ),
      // Blockquotes
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-cyan-500 pl-4 my-6 italic text-gray-400">
          {children}
        </blockquote>
      ),
      // Lists
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
      ),
    },
    marks: {
      // Text formatting
      strong: ({ children }) => (
        <strong className="font-bold text-cyan-300">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-300">{children}</em>
      ),
      code: ({ children }) => (
        <code className="bg-gray-800 rounded px-1 py-0.5 font-mono text-sm text-cyan-400">
          {children}
        </code>
      ),
      underline: ({ children }) => (
        <span className="underline decoration-cyan-400">{children}</span>
      ),
      strike: ({ children }) => (
        <span className="line-through text-gray-500">{children}</span>
      ),
      // Links
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link} className="text-cyan-400 hover:underline">{children}</ResolvedLink>;
      },
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="text-gray-300">{children}</li>
      ),
      number: ({ children }) => (
        <li className="text-gray-300">{children}</li>
      ),
    },
  };

  return (
    <div
      className={[
        "prose prose-invert prose-cyan max-w-none", 
        "prose-headings:text-white prose-p:text-gray-300",
        "prose-strong:font-bold prose-strong:text-cyan-300",
        "prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline",
        "prose-blockquote:border-cyan-500 prose-blockquote:text-gray-400",
        "prose-code:text-cyan-400 prose-code:bg-gray-800",
        "prose-pre:bg-gray-800 prose-pre:text-gray-300",
        "prose-ol:text-gray-300 prose-ul:text-gray-300",
        "prose-li:text-gray-300",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <PortableText components={components} value={value} />
    </div>
  );
}