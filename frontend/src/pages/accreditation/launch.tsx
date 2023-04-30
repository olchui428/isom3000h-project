import Layout from "@/components/Layout";
import NotAllowed from "@/components/NotAllowed";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { UserType } from "@/types";
import { useRouter } from "next/router";

function AccreditationLaunch() {
  const { userType } = useAppContext();
  const router = useRouter();
  const metaMask = useMetaMask();

  const launchAccreditation = async () => {
    const newAccredId =
      metaMask.accreditationEndpoint.launchAccreditation(/* TODO(Owen): Add params */);
    if (newAccredId) {
      router.push(`/accreditation/${newAccredId}`);
    }
  };

  if (userType !== UserType.ISSUER) {
    return (
      <Layout title="Launch Accreditation">
        <NotAllowed />
      </Layout>
    );
  }

  // TODO: add form to allow creation of new accreditation
  // TODO: redirect to accreditation page of that new accreditation after successfully create
  return (
    <Layout title="Launch Accreditation">
      <button onClick={launchAccreditation}>Launch Accreditation</button>
    </Layout>
  );
}

export default AccreditationLaunch;
