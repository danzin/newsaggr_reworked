// import { createTheme } from "@mui/material";
import { createContext, useContext, useState } from 'react';

export const ModeContext = createContext();

export const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });
  return (
    // add dark theme down darkTheme
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useModeContext = () => {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error('context is undefined');
  }

  return context;
};
