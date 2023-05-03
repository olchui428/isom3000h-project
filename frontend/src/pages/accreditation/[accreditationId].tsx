import Layout from "@/components/Layout";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { AccreditationStructOutput } from "@/types/typechain-types/contracts/storage/nft/AccreditationStorage";
import { Alert, Box, Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function AccreditationById() {
  const { showNotification } = useAppContext();
  const metamask = useMetaMask();
  const router = useRouter();

  const accreditationId = parseInt(router.query.accreditationId as string);

  const [loading, setLoading] = useState(true);
  const [accreditation, setAccreditation] = useState<AccreditationStructOutput | undefined>(
    undefined
  );

  // Load the accreditation data
  useEffect(() => {
    async function loadAccreditation() {
      if (!loading) return;
      try {
        const accreditationData = await metamask.accreditationEndpoint.getAccreditationById(
          accreditationId
        );
        console.log("accreditationData", accreditationData);
        setAccreditation(accreditationData);
      } catch (error: any) {
        console.error(`Error loading accreditation of ID ${accreditationId}`, error);
        showNotification({
          severity: "error",
          title: "Error when fetching accreditation",
          message: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
    loadAccreditation();
  }, [accreditationId, loading, metamask.accreditationEndpoint, showNotification]);

  if (loading) {
    return (
      <Layout title={`Accreditation #${accreditationId}`}>
        <Box sx={{ width: "100%" }}>
          <Skeleton variant="rounded" height={150} />
        </Box>
      </Layout>
    );
  }
  if (!accreditation) {
    return (
      <Layout title={`Accreditation #${accreditationId}`}>
        <Box sx={{ width: "50%" }}>
          <Alert severity="error" variant="filled">
            Failed to fetch Accreditation #{accreditationId}
          </Alert>
        </Box>
      </Layout>
    );
  }

  const createdAt = dayjs.unix(accreditation.createdAt.toNumber()).format("YYYY-MM-DD h:mm:ss A");
  const duration = accreditation.duration.toNumber();
  const expireDate =
    duration === 0
      ? "No expire date"
      : dayjs().add(duration, "second").format("YYYY-MM-DD h:mm:ss A");

  // TODO: add toggle to display all certificates of this accreditation, need call endpoint
  return (
    <Layout title={`Accreditation #${accreditationId}`}>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography component="h2" variant="h5">
              Accreditation #{accreditationId}
            </Typography>
            <Typography sx={{ color: grey[500] }}>Created at {createdAt}</Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* TODO(Anson): Show details of the issuer. May add a link to new page, or show in pop-up. */}
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: 500 }}>Issuer</Typography>
            </Grid>
            <Grid item xs={10}>
              {accreditation.issuer}
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: 500 }}>Title</Typography>
            </Grid>
            <Grid item xs={10}>
              {accreditation.title}
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: 500 }}>Nature</Typography>
            </Grid>
            <Grid item xs={10}>
              {accreditation.nature}
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: 500 }}>Expire Date</Typography>
            </Grid>
            <Grid item xs={10} sx={{ whiteSpace: "pre-wrap" }}>
              {expireDate}
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: 500 }}>Description</Typography>
            </Grid>
            <Grid item xs={10} sx={{ whiteSpace: "pre-wrap" }}>
              {accreditation.description}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Layout>
  );
}

export default AccreditationById;
