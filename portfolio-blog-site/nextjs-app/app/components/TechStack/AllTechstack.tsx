import { sanityFetch } from "@/sanity/lib/live";
import { allTechStackQuery } from "@/sanity/lib/queries";
import { TechStackViewer } from "./TechStackViewer";

function sanityImageUrl(ref: string): string {
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${ref
    .replace("image-", "")
    .replace(/-(?=jpg|png|webp|svg)/, ".")}`;
}

export const AllTechStack = async () => {
  const { data } = await sanityFetch({ query: allTechStackQuery });

  if (!data || data.length === 0) {
    return null;
  }

  const items = data.map((tech: any) => ({
    title:       tech.title ?? "",
    description: tech.description ?? "",
    imageSrc:    tech.image?.asset?._ref
      ? sanityImageUrl(tech.image.asset._ref)
      : "/placeholder.svg",
  }));

  return <TechStackViewer items={items} />;
};

export default AllTechStack;