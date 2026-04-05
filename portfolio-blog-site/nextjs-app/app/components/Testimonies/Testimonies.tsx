import { DocumentCarousel, type TestimoniesContent } from "./DocumentCarousel";

export function Testimonies({ data }: { data?: TestimoniesContent | null }) {
  return <DocumentCarousel data={data} />;
}

export default Testimonies;
