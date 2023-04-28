import useMetaMask from "@/hooks/useMetaMask";
import { useRouter } from "next/router";

function AccreditationById() {
  const accreditationId = parseInt(useRouter().query.accreditationId as string);
  const accreditationData = useMetaMask().AccreditationEndpoint().getAccreditationById(accreditationId);
  // TODO: display all information of this accreditation
  // TODO: add toggle to display all certificates of this accreditation, need call endpoint
  // TODO: add link to corresponding issuer (optional: need new page)
  return <></>;
}

export default AccreditationById;
