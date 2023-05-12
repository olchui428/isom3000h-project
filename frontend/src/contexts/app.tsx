import { UserType } from "@/types";
import { AlertColor } from "@mui/material";
import { setCookie } from "cookies-next";
import React, { useContext, useState } from "react";

type Notification = {
  severity: AlertColor;
  title?: string;
  message: string;
};

/**
 * AppContext is used to store global app state.
 */
interface AppContextType {
  /** MetaMask address. */
  address: string | undefined;
  setAddress: (address: string) => void;

  /**
   * Types of the user. If it is empty, it means the user is an outsider.
   *
   * An account may have multiple types because a company may issue accreditations
   * and also receive certificates from other issuers.
   */
  userTypes: UserType[];
  setUserTypes: (userType: UserType[]) => void;

  /** Data about a notification. */
  notification: Notification | undefined;
  /** Whether the page currently has a notification. */
  hasNotification: boolean;
  /** Shows a notification at the top right corner. */
  showNotification: (notification: Notification) => void;
  /** Closes the current notification. */
  closeNotification: () => void;
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(AppContext);

interface AppContextProviderProps {
  /** Initial values to hydrate the context. */
  initValues: {
    /** MetaMask address. */
    address?: string;
    userTypes: UserType[];
  };
  children: React.ReactNode;
}

export function AppContextProvider({ initValues, children }: AppContextProviderProps) {
  const [address, setAddressState] = useState<string | undefined>(initValues.address);
  const [userTypes, setUserTypesState] = useState<UserType[]>(initValues.userTypes);

  const [hasNotification, setHasNotification] = useState(false);
  const [notification, setNotification] = useState<Notification | undefined>(undefined);

  const setAddress = (address: string) => {
    setCookie("address", address, { maxAge: 60 * 60 * 24 * 7 });
    setAddressState(address);
  };

  const setUserTypes = (userTypes: UserType[]) => {
    setCookie("userTypes", JSON.stringify(userTypes), { maxAge: 60 * 60 * 24 * 7 });
    setUserTypesState(userTypes);
  };

  const showNotification = (notification: Notification) => {
    setHasNotification(true);
    setNotification(notification);
  };

  const closeNotification = () => {
    setHasNotification(false);
    setTimeout(() => setNotification(undefined), 0);
  };

  return (
    <AppContext.Provider
      value={{
        address,
        setAddress,
        userTypes,
        setUserTypes,
        notification,
        hasNotification,
        showNotification,
        closeNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
