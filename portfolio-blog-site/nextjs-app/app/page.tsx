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

export default async function Page() {
  return (
    <>
      <ClientPortfolio
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