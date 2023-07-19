import {ThemeProvider as NextThemesProvider} from 'next-themes'
import {createTheme, NextUIProvider} from "@nextui-org/react";
import {HigherOrderComponent} from "bookly/types/higher-order-component";

const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
})

export const withThemesProvider: HigherOrderComponent = (WrappedComponent) =>
  // eslint-disable-next-line react/display-name
  (props) =>
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <WrappedComponent {...props} />
      </NextUIProvider>
    </NextThemesProvider>