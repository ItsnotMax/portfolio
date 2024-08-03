/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

function CharactersBio({ Info, homeworld }) {
    const handler = (event) => {
        if ($(event.target).attr('type') == 'button') {
            $('#show').hasClass('hidden') ? $('#show').removeClass('hidden') : $('#show').addClass('hidden')
        }
    }

    return (
        <>
            <h2>Name: {Info.name}</h2>
            <h4>Gender: {Info.gender}</h4>
            <h4>Birth year: {Info.birth_year}</h4>
            <h4>Height/Mass: {Info.height}/{Info.mass}</h4>
            <h4>Skin color: {Info.skin_color}</h4>
            <h4>Hair color: {Info.hair_color}</h4>

            {homeworld
                ? (<><h2 className="homeworld">Homeworld: <button type="button" onClick={(event) => handler(event)} className='reset-btn btn-name'>{homeworld.name}</button> <span className="fs-12-400">(Click for more information)</span></h2>
                    <div id="show" className="grid grid-2 hidden">
                        <h4>Diameter: {homeworld.diameter}</h4>
                        <h4>Rotation period: {homeworld.rotation_period}</h4>
                        <h4>Orbital period: {homeworld.orbital_period}</h4>
                        <h4>Gravity: {homeworld.gravity}</h4>
                        <h4>Population: {homeworld.population}</h4>
                        <h4>Climate: {homeworld.climate}</h4>
                        <h4>Surface water: {homeworld.surface_water}</h4>
                        <h4>Terrain: {homeworld.terrain}</h4>
                    </div>
                </>
                )
                : <h4>Homeworld: Downloading...</h4>}
        </>
    );
}
export default CharactersBio;