/* eslint-disable react/prop-types */
function VehicleBio({ Info }) {
    return (
        <>
            <div className="grid grid-2">
                <h2>Name: {Info.name}</h2>
                <h2>Model: {Info.model}</h2>
            </div>
            <h4>Manufacturer: {Info.manufacturer}</h4>
            <h4>Vehicle class: {Info.vehicle_class}</h4>
            <h4>Cost in credits: {Info.cost_in_credits}</h4>
            <div className="grid grid-2">
                <h4>Cargo capacity: {Info.cargo_capacity}</h4>
                <h4>Consumables: {Info.consumables}</h4>
                <h4>Crew: {Info.crew}</h4>
                <h4>Passengers: {Info.passengers}</h4>
                <h4>Max atmosphering speed: {Info.max_atmosphering_speed}</h4>
                <h4>Length: {Info.length}</h4>
            </div>
        </>
    )
}

export default VehicleBio;