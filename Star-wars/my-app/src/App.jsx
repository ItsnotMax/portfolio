/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Aside from './components/aside';
import Description from './components/description';
import Stub from './components/stub';
import ModalWindow from './components/modal';

function App() {
	const [descriptionValue, setDescriptionValue] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
	}, [descriptionValue])

	const handlerButtonClick = (value) => {
		setDescriptionValue(value);
	};

	const handlerModalWindow = (bool) => {
		setShowModal(bool);
	};

	return (
		<div className="flex container">
			<div className="flex-aside">
				<Aside modalWindow={handlerModalWindow} onButtonClick={handlerButtonClick} />
			</div>
			<div className="flex-description">
				{showModal && <ModalWindow />}
				<div id="back-img" className="contaner-description">
					{descriptionValue ? <Description data={descriptionValue} modalWindow={handlerModalWindow} /> : <Stub />}
				</div>
			</div>
		</div>
	)
}
export default App 
