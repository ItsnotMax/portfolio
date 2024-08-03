/* eslint-disable react/prop-types */
import { fetchGET } from '../js_modules/fetch.js'

function Aside(props) {
    const url = 'https://www.swapi.tech/api/films/';
    const listEpisodes = [
        {
            title: 'A New Hope',
            url: url + '1'
        },
        {
            title: 'The Empire Strikes Back',
            url: url + '2'
        },
        {
            title: 'Return of the Jedi',
            url: url + '3'
        },
        {
            title: 'The Phantom Menace',
            url: url + '4'
        },
        {
            title: 'Attack of the Clones',
            url: url + '5'
        },
        {
            title: 'Revenge of the Sith',
            url: url + '6'
        }
    ];

    const handlerGet = async (event) => {
        const toggleShow = true;
        props.modalWindow(toggleShow);
        const json = await fetchGET(event.target.getAttribute('data-url'));
        props.modalWindow(!toggleShow);
        props.onButtonClick(json.result.properties);
    }
    
    return (
        <nav>
            <ul className="list-episodes">
                {listEpisodes.map(({ title, url }, index) => {
                    return (
                        <li key={index}>
                            <div className="flex episode">
                                <button type='button' aria-label={title} className="reset-btn episode-link" data-url={url} onClick={handlerGet}>{title}</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}

export default Aside;