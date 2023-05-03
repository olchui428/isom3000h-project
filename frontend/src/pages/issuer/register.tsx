import Layout from "@/components/Layout";
import useMetaMask from "@/hooks/useMetaMask";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

function IssuerRegister() {
  const metaMask = useMetaMask();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const registerIssuer = async () => {
    try {
      const issuer = await metaMask.issuerEndpoint.registerIssuer(name, description, logoUrl);
      console.log("issuer", issuer);

      // TODO: redirect to issuer page of that new issuer after successfully create
    } catch (error: any) {
      console.error(error);
      setHasError(true);
      setErrorMsg(error.message);
    }
  };

  return (
    <Layout title="Register Issuer">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
          required
          label="Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField label="Logo URL" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
        <Button
          onClick={registerIssuer}
          variant="contained"
          sx={{ mt: 1, alignSelf: "flex-start" }}
        >
          Register Issuer
        </Button>
      </Box>
    </Layout>
  );
}

export default IssuerRegister;
