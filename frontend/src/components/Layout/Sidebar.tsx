import { Avatar, Box, Drawer, Typography } from "@mui/material";
import { blueGrey, orange } from "@mui/material/colors";

interface SidebarProps {
  /** Width of the sidebar in px. */
  width: number;
}

/**
 * Sidebar shown at the left.
 */
function Sidebar({ width }: SidebarProps) {
  return (
    <Drawer
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          bgcolor: blueGrey[900],
          color: (theme) => theme.palette.common.white,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          minHeight: 64,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* TODO: Allow switching between applicant and issuer */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ height: 36, width: 36, bgcolor: orange[700], fontSize: 18 }}>IS</Avatar>
          <span>Issuer</span>
        </Box>
      </Box>
      {/* TODO: Think the links to each sub-page */}
      <Box sx={{ pt: 3, px: 2 }}>
        {sidebarSections.map((section) => (
          <Box key={section.title} sx={{ mb: 3 }}>
            <Typography
              sx={{
                color: blueGrey[300],
                fontSize: 14,
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {section.title}
            </Typography>
            {/* TODO: Insert links */}
          </Box>
        ))}
      </Box>
    </Drawer>
  );
}

type SidebarSection = {
  title: string;
  links: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
};

const sidebarSections: SidebarSection[] = [
  {
    title: "Accreditation",
    links: [],
  },
  {
    title: "Certificate",
    links: [],
  },
  {
    title: "Issuer",
    links: [],
  },
  {
    title: "Applicant",
    links: [],
  },
  {
    title: "Search",
    links: [],
  },
];

export default Sidebar;
