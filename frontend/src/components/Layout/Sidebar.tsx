import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { muiDarkTheme } from "@/theme/muiTheme";
import { UserType } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
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
} from "@mui/material";
import { blueGrey, orange } from "@mui/material/colors";
import { NextLinkComposed } from "../NextLinkComposed";

interface SidebarProps {
  /** Width of the sidebar in px. */
  width: number;
}

/**
 * Sidebar shown at the left.
 */
function Sidebar({ width }: SidebarProps) {
  const { address, userType, setUserType } = useAppContext();
  const { connectToMetaMask } = useMetaMask();

  return (
    <ThemeProvider theme={muiDarkTheme}>
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
            pt: 2,
            px: 2,
            minHeight: 64,
          }}
        >
          {address ? (
            <FormControl fullWidth>
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
          ) : (
            <Button
              onClick={() => connectToMetaMask()}
              variant="contained"
              sx={{
                width: "100%",
                backgroundColor: orange[500],
                "&:hover": {
                  backgroundColor: orange[700],
                },
              }}
            >
              Connect to MetaMask
            </Button>
          )}
        </Box>
        <Box sx={{ pt: 3 }}>
          {sidebarSections.map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
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
  {
    title: "Register",
    links: [
      {
        icon: <DomainAddIcon />,
        label: "Register Issuer",
        href: "/issuer/register",
      },
      {
        icon: <PersonAddIcon />,
        label: "Register Applicant",
        href: "/applicant/register",
      },
    ],
  },
];

export default Sidebar;
