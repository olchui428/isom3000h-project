import Layout from "@/components/Layout/Layout";
import NotAllowed from "@/components/NotAllowed";
import { useAppContext } from "@/contexts/app";
import { UserType } from "@/types";

function CertificateIssue() {
  const { userType } = useAppContext();

  if (userType !== UserType.ISSUER) {
    return (
      <Layout title="Launch Accreditation">
        <NotAllowed />
      </Layout>
    );
  }

  // TODO: add form to allow creation of new certificate
  // TODO: redirect to certificate page of that new certificate after successfully create
  return <Layout title="Issue Certificate">TODO: Issue certificate to a user</Layout>;
}

export default CertificateIssue;
