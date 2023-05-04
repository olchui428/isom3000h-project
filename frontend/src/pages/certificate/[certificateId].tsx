import Layout from "@/components/Layout";
import { NextLinkComposed } from "@/components/NextLinkComposed";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { CompleteCertStructOutput } from "@/types/typechain-types/contracts/endpoints/CertificateEndpoint";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Alert, Box, Card, CardContent, Grid, Skeleton, Tooltip, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function CertificateById() {
  const { showNotification } = useAppContext();
  const metamask = useMetaMask();
  const router = useRouter();

  const certificateId = parseInt(router.query.certificateId as string);

  const [loading, setLoading] = useState(true);
  const [completeCert, setCompleteCert] = useState<CompleteCertStructOutput | undefined>(undefined);

  // Load the certificate data
  useEffect(() => {
    async function loadCertificate() {
      if (!loading) return;
      try {
        const completeCertificateData = await metamask.certificateEndpoint.getCompleteCertById(
          certificateId
        );
        console.log("completeCertificateData", completeCertificateData);
        setCompleteCert(completeCertificateData);
      } catch (error: any) {
        console.error(`Error loading certificate of ID ${certificateId}`, error);
        showNotification({
          severity: "error",
          title: "Error when fetching certificate",
          message: error.message,
        });
      } finally {
        setLoading(false);
      }
    }

    loadCertificate();
  }, [certificateId, loading, metamask.certificateEndpoint, showNotification]);

  if (loading) {
    return (
      <Layout title={`Certificate #${certificateId}`}>
        <Box sx={{ width: "100%" }}>
          <Skeleton variant="rounded" height={300} />
        </Box>
      </Layout>
    );
  }
  if (!completeCert) {
    return (
      <Layout title={`Certificate #${certificateId}`}>
        <Box sx={{ width: "50%" }}>
          <Alert severity="error" variant="filled">
            Failed to fetch Certificate #{certificateId}
          </Alert>
        </Box>
      </Layout>
    );
  }
  if (parseInt(completeCert.certificate.issuer, 16) === 0) {
    return (
      <Layout title={`Certificate #${certificateId}`}>
        <Box sx={{ width: "50%" }}>
          <Alert severity="warning" variant="filled">
            Certificate #{certificateId} does not exist.
          </Alert>
        </Box>
      </Layout>
    );
  }

  const createdAt = dayjs
    .unix(completeCert.certificate.createdAt.toNumber())
    .format("YYYY-MM-DD h:mm:ss A");
  const remarks = completeCert.certificate.remarks;
  const eventId = completeCert.certificate.eventId;

  return (
    <Layout title={`Certificate #${certificateId}`}>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography component="h2" variant="h5" sx={{ fontWeight: 600 }}>
              Certificate #{certificateId}
            </Typography>
            <Typography sx={{ color: grey[500] }}>Created at {createdAt}</Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "stretch", gap: 3 }}>
                <Card elevation={0} sx={{ flex: 1, backgroundColor: grey[100] }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography component="h3" variant="h6">
                          Accreditation
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography sx={{ fontWeight: 500 }}>Title</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <NextLinkComposed
                          to={`/accreditation/${completeCert.accreditation.id.toNumber()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {completeCert.accreditation.title}
                        </NextLinkComposed>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography sx={{ fontWeight: 500 }}>Issuer</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <NextLinkComposed
                          to={`/issuer/${completeCert.issuer.issuerAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {completeCert.issuer.name}
                        </NextLinkComposed>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <ArrowForwardIcon sx={{ my: "auto", height: 50, width: 50, color: grey[700] }} />
                <Card elevation={0} sx={{ flex: 1, backgroundColor: grey[100] }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography component="h3" variant="h6">
                          Recipient
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography sx={{ fontWeight: 500 }}>Name</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        {completeCert.applicant.name}
                      </Grid>
                      <Grid item xs={3}>
                        <Typography sx={{ fontWeight: 500 }}>Address</Typography>
                      </Grid>
                      <Grid item xs={9} sx={{ wordWrap: "break-word" }}>
                        {completeCert.applicant.applicantAddress}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" variant="h6" sx={{ mt: 2 }}>
                Details
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: 500 }}>Level</Typography>
            </Grid>
            <Grid item xs={10} sx={{ whiteSpace: "pre-wrap" }}>
              {completeCert.certificate.level}
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ fontWeight: 500 }}>Remarks</Typography>
            </Grid>
            <Grid item xs={10} sx={{ whiteSpace: "pre-wrap" }}>
              {remarks ? remarks : "-"}
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontWeight: 500 }}>Reference ID</Typography>
              <Tooltip title="The issuer may use this ID to reference repeated offerings of exams, diplomas, or other events.">
                <Box
                  sx={{
                    p: 0.5,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 99,
                    color: blue[500],
                    transition: "background-color 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: blue[50],
                      cursor: "pointer",
                    },
                  }}
                >
                  <InfoOutlinedIcon sx={{ height: 22, width: 22 }} />
                </Box>
              </Tooltip>
            </Grid>
            <Grid item xs={10} sx={{ whiteSpace: "pre-wrap" }}>
              {eventId ? eventId : "-"}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Layout>
  );
}

export default CertificateById;
