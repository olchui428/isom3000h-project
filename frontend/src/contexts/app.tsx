import { UserType } from "@/types";
import { setCookie } from "cookies-next";
import React, { useContext, useState } from "react";

/**
 * AppContext is used to store global app state.
 */
interface AppContextType {
  /** Type of the user. */
  userType: UserType;
  setUserType: (userType: UserType) => void;
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(AppContext);

interface AppContextProviderProps {
  /** Initial user type. */
  initUserType: UserType;
  children: React.ReactNode;
}

export function AppContextProvider({ initUserType, children }: AppContextProviderProps) {
  const [userType, setUserTypeState] = useState<UserType>(initUserType);

  const setUserType = (userType: UserType) => {
    setCookie("userType", userType, { maxAge: 60 * 60 * 24 * 7 });
    setUserTypeState(userType);
  };

  return (
    <AppContext.Provider
      value={{
        userType,
        setUserType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
