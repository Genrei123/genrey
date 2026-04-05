// page.tsx
import { Suspense } from "react";
import { AllProject } from "./components/Projects/AllProject";
import ClientPortfolio from "./ClientPortfolio";
import Footer from "./components/Footer";
import { Certificates } from "./components/Certificates/Certificates";
import { Experience } from "./experience/Experience";
import { AllPosts } from "./components/Blogs/AllPosts";
import { SectionLoader } from "./components/SectionLoader";
import { AllGallery } from "./components/Gallery/AllGallery";
import AllTechStack from "./components/TechStack/AllTechstack";
import { Testimonies } from "./components/Testimonies/Testimonies";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutSettingsQuery, testimoniesQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const { data: settings } = await sanityFetch({ query: aboutSettingsQuery });
  const { data: testimonies } = await sanityFetch({ query: testimoniesQuery });

  return (
    <>
      <ClientPortfolio
        aboutData={settings?.about}
        postsComponent={
          <Suspense fallback={<SectionLoader />}>
            <AllPosts />
          </Suspense>
        }
        projectsComponent={
          <Suspense fallback={<SectionLoader />}>
            <AllProject />
          </Suspense>
        }
        galleryComponent={
          <AllGallery />
        }
        certificatesComponent={
          <Suspense fallback={<SectionLoader />}>
            <Certificates />
          </Suspense>
        }
        testimoniesComponent={
          <Suspense fallback={<SectionLoader />}>
            <Testimonies data={testimonies} />
          </Suspense>
        }
        experienceComponent={
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
        }
        techStackComponent={
          <Suspense fallback={<SectionLoader />}>
            <AllTechStack />
          </Suspense>
        }
      />
      <Footer />
    </>
  );
}