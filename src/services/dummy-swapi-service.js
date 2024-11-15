export default class DummySwapiService {

    _people = [
        {
            id: 1,
            name: 'Bilbo Baggins [TEST DATA]',
            gender: 'male',
            birthYear: 'long ago',
            eyeColor: 'dark brown'
        },
        {
            id: 2,
            name: 'Frodo Baggins [TEST DATA]',
            gender: 'male',
            birthYear: 'long ago',
            eyeColor: 'dark brown'
        }
    ];

    _planets = [
        {
            id: 1,
            name: 'Earth [TEST DATA]',
            population: '7.530.000.000',
            rotationPeriod: '23 hours 56 seconds',
            diameter: '12.742 km'
        },
        {
            id: 2,
            name: 'Venus [TEST DATA]',
            population: 'not known',
            rotationPeriod: '243 days',
            diameter: '12.104 km'
        }
    ];

    _starships = [
        {
            id: 1,
            name: 'USS Enterprise [TEST DATA]',
            model: 'NCC-1701-C',
            manufacturer: 'Northrop Grumman Shipbuilding',
            costInCredits: 'not known',
            length: 'approx 300 meters',
            crew: 1000,
            passengers: 50,
            cargoCapacity: 100
        }
    ];

    getAllPeople = async () => {
        return this._people;
    }

    getPerson = async (id) => {
        const person = this._people.find(person => person.id === id);
        if (!person) {
            throw new Error(`Person with id ${id} not found`);
        }
        return person;
    }

    getAllPlanets = async () => {
        return this._planets;
    }

    getPlanet = async (id) => {
        const planet = this._planets.find(planet => planet.id === id);
        if (!planet) {
            throw new Error(`Planet with id ${id} not found`);
        }
        return planet;
    }

    getAllStarships = async () => {
        return this._starships;
    }

    getStarship = async (id) => {
        const starship = this._starships.find(starship => starship.id === id);
        if (!starship) {
            throw new Error(`Starship with id ${id} not found`);
        }
        return starship;
    };

    getPersonImage = (id) => {
        return `https://placeimg.com/400/500/people?${id}`;
    }

    getStarshipImage = (id) => {
        return `https://placeimg.com/600/400/tech?${id}`;
    }

    getPlanetImage = (id) => {
        return `https://placeimg.com/400/400/nature?${id}`;
    }
}
