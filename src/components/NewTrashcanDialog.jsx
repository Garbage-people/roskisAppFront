// import React from "react";
import { useState } from "react";
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
)

const NewTrashcanDialog = ({ userPosition, setTrashcans, displayNotification, isLocationEnabled }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Bug: A user can turn off his location after having it enabled in the beginning and add a trashcan
  const addTrashcan = async () => {
    if (isLocationEnabled) {
      const newTrashcan = {
        lat: userPosition.lat,
        lon: userPosition.lon,
      };
      const res = await TrashcanService.addTrashcan(newTrashcan);
      if (res.status === 200) {
        const updatedTrashcans = await TrashcanService.getAll();
        setTrashcans(updatedTrashcans);
        displayNotification("Roskiksen lisäys onnistui!", "success", 5000);
      } else if (res.response.status === 400) {
        displayNotification(
          "Roskiksen lisääminen ei onnistunut.",
          "error",
          5000
        );
      } else if (res.response.status === 418) {
        displayNotification(
          "Roskiksen lisäys epäonnistui, liian lähellä toista roskista.",
          "error",
          5000
        );
      }
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDialog = () => {
    addTrashcan();
    setDialogOpen(false);
  };

  return (
    //Pop-up window making sure you dont accidentaly add a new trashcan
    <>
      <AddButton handleOpenDialog={handleOpenDialog} isLocationEnabled={isLocationEnabled} />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hylkää</Button>
          <Button onClick={handleConfirmDialog} autoFocus>
            Lisää
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewTrashcanDialog