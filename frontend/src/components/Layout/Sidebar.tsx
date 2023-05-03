import { useAppContext } from "@/contexts/app";
import useMetaMask from "@/hooks/useMetaMask";
import { muiDarkTheme } from "@/theme/muiTheme";
import { UserType } from "@/types";
import AddIcon from "@mui/icons-material/Add";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import { blueGrey, grey, orange } from "@mui/material/colors";
import { NextLinkComposed } from "../NextLinkComposed";

interface SidebarProps {
  /** Width of the sidebar in px. */
  width: number;
}

/**
 * Sidebar shown at the left.
 */
function Sidebar({ width }: SidebarProps) {
  const { address, userTypes } = useAppContext();
  const { login, logout } = useMetaMask();

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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ height: 40, width: 40, bgcolor: orange[700], fontSize: 18 }}>
                  M
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography>{address.substring(0, 12)}</Typography>
                  <Box sx={{ display: "flex", gap: "4px" }}>
                    {userTypes.map((type) => (
                      <Typography
                        key={type}
                        sx={{
                          fontSize: 12,
                          px: 1,
                          py: 0.5,
                          backgroundColor: grey[700],
                          lineHeight: 1,
                          borderRadius: 99,
                        }}
                      >
                        {type.substring(0, 1).toUpperCase() + type.substring(1)}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Tooltip title="Logout">
                <IconButton onClick={logout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Button
              onClick={() => login()}
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
                  return link.visibleTo &&
                    !link.visibleTo.some((u) => userTypes.includes(u)) ? null : (
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
    title: "Register",
    links: [
      {
        icon: <DomainAddIcon />,
        label: "Register as Issuer",
        href: "/issuer/register",
      },
      {
        icon: <PersonAddIcon />,
        label: "Register as Applicant",
        href: "/applicant/register",
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
