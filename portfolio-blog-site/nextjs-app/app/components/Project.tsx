import type React from "react"
import Link from "next/link"
import Image from "next/image"

import { sanityFetch } from "@/sanity/lib/live"
import { allProjectsQuery, moreProjectQuery } from "@/sanity/lib/queries"
import type { Project as ProjectType } from "@/sanity.types"
import DateComponent from "@/app/components/Date"
import OnBoarding from "@/app/components/Onboarding"

const Project = ({ project }: { project: ProjectType }) => {
  const { _id, title, slug, excerpt, date, coverImage } = project

  return (
    <article
      key={_id}
      className="flex flex-col rounded-lg border border-gray-700 bg-gray-800 shadow-sm overflow-hidden h-full hover:shadow-md transition-shadow duration-200 hover:border-cyan-400"
    >
      {coverImage && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={coverImage.asset ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${coverImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}` : "/placeholder.svg"}
            alt={coverImage.alt || title || "Post cover image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col h-full">
        <div className="text-gray-400 text-sm font-medium">
          <DateComponent dateString={date} />
        </div>

        <h3 className="mt-3 text-xl font-bold text-white">
          <Link className="hover:text-cyan-400 transition-colors" href={`/projects/${slug}`}>
            {title}
          </Link>
        </h3>
        <p className="mt-4 line-clamp-3 text-base leading-relaxed text-gray-300 flex-grow">{excerpt}</p>
        <div className="mt-5 pt-4 border-t border-gray-700">
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

const Projects = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{heading}</h2>}
    {subHeading && <p className="mt-2 text-lg leading-8 text-gray-300">{subHeading}</p>}
    <div className="mt-8 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
  </div>
)

export const MoreProjects = async ({
  skip,
  limit,
}: {
  skip: string
  limit: number
}) => {
  const { data } = await sanityFetch({
    query: moreProjectQuery,
    params: { skip, limit },
  })

  if (!data || data.length === 0) {
    return null
  }
}

export const AllProject = async () => {
  const { data } = await sanityFetch({ query: allProjectsQuery })

  if (!data || data.length === 0) {
    return <OnBoarding />
  }

  return (
    <Projects
      heading="Projects!"
      subHeading={`${data.length === 1 ? "This project is" : `These ${data.length} projects are`} what I personally think!`}
    >
      {data.map((project: any) => (
        <Project key={project._id} project={project} />
      ))}
    </Projects>
  )
}