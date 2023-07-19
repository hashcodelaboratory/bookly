import {Navbar, Switch, Text, useTheme} from "@nextui-org/react";
import {useTheme as useNextTheme} from "next-themes";

export const NavigationBar = () => {
  const {isDark, type} = useTheme();
  const {setTheme} = useNextTheme();

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
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
      </Navbar.Item>
    </Navbar.Content>
  </Navbar>
}