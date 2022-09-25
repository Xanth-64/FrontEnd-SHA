import React, { ReactNode, createContext, useContext, useState } from 'react';

type NavbarContextType = {
  displayNavbar: boolean;
  toggleDisplay: () => void;
};

const NavbarContextDefaultValues: NavbarContextType = {
  displayNavbar: false,
  toggleDisplay: () => {},
};

const NavbarContext = createContext<NavbarContextType>(
  NavbarContextDefaultValues
);

export function useNavbarContext() {
  return useContext(NavbarContext);
}

type Props = {
  children: ReactNode;
};

export function NavbarProvider({ children }: Props) {
  const [displayNavbar, setDisplayNavbar] = useState(false);

  const toggleDisplay = () => {
    setDisplayNavbar(!displayNavbar);
  };

  const value: NavbarContextType = {
    displayNavbar,
    toggleDisplay,
  };
  return (
    <>
      <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
    </>
  );
}
