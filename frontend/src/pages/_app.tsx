import { AppContextProvider } from "@/contexts/app";
import { muiLightTheme } from "@/theme/muiTheme";
import { UserType } from "@/types";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getCookie, setCookie } from "cookies-next";
import App, { AppContext, AppProps } from "next/app";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Hong_Kong");

type AccreditationAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  /** MetaMask address if the user has previously connected to it. */
  address?: string;
  /** User types. */
  userTypes: UserType[];
};

function AccreditationApp({ Component, pageProps, address, userTypes }: AccreditationAppProps) {
  return (
    <ThemeProvider theme={muiLightTheme}>
      <AppContextProvider initValues={{ address, userTypes }}>
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

  // Get the initial user types from the cookie.
  const userTypesCookie = getCookie("userTypes", { req, res }) as string | undefined;
  let userTypes: UserType[] = [];
  if (userTypesCookie) {
    userTypes = JSON.parse(userTypesCookie);
  } else {
    setCookie("userTypes", JSON.stringify(userTypes), { req, res, maxAge: 60 * 60 * 24 * 7 });
  }

  return {
    ...appProps,
    address,
    userTypes,
  };
};

export default AccreditationApp;
