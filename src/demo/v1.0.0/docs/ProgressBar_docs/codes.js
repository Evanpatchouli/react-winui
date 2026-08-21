const ProgressBarImportCode =
`import { ProgressBar } from "@evanpatchouli/react-winui";`;

const ProgressBarUsageCode =
`<ProgressBar
  setProgress={56}
  tooltip="ProgressBar tooltip title"
/>`;

const ProgressBarCustomColorUsageCode =
`<ProgressBar
  setProgress={76}
  color={'#2C8B2C'}
/>`;

const ProgressBarCustomHeightUsageCode =
`<ProgressBar
  height={15}
  setProgress={46}
/>`;

const ProgressBarIndeterminateUsageCode =
`<ProgressBar
  setProgress={"indeterminate"}
/>`;


export {
  ProgressBarImportCode,
  ProgressBarUsageCode,
  ProgressBarCustomColorUsageCode,
  ProgressBarCustomHeightUsageCode,
  ProgressBarIndeterminateUsageCode
}
