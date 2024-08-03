/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { fetchGET } from '../js_modules/fetch.js';
import CharactersBio from './charactersBio';
import PlanetsBio from './planetsBio';
import SpeciesBio from './speciesBio';
import StarshipsBio from './starshipsBio';
import VehicleBio from './vehicleBio.jsx';

function ShowAddInfo({ Info, onInfoClose, parent }) {
    const [homeworld, setHomeworld] = useState(false);
    const [character, setCharacter] = useState(false);
    const [planet, setPlanet] = useState(false);
    const [species, setSpecies] = useState(false);
    const [speciesReview, setSpeciesReview] = useState(false);
    const [starship, setStarship] = useState(false);
    const [vehicle, setVehicle] = useState(false);

    useEffect(() => {
        if (parent.toLowerCase().trim() == 'characters') {
            fetchGET(Info.homeworld).then(response => {
                setHomeworld(
                    response.result.properties
                )
            });
            setCharacter(true);
        }
        if (parent.toLowerCase().trim() == 'planets') {
            setPlanet(true);
        }
        if (parent.toLowerCase().trim() == 'species') {
            const tempUrlArray = [];
            const urlArray = tempUrlArray.concat(Info.homeworld, Info.people);
            Promise.all(urlArray.map(url =>
                fetchGET(url)
            )).then(responses => {
                setSpeciesReview(responses);
            }).catch(error => {
                console.error('An error occurred:', error);
            });
            setSpecies(true);
        }
        if (parent.toLowerCase().trim() == 'starships') {
            setStarship(true)
        }
        if (parent.toLowerCase().trim() == 'vehicles') {
            setVehicle(true)
        }
    }, [parent])

    const quit = (event) => {
        if ($(event.target).attr('id') == 'modalInfo' || $(event.target).parents('div').attr('id') == 'modalClose') {
            onInfoClose('closed');
        }
    };

    return (
        <>
            <div id='modalInfo' className='modalInfo' onClick={quit}>
                <div id='modalBlock' className='modalBlock'>
                    <div id='modalClose' className='reset-btn modalClose'>
                        <svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path fillRule='evenodd' clipRule='evenodd' d='M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z' fill="#B0B0B0" />
                        </svg>
                    </div>
                    {character && <CharactersBio Info={Info} homeworld={homeworld} />}
                    {planet && <PlanetsBio Info={Info} />}
                    {species ? speciesReview ? <SpeciesBio Info={Info} represent={speciesReview} /> : <><span>Downloading...</span></> : false}
                    {starship && <StarshipsBio Info={Info} />}
                    {vehicle && <VehicleBio Info={Info} />}
                </div>
            </div>
        </>
    )
}
export default ShowAddInfo;