// page.tsx
import { Suspense } from "react";
import { AllPosts } from "@/app/components/Posts";
import About from "./about/About";
import Experience from "./experience/Experience";
import { AllProject } from "./components/Project";
import ClientPortfolio from "./ClientPortfolio";
import Footer from "./components/Footer";

export default async function Page() {
  // Pre-fetch the data for server components
  const posts = await AllPosts();
  const projects = await AllProject();

  return (
    <>
      <ClientPortfolio
        postsComponent={posts}
        projectsComponent={projects}
      />
      <Footer />
    </>
  );
}