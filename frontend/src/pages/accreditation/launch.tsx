import Layout from "@/components/Layout";
import useMetaMask from "@/hooks/useMetaMask";
import { useRouter } from "next/router";

function AccreditationLaunch() {
  const router = useRouter();
  const metaMask = useMetaMask();

  const launchAccreditation = async () => {
    const newAccredId =
      metaMask.accreditationEndpoint.launchAccreditation(/* TODO(Owen): Add params */);
    if (newAccredId) {
      router.push(`/accreditation/${newAccredId}`);
    }
  };
  // TODO: only authorize Issuer enter this page
  // TODO: add form to allow creation of new accreditation
  // TODO: redirect to accreditation page of that new accreditation after successfully create
  return (
    <Layout title="Launch Accreditation">
      <button onClick={launchAccreditation}>Launch Accreditation</button>
    </Layout>
  );
}

export default AccreditationLaunch;
