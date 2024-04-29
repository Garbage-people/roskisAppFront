import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TrashcanService from "../services/TrashcanService";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddButton = ({ handleOpenDialog, isLocationEnabled }) => (
  <button
    id="addButton"
    onClick={handleOpenDialog}
    disabled={!isLocationEnabled}
  >
    <img
      src="images/RoskisLisäysUusi.png"
      alt="Trashbin"
      width="85px"
      height="85px"
    ></img>
  </button>
);

const NewTrashcanDialog = ({
  userPosition,
  setTrashcans,
  displayNotification,
  isLocationEnabled,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [recaptchaError, setRecaptchaError] = useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setRecaptchaToken(null);
    setRecaptchaError(null);
    setDialogOpen(false);
  };

  const handleConfirmDialog = async () => {
    if (!recaptchaToken) {
      setRecaptchaError("Please complete the reCAPTCHA challenge.");
      return;
    }

    if (isLocationEnabled) {
      const newTrashcan = {
        lat: userPosition.lat,
        lon: userPosition.lon,
      };
      const res = await TrashcanService.addTrashcan(
        newTrashcan,
        recaptchaToken
      );
      if (res.status === 200) {
        const updatedTrashcans = await TrashcanService.getAll();
        setTrashcans(updatedTrashcans);
        displayNotification("Roskiksen lisäys onnistui!", "success", 5000);
        setDialogOpen(false);
      } else if (res.response.status === 400) {
        displayNotification(
          "Roskiksen lisääminen ei onnistunut.",
          "error",
          5000
        );
        setDialogOpen(false);
      } else if (res.response.status === 418) {
        displayNotification(
          "Roskiksen lisäys epäonnistui, liian lähellä toista roskista.",
          "error",
          5000
        );
        setDialogOpen(false);
      }
    }
    setRecaptchaToken(null);
    setRecaptchaError(null);
  };

  return (
    <>
      <AddButton handleOpenDialog={handleOpenDialog} isLocationEnabled />
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Lisää roskis"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Haluatko varmasti lisätä uuden roskiksen?
            <br />
            Huom. jos olet liian lähellä toista roskista, <br />
            et voi lisätä kartalle uutta roskista.
          </DialogContentText>
          {recaptchaError && <p style={{ color: "red" }}>{recaptchaError}</p>}
          <ReCAPTCHA
            // sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // TEST KEY
            sitekey="6Lf_uMopAAAAAAhhq8T6O9IPpO9gNZgxjXbJBXpN" // real site key
            onChange={(token) => setRecaptchaToken(token)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hylkää</Button>
          <Button
            onClick={handleConfirmDialog}
            autoFocus
            disabled={!isLocationEnabled || !recaptchaToken}
          >
            Lisää
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewTrashcanDialog;
