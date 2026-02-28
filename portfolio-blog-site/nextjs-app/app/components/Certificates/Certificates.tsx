import { sanityFetch } from "../../../sanity/lib/live";
import { allCertificateQuery } from "@/sanity/lib/queries";
import { CertificateViewer } from "./CertificateViewer";

export const Certificates = async () => {
  const { data } = await sanityFetch({
    query: allCertificateQuery,
  });

  if (!data || data.length === 0) {
    return <div>No certificates available.</div>;
  }

  return (
    <div className="w-full h-full">
      <CertificateViewer data={data} />
    </div>
  );
};

export default Certificates;