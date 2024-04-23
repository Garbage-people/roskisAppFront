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

export default AddButton