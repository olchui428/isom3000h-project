import Layout from "@/components/Layout";
import NotAllowed from "@/components/NotAllowed";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { UserType } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";

function AccreditationLaunch() {
  const { userTypes, showNotification, closeNotification } = useAppContext();
  const router = useRouter();
  const metaMask = useMetaMask();

  const [name, setName] = useState("");
  const [nature, setNature] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(null);

  const [loading, setLoading] = useState(false);

  if (!userTypes.includes(UserType.ISSUER)) {
    return (
      <Layout title="Launch Accreditation">
        <NotAllowed />
      </Layout>
    );
  }

  const launchAccreditation = async () => {
    try {
      setLoading(true);

      let duration = 0;
      if (expiryDate) {
        duration = expiryDate.diff(new Date(), "second");
      }

      const result = await metaMask.accreditationEndpoint.launchAccreditation(
        name,
        new Date(),
        duration,
        nature,
        description
      );

      if (result) {
        console.log("launchAccreditation result", result);
        showNotification({
          severity: "success",
          title: "Launch successful",
          message: "Redirecting to the accreditation page...",
        });

        // Redirect to the accreditation page after a while
        await new Promise((resolve) => setTimeout(resolve, 2500));
        closeNotification();
        router.push(`/accreditation/${result.id}`);
      }
    } catch (error: any) {
      console.error(error);
      showNotification({
        severity: "error",
        title: "Failed to Launch Accreditation",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Launch Accreditation">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
          required
          label="Nature"
          value={nature}
          onChange={(e) => setNature(e.target.value)}
          placeholder='e.g. "Exam", "Award", "Diploma", etc.'
        />
        <TextField
          required
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />
        <DateTimePicker
          label="Expiry Date"
          value={expiryDate}
          onChange={(date) => setExpiryDate(date)}
        />
        <LoadingButton
          onClick={launchAccreditation}
          loading={loading}
          loadingPosition="start"
          startIcon={<AddIcon />}
          variant="contained"
          sx={{ mt: 1, alignSelf: "flex-start" }}
        >
          Launch Accreditation
        </LoadingButton>
      </Box>
    </Layout>
  );
}

export default AccreditationLaunch;
