/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { fetchGET } from '../js_modules/fetch.js';
import ModalWindow from './modal';
import ShowCharacterBio from './showAddInfo.jsx';

function Description({ data, modalWindow }) {
    const [readyToShow, setReadyToShow] = useState(false);
    const [listToShow, setlistToShow] = useState(null);
    const [clickedButton, setclickedButton] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bioInfo, setBioInfo] = useState(null);
    const [parentListValue, setParentListValue] = useState(null)

    useEffect(() => {
        if (modalWindow) { setShowModal(false); setReadyToShow(false) }
        setBioInfo(null);
    }, [modalWindow])

    useEffect(() => {
        if ($(clickedButton).hasClass('hvr-float-shadow-active')) {
            $(clickedButton).removeClass('hvr-float-shadow-active')
        } else {
            $('.btn-info').removeClass('hvr-float-shadow-active'), $(clickedButton).addClass('hvr-float-shadow-active')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readyToShow, listToShow]);

    useEffect(() => {
        const background = $('#back-img');
        const nameEpisode = data.title.toLowerCase().split(' ').join('_');
        background.css('backgroundImage', `url(../../titles/${nameEpisode}.jpg)`);
        setReadyToShow(false);
        setclickedButton(null);
    }, [data])

    const handlerList = async (event) => {
        try {
            if ($(clickedButton).text() == $(event.target).text()) { setReadyToShow(!readyToShow); return }
            setShowModal(true);
            const urlArray = data[`${$(event.target).text().toLowerCase()}`];
            const list = [];
            Promise.all(urlArray.map(url =>
                fetchGET(url)
            )).then(results => {
                results.map((description => list.push(description.result.properties)));
                setReadyToShow(true);
                setlistToShow(list);
                setParentListValue($(event.target).text());
                setShowModal(false);
            }).catch(error => {
                console.error('An error occurred:', error);
            });
            setclickedButton($(event.target));
        }
        catch (error) {
            console.error('An error occurred while fetching the data', error);
            alert('Failed to fetch data');
        }
    }
    const handlerShowInfo = (event, item) => {
        setBioInfo(item);
    }
    const infoWindowClose = () => {
        setBioInfo(null);
    }


    return (
        <>
            {bioInfo && <ShowCharacterBio Info={bioInfo} onInfoClose={infoWindowClose} parent={parentListValue} />}
            <h1 aria-label={data.title} className='h1'>{data.title}</h1>
            <h3 aria-label={data.opening_crawl} className='h1 waiting-text'>{data.opening_crawl}</h3>
            <h5 aria-label={data.director} className='h5'>{data.director}</h5>
            <h5 aria-label={data.release_date} className='h5'>{data.release_date}</h5>
            <div className='flex btn-links-info'>
                <button onClick={handlerList} type='button' aria-label='Characters' className='reset-btn btn-info hvr-float-shadow'>Characters</button>
                <button onClick={handlerList} type='button' aria-label='Planets' className='reset-btn btn-info hvr-float-shadow'>Planets</button>
                <button onClick={handlerList} type='button' aria-label='Species' className='reset-btn btn-info hvr-float-shadow'>Species</button>
                <button onClick={handlerList} type='button' aria-label='Starships' className='reset-btn btn-info hvr-float-shadow'>Starships</button>
                <button onClick={handlerList} type='button' aria-label='Vehicles' className='reset-btn btn-info hvr-float-shadow'>Vehicles</button>
            </div>
            <div id='grid-list' className="grid grid-list">
                {showModal && <ModalWindow className='for-list' />}
                {readyToShow && listToShow.map((item, index) => {
                    return <button key={index} type="button" aria-label={item.name} className="reset-btn grid-item" onClick={(event) => { handlerShowInfo(event, item) }}>{item.name}</button>
                })}
            </div >
        </>
    )
}

export default Description;