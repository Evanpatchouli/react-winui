const NavigationViewImportCode = `import { NavigationView } from "@evanpatchouli/react-winui";
import NavigationViewDirect from "@evanpatchouli/react-winui/navigation-view";`;

const NavigationViewUsageCode = `<NavigationView
  defaultValue="home"
  paneHeader="Contoso"
  settingsItem={{ label: "Settings", value: "settings" }}
  header="Home"
  content={<HomePage />}
>
  <NavigationView.Item icon={<HomeIcon />} label="Home" value="home" />
  <NavigationView.Item icon={<LibraryIcon />} label="Library" value="library">
    <NavigationView.Item label="Downloads" value="downloads" />
  </NavigationView.Item>
</NavigationView>`;

const NavigationViewControlledCode = `const [value, setValue] = useState("home");
const [paneOpen, setPaneOpen] = useState(true);

<NavigationView
  value={value}
  onValueChange={setValue}
  paneOpen={paneOpen}
  onPaneOpenChange={setPaneOpen}
  paneDisplayMode="auto"
/>`;

export { NavigationViewControlledCode, NavigationViewImportCode, NavigationViewUsageCode };
