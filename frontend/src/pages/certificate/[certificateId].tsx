import Layout from "@/components/Layout";
import useMetaMask from "@/hooks/useMetaMask";
import { useRouter } from "next/router";

function CertificateById() {
  const metamask = useMetaMask();
  const router = useRouter();

  const certificateId = parseInt(router.query.certificateId as string);

  // TODO: display all information of this certificate
  return <Layout title={`Certificate #${certificateId}`}>TODO</Layout>;
}

export default CertificateById;
