import { useAppContext } from "@/contexts/app";
import { UserType } from "@/types";
import {
  Box,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

interface SidebarProps {
  /** Width of the sidebar in px. */
  width: number;
}

const darkTheme = createTheme({
  palette: { mode: "dark" },
});

/**
 * Sidebar shown at the left.
 */
function Sidebar({ width }: SidebarProps) {
  const { userType, setUserType } = useAppContext();

  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer
        sx={{
          width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width,
            bgcolor: blueGrey[900],
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
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
              labelId="user-type-label"
              label="User Type"
              value={userType}
              onChange={(event) => setUserType(event.target.value as UserType)}
              sx={{
                color: "white",
                "& .MuiSelect-select": { padding: "12px 14px" },
              }}
            >
              <MenuItem value={UserType.ISSUER}>Issuer</MenuItem>
              <MenuItem value={UserType.APPLICANT}>Applicant</MenuItem>
            </Select>
          </FormControl>
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
    </ThemeProvider>
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
