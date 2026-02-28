import { allExperienceQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "../../sanity/lib/live";
import { ExperienceViewer } from "./ExperienceViewer";

export const Experience = async () => {
  const { data } = await sanityFetch({
    query: allExperienceQuery,
  });

  if (!data || data.length === 0) {
    return <div>No experience available.</div>;
  }

  return (
    <div className="w-full h-full">
      <ExperienceViewer experiences={data} />
    </div>
  );
};

export default Experience;