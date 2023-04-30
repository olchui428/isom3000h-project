import { useAppContext } from "@/contexts/app";
import { UserType } from "@/types";
import {
  Box,
  Drawer,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { NextLinkComposed } from "../NextLinkComposed";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";

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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControl fullWidth sx={{ mt: 2, mx: 2 }}>
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
        <Box sx={{ pt: 3 }}>
          {sidebarSections.map((section, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography
                sx={{
                  mx: 2,
                  color: blueGrey[300],
                  fontSize: 14,
                  fontWeight: 500,
                  textTransform: "uppercase",
                }}
              >
                {section.title}
              </Typography>
              <List>
                {section.links.map((link) => {
                  return link.visibleTo && !link.visibleTo.includes(userType) ? null : (
                    <ListItem key={link.label} disablePadding>
                      <ListItemButton component={NextLinkComposed} to={link.href}>
                        <ListItemIcon>{link.icon}</ListItemIcon>
                        <ListItemText primary={link.label} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          ))}
        </Box>
      </Drawer>
    </ThemeProvider>
  );
}

type SidebarSection = {
  title?: string;
  links: {
    icon: React.ReactNode;
    label: string;
    href: string;
    /** If provided, only the specified user type(s) can see this link. */
    visibleTo?: UserType[];
  }[];
};

const sidebarSections: SidebarSection[] = [
  {
    links: [
      {
        icon: <HomeIcon />,
        label: "Home",
        href: "/",
      },
    ],
  },
  {
    title: "Accreditation",
    links: [
      {
        icon: <AddIcon />,
        label: "Launch Accreditation",
        href: "/accreditation/launch",
        visibleTo: [UserType.ISSUER],
      },
      {
        icon: <SearchIcon />,
        label: "Search Accreditation",
        href: "/accreditation/search",
      },
    ],
  },
  {
    title: "Certificate",
    links: [
      {
        icon: <SendIcon />,
        label: "Issue Certificate",
        href: "/certificate/issue",
        visibleTo: [UserType.ISSUER],
      },
      {
        icon: <SearchIcon />,
        label: "Search Certificate",
        href: "/certificate/search",
      },
    ],
  },
];

export default Sidebar;
