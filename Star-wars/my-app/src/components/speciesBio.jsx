/* eslint-disable react/prop-types */
function SpeciesBio({ Info, represent }) {
    const planets = [];
    const humans = [];
    [...represent].map((item) => {
        item.result.description.toLowerCase().trim() == 'a planet.' ? planets.push(item.result.properties.name) : humans.push(item.result.properties.name);
    })
    console.log('planets', planets);
    console.log('humans', humans);
    return (
        <>
            <div className="grid grid-2">
                <h2>Type: {Info.name}</h2>
                {[...planets].map((planet, index) => (
                    <h2 key={index}>Planet: {planet}</h2>
                ))}
            </div>
            <h4>Classification: {Info.classification}</h4>
            <h4>Designation: {Info.designation}</h4>
            <h4>Language: {Info.language}</h4>
            <div className="grid grid-2">
                <h4>Average lifespan: {Info.average_lifespan}</h4>
                <h4>Average height: {Info.average_height}</h4>
                <h4>Hair colors: {Info.hair_colors}</h4>
                <h4>Eye colors: {Info.eye_colors}</h4>
                <h4>Skin colors: {Info.skin_colors}</h4>
            </div>
            <h2 className="homeworld">Representatives</h2>
            <div className="grid grid-2">
                {[...humans].map((human, index) => (
                    <h4 key={index}>{human}</h4>
                ))}
            </div>
        </>
    );
}
export default SpeciesBio;