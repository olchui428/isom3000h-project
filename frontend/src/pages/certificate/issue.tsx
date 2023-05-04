import Layout from "@/components/Layout/Layout";
import NotAllowed from "@/components/NotAllowed";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { UserType } from "@/types";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AccreditationStructOutput } from "@/types/typechain-types/contracts/storage/nft/AccreditationStorage";

function CertificateIssue() {
  const { address, userTypes, showNotification, closeNotification } = useAppContext();
  const router = useRouter();
  const metaMask = useMetaMask();

  // Input fields
  const [accredId, setAccredId] = useState("");
  const [applicantAddress, setApplicantAddress] = useState("");
  const [level, setLevel] = useState("");
  const [eventId, setEventId] = useState("");
  const [remarks, setRemarks] = useState("");

  // Loading states
  const [issueLoading, setIssueLoading] = useState(false);

  // Select options
  const [accreditations, setAccreditations] = useState<AccreditationStructOutput[]>([]);
  const [fetchedAccredSelectOptions, setFetchedAccredSelectOptions] = useState(false);

  useEffect(() => {
    /**
     * Get a list of all accreditations issued by the issuer to be shown in the accreditation select component.
     */
    const getAccreditations = async () => {
      if (!address || fetchedAccredSelectOptions) return;
      try {
        const accreditations =
          await metaMask.accreditationEndpoint.getAccreditationsByIssuerAddress(address);
        setAccreditations(accreditations ?? []);
      } catch (error: any) {
        showNotification({
          severity: "error",
          title: "Failed to fetch your issued accreditations",
          message: error.message,
        });
      } finally {
        setFetchedAccredSelectOptions(true);
      }
    };

    getAccreditations();
  }, [address, fetchedAccredSelectOptions, metaMask.accreditationEndpoint, showNotification]);

  if (!userTypes.includes(UserType.ISSUER)) {
    return (
      <Layout title="Issue Certificate">
        <NotAllowed />
      </Layout>
    );
  }

  const issueCertificate = async () => {
    if (!address) return;
    try {
      setIssueLoading(true);

      const result = await metaMask.certificateEndpoint.issueCertificate(
        applicantAddress,
        new Date(),
        parseInt(accredId),
        level,
        eventId,
        remarks
      );

      if (result) {
        console.log("issueCertificate result", result);
        showNotification({
          severity: "success",
          title: "Successfully issued",
          message: "Redirecting to the certificate page...",
        });

        // Redirect to the certificate page after a while
        await new Promise((resolve) => setTimeout(resolve, 2500));
        closeNotification();
        router.push(`/certificate/${result.id}`);
      }
    } catch (error: any) {
      console.error(error);
      showNotification({
        severity: "error",
        title: "Failed to Issue Certificate",
        message: error.message,
      });
    } finally {
      setIssueLoading(false);
    }
  };

  return (
    <Layout title="Issue Certificate">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl required fullWidth>
          <InputLabel>Accreditation</InputLabel>
          <Select
            label="Accreditation"
            value={accredId}
            onChange={(event) => setAccredId(event.target.value)}
          >
            {!fetchedAccredSelectOptions ? (
              <MenuItem disabled>Loading accreditations...</MenuItem>
            ) : (
              accreditations.map(({ title, id }) => {
                const _id = id.toString();
                return (
                  <MenuItem key={_id} value={_id}>
                    <span style={{ marginRight: 8, color: grey[500] }}>#{_id}</span>
                    {title}
                  </MenuItem>
                );
              })
            )}
          </Select>
        </FormControl>
        <TextField
          required
          label="Recipient Address"
          value={applicantAddress}
          onChange={(e) => setApplicantAddress(e.target.value)}
        />
        <TextField
          required
          label="Level"
          multiline
          placeholder='e.g. "Distinction", "English - 5**", etc.'
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <TextField
          label="Reference ID"
          placeholder="Any ID to reference this certificate to your internal database"
          value={eventId}
          onChange={(e) => setLevel(e.target.value)}
        />
        <TextField
          label="Remarks"
          multiline
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <LoadingButton
          onClick={issueCertificate}
          loading={issueLoading}
          loadingPosition="start"
          variant="contained"
          startIcon={<SendIcon />}
          sx={{ mt: 1, alignSelf: "flex-start" }}
        >
          Issue Certificate
        </LoadingButton>
      </Box>
    </Layout>
  );
}

export default CertificateIssue;
