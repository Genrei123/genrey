// page.tsx
import { AllPosts } from "@/app/components/Posts";
import { AllProject } from "./components/Project";
import { AllGallery } from "./components/Gallery";
import ClientPortfolio from "./ClientPortfolio";
import Footer from "./components/Footer";

export default async function Page() {
  // Pre-fetch the data for server components
  const posts = await AllPosts();
  const projects = await AllProject();
  const gallery = await AllGallery();

  

  return (
    <>
      <ClientPortfolio
        postsComponent={posts}
        projectsComponent={projects}
        galleryComponent={gallery}
      />
      <Footer />
    </>
  );
}