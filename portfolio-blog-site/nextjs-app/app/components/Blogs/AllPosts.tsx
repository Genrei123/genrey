import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery } from "@/sanity/lib/queries";
import OnBoarding from "@/app/components/Onboarding";
import { PostViewer } from "./PostViewer";

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Recent Posts
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-300">
        {data.length === 1
          ? "This blog post is my way of sharing my thoughts and experience"
          : `These ${data.length} blog posts are`}{" "}
        just my opinions, experience and thoughts
      </p>
      <PostViewer data={data} />
    </div>
  );
};