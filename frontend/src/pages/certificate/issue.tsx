import Layout from "@/components/Layout/Layout";
import NotAllowed from "@/components/NotAllowed";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { UserType } from "@/types";
import { Alert, AlertTitle, Box, Button, Snackbar, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

function CertificateIssue() {
  const { userType } = useAppContext();
  const router = useRouter();
  const metaMask = useMetaMask();

  const [accredId, setAccredId] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [level, setLevel] = useState("");
  const [remarks, setRemarks] = useState("");

  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (userType !== UserType.ISSUER) {
    return (
      <Layout title="Launch Accreditation">
        <NotAllowed />
      </Layout>
    );
  }

  const issueCertificate = async () => {
    try {
      // FIXME: Obtain addresses
      const issuerAddress = "";
      const applicantAddress = "";

      // FIXME: Obtain event ID
      const eventId = "";

      await metaMask.certificateEndpoint.issueCertificate(
        issuerAddress,
        applicantAddress,
        parseInt(accredId),
        level,
        eventId,
        remarks
      );

      // TODO: redirect to certificate page of that new certificate after successfully create
    } catch (error: any) {
      console.error(error);
      setHasError(true);
      setErrorMsg(error.message);
    }
  };

  // TODO: redirect to certificate page of that new certificate after successfully create
  return (
    <Layout title="Issue Certificate">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* TODO: Use Select component for selecting list of items instead of ID input. */}
        <TextField
          required
          label="Accreditation ID"
          value={accredId}
          onChange={(e) => setAccredId(e.target.value)}
        />
        <TextField
          required
          label="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
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
          label="Remarks"
          multiline
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <Button
          onClick={issueCertificate}
          variant="contained"
          sx={{ mt: 1, alignSelf: "flex-start" }}
        >
          Issue Certificate
        </Button>
      </Box>
      <Snackbar
        open={hasError}
        onClose={() => setHasError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        sx={{ maxWidth: "40%" }}
      >
        <Alert
          onClose={() => setHasError(false)}
          severity="error"
          variant="filled"
          sx={{ "& .MuiAlert-message": { fontWeight: 400 } }}
        >
          <AlertTitle>Failed to Issue Certificate</AlertTitle>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Layout>
  );
}

export default CertificateIssue;
