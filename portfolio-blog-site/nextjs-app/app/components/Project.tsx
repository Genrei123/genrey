import Link from "next/link";

import { sanityFetch } from "@/sanity/lib/live";
import { allProjectsQuery, moreProjectQuery } from "@/sanity/lib/queries";
import { Project as ProjectType } from "@/sanity.types";
import DateComponent from "@/app/components/Date";
import OnBoarding from "@/app/components/Onboarding";

const Project = ({ project }: { project: ProjectType }) => {
  const { _id, title, slug, excerpt, date } = project;

  return (
    <article
      key={_id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="text-gray-500 text-sm">
        <DateComponent dateString={date} />
      </div>

      <h3 className="mt-3 text-2xl font-semibold">
        <Link
          className="hover:text-red-500 underline transition-colors"
          href={`/projects/${slug}`}
        >
          {title}
        </Link>
      </h3>
      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
        {excerpt}
      </p>
    </article>
  );
};

const Projects = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode;
  heading?: string;
  subHeading?: string;
}) => (
  <div>
    {heading && (
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>
    )}
    <div className="mt-6 pt-6 space-y-12">
      {children}
    </div>
  </div>
);

export const MoreProjects = async ({
  skip,
  limit,
}: {
  skip: string;
  limit: number;
}) => {
  const { data } = await sanityFetch({
    query: moreProjectQuery,
    params: { skip, limit },
  });

  if (!data || data.length === 0) {
    return null;
  }
};

export const AllProject = async () => {
  const { data } = await sanityFetch({ query: allProjectsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  return (
    <Projects
      heading="Projects!"
      subHeading={`${data.length === 1 ? "These projects are" : `These ${data.length} blog project are`} what I personally think!`}
    >
      {data.map((project: any) => (
        <Project key={project._id} project={project} />
        
      ))}
    </Projects>
  );
};
