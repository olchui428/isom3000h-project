import Layout from "@/components/Layout";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { UserType } from "@/types";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Box, TextField } from "@mui/material";
import { useState } from "react";

function IssuerRegister() {
  const { showNotification, userTypes } = useAppContext();
  const metaMask = useMetaMask();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const isAlreadyIssuer = userTypes.includes(UserType.ISSUER);

  const registerIssuer = async () => {
    try {
      setLoading(true);
      const issuer = await metaMask.issuerEndpoint.registerIssuer(name, description, logoUrl);
      if (issuer) {
        showNotification({
          severity: "success",
          message: "Successfully registered as issuer",
        });
      }
    } catch (error: any) {
      console.error(error);
      showNotification({
        severity: "error",
        title: "Failed to Register",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Register Yourself as Issuer">
      {isAlreadyIssuer && (
        <Alert severity="warning" variant="filled" sx={{ mb: 2 }}>
          You have already registered yourself as an issuer.
        </Alert>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          required
          label="Organization name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          label="Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField label="Logo URL" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          onClick={registerIssuer}
          disabled={isAlreadyIssuer}
          variant="contained"
          startIcon={<DomainAddIcon />}
          sx={{ mt: 1, alignSelf: "flex-start" }}
        >
          Register as Issuer
        </LoadingButton>
      </Box>
    </Layout>
  );
}

export default IssuerRegister;
