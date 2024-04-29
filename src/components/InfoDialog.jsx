import { useRef } from "react";

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

const InfoDialog = () => {
  const infoDialogRef = useRef(null)

  const toggleInfoDialog = () => {
    const infoDialog = infoDialogRef.current;
    infoDialog.open
      ? infoDialog.close()
      : infoDialog.showModal()
  };

  return (
    //Inffo pop-up window that shows the basic information about the app and its functionalities
    <>
      <InfoButton toggleInfoDialog={toggleInfoDialog} />
      <dialog ref={infoDialogRef} className="dialog">
        <button onClick={toggleInfoDialog} className="dialog-close-btn">
          <img
            src="images/RuksiKuva.png"
            alt="Trashbin"
            width="100px"
            height="100px "
          ></img>
        </button>
        <img
          src="images/RoskisVihreä.png"
          alt="Trashbin"
          width="100px"
          height="100px "
        ></img>
        <p>Tämä kuvake tarkoittaa roskiksen olevan käytössä</p>

        <img
          src="images/RoskisPunainen.png"
          alt="Trashbin"
          width="100px"
          height="100px "
        ></img>
        <p>Tämä kuvake tarkoittaa roskiksen olevan täynnä</p>

        <img
          src="images/RoskisRuksi.png"
          alt="Trashbin"
          width="100px"
          height="100px "
        ></img>
        <p>Tämä kuva tarkoittaa rikkinäistä roskista</p>
      </dialog>
    </>
  )
}

export default InfoDialog