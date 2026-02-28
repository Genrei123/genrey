import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";
import Avatar from "@/app/components/Avatar";
import PortableText from "@/app/components/PortableText";
import ImageCarousel from "@/app/components/ImageCarousel";
import { sanityFetch } from "@/sanity/lib/live";
import { projectPagesSlugs, projectQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import ProjectHeader from "@/app/components/ProjectHeader";
import Footer from "@/app/components/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: projectPagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const { data: project } = await sanityFetch({
    query: projectQuery,
    params,
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

  // Merge coverImage as the first slide, followed by any extra images
  const allImages = [
    ...(project.coverImage?.asset ? [{ _key: "cover", alt: project.coverImage.alt, asset: project.coverImage.asset }] : []),
    ...(project.images ?? []),
  ].filter((img) => img.asset);



  return (
    <div className="bg-gradient-to-b from-[#0a192f] via-[#0a192f] to-gray-900 text-gray-300 min-h-screen">
      <ProjectHeader projectTitle={project.title} />

      <main className="pt-24">
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
              {/* Carousel — cover image is always first, extra images follow */}
              {allImages.length > 0 && (
                <ImageCarousel images={allImages} youtubeUrl={project.youtube} />
              )}

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