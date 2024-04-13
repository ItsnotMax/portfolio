/* eslint-disable react/prop-types */
function ModalWindow(props = null) {
    return (
        <>
            <div id={props.className ? 'modal-child' : null} className="modalBackground">
                <div className={`ring ${props.className}`}>Loading
                    <span className="ring-span"></span>
                </div>
            </div>
        </>
    );
}
export default ModalWindow;