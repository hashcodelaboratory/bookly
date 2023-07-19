import {Navbar, Switch, SwitchEvent, Text, useTheme} from "@nextui-org/react";
import {useTheme as useNextTheme} from "next-themes";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import {BooklyPageModel} from "../../cypress/e2e/bookly-page-model";

export const NavigationBar = () => {
  const {isDark, type} = useTheme();
  const {setTheme} = useNextTheme();

  const onThemeChange = ({target: {checked}}: SwitchEvent) => setTheme(checked ? 'dark' : 'light')

  return <Navbar variant="sticky">
    <Navbar.Brand>
      <Text
        b
        size={32}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
      >
        Bookly
      </Text>
    </Navbar.Brand>
    <Navbar.Content>
      <Navbar.Item>
        <Switch
          id={BooklyPageModel.ThemeSwitch}
          checked={isDark}
          onChange={onThemeChange}
          iconOn={<BiSolidMoon />}
          iconOff={<BiSolidSun />}
        />
      </Navbar.Item>
    </Navbar.Content>
  </Navbar>
}