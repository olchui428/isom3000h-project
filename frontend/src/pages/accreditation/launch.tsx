import useMetaMask from "@/hooks/useMetaMask";
import { useRouter } from "next/router";

function AccreditationLaunch() {
  const router = useRouter();
  const launchAccreditation = async () => {
    const newAccredId = useMetaMask()
      .accreditationEndpoint.launchAccreditation
      // TODO: add params
      ();
    if (newAccredId) {
      router.push(`/accreditation/${newAccredId}`);
    }
  };
  // TODO: only authorize Issuer enter this page
  // TODO: add form to allow creation of new accreditation
  // TODO: redirect to accreditation page of that new accreditation after successfully create
  return (
    <>
      <button onClick={launchAccreditation}>Launch Accreditation</button>
    </>
  );
}

export default AccreditationLaunch;
