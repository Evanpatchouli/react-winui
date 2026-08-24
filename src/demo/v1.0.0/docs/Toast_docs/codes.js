const ToastImportCode = `import { Toast, Toaster } from "@evanpatchouli/react-winui";`;

const ToastUsageCode = `const toasterRef = useRef(null);

<>
  <Button
    value="Notify"
    onClick={() => toasterRef.current?.show({
      title: "Saved",
      message: "Your changes are available everywhere.",
      action: { label: "View", onClick: openDocument }
    })}
  />
  <Toaster ref={toasterRef} maxVisible={3} />
</>`;

const ToastControlledCode = `<Toast
  open={open}
  onOpenChange={setOpen}
  persistent
  intent="warning"
  title="Restart required"
  message="Restart the app to finish installing the update."
/>`;

export { ToastControlledCode, ToastImportCode, ToastUsageCode };
