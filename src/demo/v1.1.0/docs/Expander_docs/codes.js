const ExpanderImportCode = `import { Expander } from "@evanpatchouli/react-winui";
import ExpanderDirect from "@evanpatchouli/react-winui/expander";`;

const ExpanderUsageCode = `<Expander
  defaultExpanded
  header="Advanced settings"
  icon={<i className="icons10-settings" />}
>
  Secondary content can contain controls and other layout.
</Expander>`;

const ExpanderControlledCode = `const [expanded, setExpanded] = useState(false);

<Expander
  expanded={expanded}
  header="Controlled disclosure"
  onExpandedChange={setExpanded}
>
  The parent owns the expanded state.
</Expander>`;

export { ExpanderControlledCode, ExpanderImportCode, ExpanderUsageCode };
