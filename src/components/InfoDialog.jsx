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

        <h1>Lähiroskikset</h1>
        <p>
          Lähiroskikset helpottavat Helsingin kaupungissa liikkuvien ja siisteydestä välittävien päivittäistä toimintaa.

          Sovelluksessa on mahdollista päivittää täyttöastetta kuvaava ikoni, jotta sovelluksesta löytyy ajankohtaista tietoa roskisten tilasta. Voit myös lisätä kartalle uuden ikonin, jos huomaat ulkona roska-astian, joka puuttuu kartalta.
        </p>

        <h2>Kuvakkeet</h2>
        <img
          src="images/RoskisVihreä.png"
          alt="Trashbin"
          width="100px"
          height="100px "
        ></img>
        <p>Tämä kuvake tarkoittaa roskiksen olevan käyttökelpoinen, eli se ei ole liian täynnä tai rikki.</p>

        <img
          src="images/RoskisPunainen.png"
          alt="Trashbin"
          width="100px"
          height="100px "
        ></img>
        <p>Tämä kuvake tarkoittaa roskiksen olevan täynnä.</p>

        <img
          src="images/RoskisRuksi.png"
          alt="Trashbin"
          width="100px"
          height="100px "
        ></img>
        <p>Tämä kuvake tarkoittaa rikkinäistä, tai jollain tavalla estettyä roskista.</p>

        <img
          src="images/RoskisLisäysUusi.png"
          alt="Trashbin"
          width="100px"
          height="100px "
        ></img>
        <p>
          Tällä napilla voit lisätä kartalle uuden roskiskuvakkeen kuvaamaan löytämäsi roskiksen sijaintia.
          Roska-astian lisääminen onnistuu siinä kohdassa, jossa olet. Et voi valita lisäämiselle paikkaa.
          Voit lisätä uuden ikonin vain jos kyseisestä kohdasta ei löydy vielä roska-astian ikonia.
        </p>
      </dialog>
    </>
  )
}

export default InfoDialog