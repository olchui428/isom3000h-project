import Layout from "@/components/Layout";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { UserType } from "@/types";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, Box, TextField } from "@mui/material";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function ApplicantRegister() {
  const { showNotification, userTypes } = useAppContext();
  const metaMask = useMetaMask();

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const isAlreadyApplicant = userTypes.includes(UserType.APPLICANT);

  const registerApplicant = async () => {
    try {
      setLoading(true);
      const applicant = await metaMask.applicantEndpoint.registerApplicant(name);
      console.log("applicant", applicant);
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
    <Layout title="Register Yourself as Applicant">
      {isAlreadyApplicant && (
        <Alert severity="warning" variant="filled" sx={{ mb: 2 }}>
          You have already registered yourself as an applicant.
        </Alert>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          onClick={registerApplicant}
          disabled={isAlreadyApplicant}
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{ mt: 1, alignSelf: "flex-start" }}
        >
          Register as Applicant
        </LoadingButton>
      </Box>
    </Layout>
  );
}

export default ApplicantRegister;
