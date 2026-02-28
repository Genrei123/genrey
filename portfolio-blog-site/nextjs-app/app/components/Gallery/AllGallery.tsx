import { allGalleryImagesQuery } from "@/sanity/lib/queries";
import { GalleryViewer } from "./GalleryViewer";
import { sanityFetch } from "@/sanity/lib/live";

export const AllGallery = async () => {
  const { data } = await sanityFetch({
    query: allGalleryImagesQuery,
  });

  if (!data || data.length === 0) {
    return <div>No gallery images available.</div>;
  }

  return <GalleryViewer data={data} />;
};