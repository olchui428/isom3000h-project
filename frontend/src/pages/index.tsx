import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { Box, Typography } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";

export default function Home() {
  return (
    <Layout title="Home">
      <Typography
        component="h1"
        variant="h2"
        sx={{ mt: 14, textAlign: "center", fontWeight: 500, color: indigo[600], fontSize: 72 }}
      >
        AccrediChain
      </Typography>
      <Typography sx={{ mt: 0.5, textAlign: "center", color: grey[600], fontSize: 18 }}>
        The Web3.0 Accreditation System
      </Typography>
      <Box sx={{ mx: 12, mt: 10 }}>
        <SearchBar />
      </Box>
    </Layout>
  );
}
