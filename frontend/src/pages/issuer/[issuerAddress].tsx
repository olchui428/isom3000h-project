import Layout from "@/components/Layout";
import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { AccreditationStructOutput } from "@/types/typechain-types/contracts/endpoints/AccreditationEndpoint";
import { IssuerStructOutput } from "@/types/typechain-types/contracts/endpoints/IssuerEndpoint";
import BusinessIcon from "@mui/icons-material/Business";
import { Alert, Box, Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function IssuerDetails() {
  const { showNotification } = useAppContext();
  const router = useRouter();
  const metaMask = useMetaMask();

  const issuerAddress = router.query.issuerAddress as string;

  // Data
  const [issuer, setIssuer] = useState<IssuerStructOutput | undefined>(undefined);
  const [loadingIssuer, setLoadingIssuer] = useState(true);

  const [accreditations, setAccreditations] = useState<AccreditationStructOutput[] | undefined>(
    undefined
  );
  const [loadingAccreds, setLoadingAccreds] = useState(true);

  // Load the issuer data
  useEffect(() => {
    async function getIssuer() {
      if (!loadingIssuer) return;
      try {
        const issuerData = await metaMask.issuerEndpoint.getIssuerByAddress(issuerAddress);
        setIssuer(issuerData);
      } catch (error: any) {
        console.error("Error while loading", error);
        showNotification({
          severity: "error",
          title: "Error when fetching issuer",
          message: error.message,
        });
      } finally {
        setLoadingIssuer(false);
      }
    }

    async function getAccreditations() {
      if (!loadingAccreds) return;
      try {
        const accredsData = await metaMask.accreditationEndpoint.getAccreditationsByIssuerAddress(
          issuerAddress
        );
        console.log("accredsData", accredsData);
        setAccreditations(accredsData);
      } catch (error: any) {
        console.error("Error while loading", error);
        showNotification({
          severity: "error",
          title: "Error when fetching accreditations",
          message: error.message,
        });
      } finally {
        setLoadingAccreds(false);
      }
    }

    getIssuer();
    getAccreditations();
  }, [
    issuerAddress,
    loadingAccreds,
    loadingIssuer,
    metaMask.accreditationEndpoint,
    metaMask.issuerEndpoint,
    showNotification,
  ]);

  return (
    <Layout title="Issuer Details">
      <Box sx={{ height: "calc(100% - 64px)", display: "flex", flexDirection: "column", gap: 3 }}>
        <Card>
          <CardContent>
            {loadingIssuer ? (
              <Box>
                <Skeleton variant="rounded" height={32} sx={{ mb: 2 }} />
                <Skeleton variant="rounded" height={150} />
              </Box>
            ) : (
              <IssuerDetailsCardContent issuer={issuer} />
            )}
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent sx={{ height: "100%" }}>
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
                Accreditations
              </Typography>
              {loadingAccreds ? (
                <Skeleton variant="rounded" height={200} />
              ) : (
                <AccreditationsCardContent accreditations={accreditations} />
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}

function IssuerDetailsCardContent({ issuer }: { issuer: IssuerStructOutput | undefined }) {
  return issuer ? (
    <>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <BusinessIcon />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
            {issuer.name}
          </Typography>
        </Box>
        <Typography sx={{ color: grey[500] }}>
          Created at {dayjs.unix(issuer.createdAt.toNumber()).format("YYYY-MM-DD h:mm:ss A")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        {issuer.logoUrl && (
          <Box sx={{ height: 150, width: 150, mr: 4 }}>
            <img // eslint-disable-line
              src={issuer.logoUrl}
              alt="Logo"
              style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 5 }}
            />
          </Box>
        )}
        <Grid container spacing={2} sx={{ flex: 1 }}>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: 500 }}>Description</Typography>
          </Grid>
          <Grid item xs={10} sx={{ whiteSpace: "pre-wrap" }}>
            {issuer.description}
          </Grid>
          <Grid item xs={2}>
            <Typography sx={{ fontWeight: 500 }}>Address</Typography>
          </Grid>
          <Grid item xs={10}>
            {issuer.issuerAddress}
          </Grid>
        </Grid>
      </Box>
    </>
  ) : (
    <Box sx={{ width: "50%" }}>
      <Alert severity="error" variant="filled">
        Failed to fetch the issuer
      </Alert>
    </Box>
  );
}

function AccreditationsCardContent({
  accreditations,
}: {
  accreditations: AccreditationStructOutput[] | undefined;
}) {
  const router = useRouter();

  if (!accreditations)
    return (
      <Box sx={{ width: "50%" }}>
        <Alert severity="error" variant="filled">
          Failed to fetch the issuer
        </Alert>
      </Box>
    );

  const rows: GridRowsProp = accreditations.map((acc) => ({
    id: acc.id.toNumber(),
    title: acc.title,
    nature: acc.nature,
    createdAt: dayjs.unix(acc.createdAt.toNumber()).format("YYYY-MM-DD h:mm:ss A"),
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "nature", headerName: "Nature", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  return accreditations.length ? (
    <Box sx={{ flex: 1, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={({ id }) => router.push(`/accreditation/${id}`)}
        sx={{
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
          },
        }}
      />
    </Box>
  ) : (
    <Typography sx={{ fontSize: 18, color: grey[600], textAlign: "center" }}>
      No accreditations have been found for this issuer.
    </Typography>
  );
}

export default IssuerDetails;
