import Layout from "@/components/Layout";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

function AccreditationSearch() {
  const router = useRouter();
  const [accredId, setAccredId] = useState("");

  return (
    <Layout title="Search Accreditation">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h5">
          Search Accreditation by ID
        </Typography>
        <TextField
          label="Accreditation ID"
          value={accredId}
          onChange={(e) => setAccredId(e.target.value)}
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
          onClick={() => router.push(`/accreditation/${accredId.trim()}`)}
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
          disabled={accredId.trim() === ""}
        >
          Search
        </Button>
      </Box>
    </Layout>
  );
}

export default AccreditationSearch;
