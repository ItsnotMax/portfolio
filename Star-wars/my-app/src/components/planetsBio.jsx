/* eslint-disable react/prop-types */
function PlanetsBio({ Info }) {
    return (
        <>
            <h2 className="homeworld">Planet: {Info.name}</h2>
            <div className="grid grid-2">
                <h4>Diameter: {Info.diameter}</h4>
                <h4>Rotation period: {Info.rotation_period}</h4>
                <h4>Orbital period: {Info.orbital_period}</h4>
                <h4>Gravity: {Info.gravity}</h4>
                <h4>Population: {Info.population}</h4>
                <h4>Climate: {Info.climate}</h4>
                <h4>Surface water: {Info.surface_water}</h4>
                <h4>Terrain: {Info.terrain}</h4>
            </div>
        </>
    );
}
export default PlanetsBio;