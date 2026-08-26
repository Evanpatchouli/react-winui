const AutoSuggestBoxImportCode = `import { AutoSuggestBox } from "@evanpatchouli/react-winui";
import AutoSuggestBoxDirect from "@evanpatchouli/react-winui/auto-suggest-box";`;

const AutoSuggestBoxUsageCode = `const [text, setText] = useState("");
const suggestions = cities
  .filter((city) => city.toLowerCase().includes(text.toLowerCase()))
  .map((city) => ({ value: city }));

<AutoSuggestBox
  label="Destination"
  text={text}
  suggestions={suggestions}
  queryButton
  onTextChange={setText}
  onSuggestionChoose={(suggestion) => remember(suggestion.value)}
  onQuerySubmit={(query, suggestion) => search(query, suggestion)}
/>;`;

export { AutoSuggestBoxImportCode, AutoSuggestBoxUsageCode };
