const SearchBarImportCode =
`import { InputSearchBar } from "@evanpatchouli/react-winui";`;

const SearchBoxImportCode =
`import { InputSearchBox } from "@evanpatchouli/react-winui";`;

const SearchSuggestionImportCode =
`import { InputSearchSuggestion } from "@evanpatchouli/react-winui";`;

const SearchBarUsageCode =
`<InputSearchBar
  name="Some Name"
  value="some value"
  onSubmit={() => {}}
  placeholder="Search here"
/>`;

const SearchBoxUsageCode =
`<InputSearchBox
  name="Some Name"
  value="some value"
  onChange={() => {}}
  //tooltip="tooltip title"
  placeholder="Enter to Search"
/>`;

const SearchSuggestionUsageCode =
`<InputSearchSuggestion
  placeholder="Type 'a' .."
  data={[
    {label: 'apple', link: '#', icon: <i className="icons10-baby"></i>},
    {label: 'orange', link: '#', onClick: this.function},
    {label: 'banana', link: '#'},
    {label: 'peach', link: '#'},
  ]}
/>`;


export {
  SearchBarImportCode,
  SearchBoxImportCode,
  SearchSuggestionImportCode,
  SearchBarUsageCode,
  SearchBoxUsageCode,
  SearchSuggestionUsageCode
}
