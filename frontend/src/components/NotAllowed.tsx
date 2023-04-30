import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import { Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { NextLinkComposed } from "./NextLinkComposed";

/**
 * Displayed when the user is not allowed to access a page.
 */
function NotAllowed() {
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <LockIcon sx={{ color: grey[700], fontSize: 100 }} />
      <h1>You do not have access to this page</h1>
      <Button component={NextLinkComposed} to="/" variant="contained" startIcon={<HomeIcon />}>
        Back to Home
      </Button>
    </Box>
  );
}

export default NotAllowed;
