import { sanityFetch } from "@/sanity/lib/live";
import { allProjectsQuery } from "@/sanity/lib/queries";
import OnBoarding from "@/app/components/Onboarding";
import { ProjectViewer } from "./ProjectViewer";

export const AllProject = async () => {
  const { data } = await sanityFetch({ query: allProjectsQuery });

  if (!data || data.length === 0) {
    return <div>No Projects Available</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        Projects!
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-300">
        {data.length === 1
          ? "This project is"
          : `These ${data.length} projects are`}{" "}
        what I proudly did!
      </p>
      <ProjectViewer data={data} />
    </div>
  );
};