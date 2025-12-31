import { sanityFetch } from "../../sanity/lib/live";
import { allCertificateQuery } from "@/sanity/lib/queries";

export const Certificates = async () => {
  const { data } = await sanityFetch({
    query: allCertificateQuery,
  });

  if (!data || data.length === 0) {
    return <div>No certificates available.</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="carousel max-w-[70vw] h-full">
        {data.map((certicate: any, index: number) => (
          <div
            id={"slide" + index}
            key={certicate.description}
            className="carousel-item relative w-full"
          >
            <img
              src={
                certicate.image.asset
                  ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${certicate.image.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png").replace("-webp", ".webp")}`
                  : "/placeholder.svg"
              }
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#slide${index === 0 ? data.length - 1 : index - 1}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${index === data.length - 1 ? 0 : index + 1}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
