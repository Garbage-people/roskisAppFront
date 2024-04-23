const InfoButton = ({ toggleInfoDialog }) => (
  <button
    id="infoButton"
    onClick={toggleInfoDialog}
  >
    <img
      src="images/inffoIkoni.png"
      alt="Trashbin"
      width="60px"
      height="60px"
    ></img>
  </button>
)

export default InfoButton