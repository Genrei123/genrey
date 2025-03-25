import { Suspense } from "react";
import { AllPosts } from "@/app/components/Posts";
import About from "./about/About";
import Experience from "./experience/Experience";
import { AllProject } from "./components/Project";

export default async function Page() {
  return (
    <>
    <div className = "bg-[#0d1b2a]" >
      <About />

      <div className="">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Experience />
          </aside>
        </div>
      </div>
      
      <div className="border-t border-gray-10">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllProject()}</Suspense>
          </aside>
        </div>
      </div>

      <div className="border-t border-gray-10">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
      </div>
    </>
  );
}
