import Layout from "@/components/Layout/Layout";
import NotAllowed from "@/components/NotAllowed";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { UserType } from "@/types";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

function CertificateIssue() {
  const { userTypes, showNotification } = useAppContext();
  const router = useRouter();
  const metaMask = useMetaMask();

  const [accredId, setAccredId] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [level, setLevel] = useState("");
  const [remarks, setRemarks] = useState("");

  if (!userTypes.includes(UserType.ISSUER)) {
    return (
      <Layout title="Issue Certificate">
        <NotAllowed />
      </Layout>
    );
  }

  const issueCertificate = async () => {
    try {
      // FIXME: Obtain these values
      const applicantAddress = "";
      const eventId = "";

      await metaMask.certificateEndpoint.issueCertificate(
        applicantAddress,
        new Date(),
        parseInt(accredId),
        level,
        eventId,
        remarks
      );

      // TODO: redirect to certificate page of that new certificate after successfully create
    } catch (error: any) {
      console.error(error);
      showNotification({
        severity: "error",
        title: "Failed to Issue Certificate",
        message: error.message,
      });
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
    </Layout>
  );
}

export default CertificateIssue;
