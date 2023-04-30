import { AppContextProvider } from "@/contexts/app";
import { muiLightTheme } from "@/theme/muiTheme";
import { UserType } from "@/types";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { getCookie, setCookie } from "cookies-next";
import App, { AppContext, AppProps } from "next/app";

type AccreditationAppProps = Pick<AppProps, "Component" | "pageProps"> & {
  /** User type, which is determined from a cookie. Defaults to "Issuer". */
  userType: UserType;
};

function AccreditationApp({ Component, pageProps, userType }: AccreditationAppProps) {
  return (
    <ThemeProvider theme={muiLightTheme}>
      <AppContextProvider initUserType={userType}>
        <CssBaseline />
        <Component {...pageProps} />
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

  // Get the initial user type from the cookie.
  let userType = getCookie("userType", { req, res }) as UserType | undefined;
  if (!userType) {
    userType = UserType.ISSUER;
    setCookie("userType", userType, { req, res, maxAge: 60 * 60 * 24 * 7 });
  }

  return {
    ...appProps,
    userType,
  };
};

export default AccreditationApp;
