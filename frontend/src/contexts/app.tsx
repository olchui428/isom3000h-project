import { UserType } from "@/types";
import { setCookie } from "cookies-next";
import React, { useContext, useState } from "react";

/**
 * AppContext is used to store global app state.
 */
interface AppContextType {
  /** MetaMask address. */
  address: string | undefined;
  setAddress: (address: string) => void;
  /** Type of the user. */
  userType: UserType;
  setUserType: (userType: UserType) => void;
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(AppContext);

interface AppContextProviderProps {
  /** Initial values to hydrate the context. */
  initValues: {
    /** MetaMask address. */
    address?: string;
    userType: UserType;
  };
  children: React.ReactNode;
}

export function AppContextProvider({ initValues, children }: AppContextProviderProps) {
  const [address, setAddressState] = useState<string | undefined>(initValues.address);
  const [userType, setUserTypeState] = useState<UserType>(initValues.userType);

  const setAddress = (address: string) => {
    setCookie("address", address, { maxAge: 60 * 60 * 24 * 7 });
    setAddressState(address);
  };

  const setUserType = (userType: UserType) => {
    setCookie("userType", userType, { maxAge: 60 * 60 * 24 * 7 });
    setUserTypeState(userType);
  };

  return (
    <AppContext.Provider
      value={{
        address,
        setAddress,
        userType,
        setUserType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
