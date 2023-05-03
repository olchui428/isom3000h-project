import Layout from "@/components/Layout";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

function ApplicantRegister() {
  const { showNotification } = useAppContext();
  const metaMask = useMetaMask();

  const [name, setName] = useState("");

  const registerApplicant = async () => {
    try {
      const applicant = await metaMask.applicantEndpoint.registerApplicant(name);
      console.log("applicant", applicant);
    } catch (error: any) {
      console.error(error);
      showNotification({
        severity: "error",
        title: "Failed to Register",
        message: error.message,
      });
    }
  };

  return (
    <Layout title="Register Applicant">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button
          onClick={registerApplicant}
          variant="contained"
          sx={{ mt: 1, alignSelf: "flex-start" }}
        >
          Register Applicant
        </Button>
      </Box>
    </Layout>
  );
}

export default ApplicantRegister;
