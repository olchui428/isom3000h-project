import Layout from "@/components/Layout";
import { NextLinkComposed } from "@/components/NextLinkComposed";
import { Box, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

function NotFound404() {
  return (
    <Layout title="Not Found">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h1">
          404
        </Typography>
        <Typography variant="h6">Not Found</Typography>
        <Button
          component={NextLinkComposed}
          to="/"
          variant="contained"
          startIcon={<HomeIcon />}
          sx={{ mt: 4 }}
        >
          Back to Home
        </Button>
      </Box>
    </Layout>
  );
}

export default NotFound404;
