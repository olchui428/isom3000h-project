import Layout from "@/components/Layout";
import useMetaMask from "@/hooks/useMetaMask";
import { useRouter } from "next/router";

function AccreditationById() {
  const metamask = useMetaMask();
  const router = useRouter();

  const accreditationId = parseInt(router.query.accreditationId as string);
  const accreditationData = metamask.accreditationEndpoint.getAccreditationById(accreditationId);

  // TODO: display all information of this accreditation
  // TODO: add toggle to display all certificates of this accreditation, need call endpoint
  // TODO: add link to corresponding issuer (optional: need new page)
  return <Layout title={`Accreditation #${accreditationId}`}>TODO</Layout>;
}

export default AccreditationById;
