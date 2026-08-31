const TagImportCode = `import { Tag } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";`;

const TagUsageCode = `<Tag appearance="outline" icon={<TagIcon />}>
  Design
</Tag>`;

const TagDismissibleCode = `const [tags, setTags] = useState(["Design", "Windows"]);

{tags.map((label) => (
  <Tag
    key={label}
    dismissible
    onDismiss={() => setTags((current) => current.filter((item) => item !== label))}
  >
    {label}
  </Tag>
))}`;

export { TagDismissibleCode, TagImportCode, TagUsageCode };
