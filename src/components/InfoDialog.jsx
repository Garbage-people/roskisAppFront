const InfoDialog = ({ toggleInfoDialog, infoDialogRef }) => {
    return (
        <dialog ref={infoDialogRef} className="dialog">
            <button onClick={toggleInfoDialog} className="dialog-close-btn">
                X
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
    )
}

export default InfoDialog