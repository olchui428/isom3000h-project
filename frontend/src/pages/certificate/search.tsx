import Layout from "@/components/Layout";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

function CertificateSearch() {
  const router = useRouter();
  const [certId, setCertId] = useState("");

  return (
    <Layout title="Search Certificate">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h5">
          Search Certificate by ID
        </Typography>
        <TextField
          label="Certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{ width: "50%", mt: 3, mb: 2 }}
        />
        <Button
          onClick={() => router.push(`/certificate/${certId.trim()}`)}
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
          disabled={certId.trim() === ""}
        >
          Search
        </Button>
      </Box>
    </Layout>
  );
}

export default CertificateSearch;
