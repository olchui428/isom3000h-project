import { Alert, AlertTitle, AppBar, Box, Snackbar, Toolbar, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Head from "next/head";
import { useAppContext } from "@/contexts/app";

interface LayoutProps {
  /** Title to show in the app bar. */
  title: string;
  children: React.ReactNode;
}

/** Width of the sidebar in pixels. */
const sidebarWidth = 250;

/**
 * Wrapper component for providing the layout.
 */
function Layout({ title, children }: LayoutProps) {
  const { notification, hasNotification, closeNotification } = useAppContext();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${sidebarWidth}px)`, ml: `${sidebarWidth}px` }}
        >
          <Toolbar>
            <Typography component="h1" variant="h6">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar width={sidebarWidth} />
        <Box
          component="main"
          sx={{
            bgcolor: (theme) => theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            p: 3,
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
      <Snackbar
        open={hasNotification}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        sx={{ maxWidth: "60%" }}
      >
        {notification && (
          <Alert
            onClose={closeNotification}
            severity={notification.severity}
            variant="filled"
            sx={{ maxWidth: "100%", "& .MuiAlert-message": { fontWeight: 400 } }}
          >
            {notification.title && <AlertTitle>{notification.title}</AlertTitle>}
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default Layout;
