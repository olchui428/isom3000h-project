import { Alert, AlertTitle, Snackbar } from "@mui/material";

interface ErrorNotificationProps {
  /** Whether to show the notification.  */
  isShown: boolean;
  /** Title of notification. */
  title: string;
  /** Message of notification. */
  message: string;
  onClose?: () => void;
}

/**
 * An error notification to show at the top right corner.
 */
function ErrorNotification({ isShown, title, message, onClose }: ErrorNotificationProps) {
  return (
    <Snackbar
      open={isShown}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
      sx={{ maxWidth: "40%" }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{ "& .MuiAlert-message": { fontWeight: 400 } }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ErrorNotification;
