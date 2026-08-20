declare const Appearance: {
  getColorScheme: () => string;
  setDarkScheme: (saveChanges?: boolean) => string;
  setLightScheme: (saveChanges?: boolean) => string;
  setSystemScheme: () => string;
};

export default Appearance;
