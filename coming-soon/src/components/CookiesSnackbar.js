import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import CheckIcon from "@material-ui/icons/Check";

function CookieSnackbar() {
  const [open, setOpen] = useState(
    !Boolean(localStorage.getItem("isCookieAccepted"))
  );
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    localStorage.setItem("isCookieAccepted", "true");
  };
  const action = (
    <Button color="primary" size="small" onClick={handleClose}>
      <CheckIcon />
    </Button>
  );

  return (
    <React.Fragment>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert elevation={6} action={action} severity="info">
          <AlertTitle>This Site Uses Cookies</AlertTitle>
          By continuing to browse the site, you agree to our use of{" "}
          <strong>cookies</strong>.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default CookieSnackbar;
