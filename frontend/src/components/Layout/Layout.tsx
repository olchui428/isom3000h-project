import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Head from "next/head";

interface LayoutProps {
  /** Title to show in the app bar. */
  title: string;
  children: React.ReactNode;
}

/** Width of the sidebar in pixels. */
const sidebarWidth = 240;

/**
 * Wrapper component for providing the layout.
 */
function Layout({ title, children }: LayoutProps) {
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
    </>
  );
}

export default Layout;
