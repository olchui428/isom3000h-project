import Layout from "@/components/Layout/Layout";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { Alert, Box, Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApplicantStructOutput } from "@/types/typechain-types/contracts/endpoints/ApplicantEndpoint";
import PersonIcon from "@mui/icons-material/Person";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { CertificateStructOutput } from "@/types/typechain-types/contracts/endpoints/CertificateEndpoint";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

function ApplicantDetails() {
  const { showNotification } = useAppContext();
  const router = useRouter();
  const metaMask = useMetaMask();

  const applicantAddress = router.query.applicantAddress as string;

  // Data
  const [applicant, setApplicant] = useState<ApplicantStructOutput | undefined>(undefined);
  const [loadingApplicant, setLoadingApplicant] = useState(true);

  const [certificates, setCertificates] = useState<CertificateStructOutput[] | undefined>(
    undefined
  );
  const [loadingCertificates, setLoadingCertificates] = useState(true);

  // Load the applicant data
  useEffect(() => {
    async function getApplicant() {
      if (!loadingApplicant) return;
      try {
        const applicantData = await metaMask.applicantEndpoint.getApplicantByAddress(
          applicantAddress
        );
        setApplicant(applicantData);
      } catch (error: any) {
        console.error("Error while loading", error);
        showNotification({
          severity: "error",
          title: "Error when fetching applicant",
          message: error.message,
        });
      } finally {
        setLoadingApplicant(false);
      }
    }

    async function getCertificates() {
      if (!loadingCertificates) return;
      try {
        const certificatesData =
          await metaMask.certificateEndpoint.getCertificatesByApplicantAddress(applicantAddress);
        console.log("certificatesData", certificatesData);
        setCertificates(certificatesData);
      } catch (error: any) {
        console.error("Error while loading", error);
        showNotification({
          severity: "error",
          title: "Error when fetching accreditations",
          message: error.message,
        });
      } finally {
        setLoadingCertificates(false);
      }
    }

    getApplicant();
    getCertificates();
  }, [
    applicantAddress,
    loadingApplicant,
    loadingCertificates,
    metaMask.accreditationEndpoint,
    metaMask.applicantEndpoint,
    metaMask.certificateEndpoint,
    showNotification,
  ]);

  return (
    <Layout title="Applicant Details">
      <Box sx={{ height: "calc(100% - 64px)", display: "flex", flexDirection: "column", gap: 3 }}>
        <Card>
          <CardContent>
            {loadingApplicant ? (
              <Box>
                <Skeleton variant="rounded" height={32} sx={{ mb: 4 }} />
                <Skeleton variant="rounded" height={30} />
              </Box>
            ) : (
              <ApplicantDetailsCardContent applicant={applicant} />
            )}
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ height: "100%" }}>
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
                Certificates
              </Typography>
              {loadingCertificates ? (
                <Skeleton variant="rounded" height={400} />
              ) : (
                <CertificatesCardContent certificates={certificates} />
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}

function ApplicantDetailsCardContent({
  applicant,
}: {
  applicant: ApplicantStructOutput | undefined;
}) {
  return applicant ? (
    <>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PersonIcon />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
            {applicant.name}
          </Typography>
        </Box>
        <Typography sx={{ color: grey[500] }}>
          Created at {dayjs.unix(applicant.createdAt.toNumber()).format("YYYY-MM-DD h:mm:ss A")}
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: 500 }}>Address</Typography>
        </Grid>
        <Grid item xs={10}>
          {applicant.applicantAddress}
        </Grid>
      </Grid>
    </>
  ) : (
    <Box sx={{ width: "50%" }}>
      <Alert severity="error" variant="filled">
        Failed to fetch the applicant
      </Alert>
    </Box>
  );
}

function CertificatesCardContent({
  certificates,
}: {
  certificates: CertificateStructOutput[] | undefined;
}) {
  const router = useRouter();

  if (!certificates) {
    return (
      <Box sx={{ width: "50%" }}>
        <Alert severity="error" variant="filled">
          Failed to fetch certificates
        </Alert>
      </Box>
    );
  }

  const rows: GridRowsProp = certificates.map((cert) => ({
    id: cert.id.toNumber(),
    createdAt: dayjs.unix(cert.createdAt.toNumber()).format("YYYY-MM-DD h:mm:ss A"),
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  return certificates.length ? (
    <Box sx={{ flex: 1, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={({ id }) => router.push(`/certificate/${id}`)}
        sx={{
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
          },
        }}
      />
    </Box>
  ) : (
    <Typography sx={{ fontSize: 18, color: grey[600], textAlign: "center" }}>
      No certificates have been found for this applicant.
    </Typography>
  );
}

export default ApplicantDetails;
