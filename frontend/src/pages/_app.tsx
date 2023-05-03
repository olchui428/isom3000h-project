import { AppContextProvider } from "@/contexts/app";
import { muiLightTheme } from "@/theme/muiTheme";
import { UserType } from "@/types";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { getCookie, setCookie } from "cookies-next";
import App, { AppContext, AppProps } from "next/app";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type AccreditationAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  /** MetaMask address if the user has previously connected to it. */
  address?: string;
  /** User type, which is determined from a cookie. Defaults to "Issuer". */
  userType: UserType;
};

function AccreditationApp({ Component, pageProps, address, userType }: AccreditationAppProps) {
  return (
    <ThemeProvider theme={muiLightTheme}>
      <AppContextProvider initValues={{ address, userType }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Component {...pageProps} />
        </LocalizationProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
}

AccreditationApp.getInitialProps = async (
  context: AppContext
): Promise<Omit<AccreditationAppProps, "Component">> => {
  const req = context.ctx.req;
  const res = context.ctx.res;
  const appProps = await App.getInitialProps(context);

  // Get initial MetaMask address if the user has previously connected.
  const address = getCookie("address", { req, res }) as string | undefined;

  // Get the initial user type from the cookie.
  let userType = getCookie("userType", { req, res }) as UserType | undefined;
  if (!userType) {
    userType = UserType.OUTSIDER;
    setCookie("userType", userType, { req, res, maxAge: 60 * 60 * 24 * 7 });
  }

  return {
    ...appProps,
    address,
    userType,
  };
};

export default AccreditationApp;
