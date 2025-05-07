import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";
import { Suspense } from "react";

import Avatar from "@/app/components/Avatar";
import CoverImage from "@/app/components/CoverImage";
import { MoreProjects } from "../../components/Project";
import PortableText from "@/app/components/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { projectPagesSlugs, projectQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import ProjectHeader from "@/app/components/ProjectHeader";
import Footer from "@/app/components/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: projectPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const { data: project } = await sanityFetch({
    query: projectQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(project?.coverImage);

  return {
    authors:
      project?.author?.firstName && project?.author?.lastName
        ? [{ name: `${project.author.firstName} ${project.author.lastName}` }]
        : [],
    title: project?.title,
    description: project?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function ProjectPage(props: Props) {
  const params = await props.params;
  const [{ data: project }] = await Promise.all([
    sanityFetch({ query: projectQuery, params }),
  ]);

  if (!project?._id) {
    return notFound();
  }

  return (
    <div className="bg-gradient-to-b from-[#0a192f] via-[#0a192f] to-gray-900 text-gray-300 min-h-screen">
      <ProjectHeader projectTitle={project.title} />
      
      <main className="pt-24"> {/* Added padding for fixed header */}
        <div className="justify-center container mx-auto px-4 my-12 lg:my-24 grid gap-12">
          <div>
            <div className="pb-6 grid gap-6 mb-6 border-b border-gray-700">
              <div className="max-w-3xl flex flex-col gap-6">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
                  {project.title}
                </h2>
                {project.excerpt && (
                  <p className="text-lg text-gray-300">{project.excerpt}</p>
                )}
              </div>
              <div className="max-w-3xl flex gap-4 items-center">
                {project.author &&
                  project.author.firstName &&
                  project.author.lastName && (
                    <Avatar person={project.author} date={project.date} />
                  )}
              </div>
            </div>
            <article className="gap-8 grid max-w-4xl">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <CoverImage image={project.coverImage} priority />
              </div>
              {project.content?.length && (
                <PortableText
                  className="max-w-2xl text-gray-300 prose prose-invert prose-cyan"
                  value={project.content as PortableTextBlock[]}
                />
              )}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}