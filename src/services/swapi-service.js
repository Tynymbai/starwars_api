export default class SwapiService {

    _apiBase = 'https://swapi.dev/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }

        return await res.json();
    };

    getAllPeople = async () => {
        const res = await this.getResource(`/people/`);
        return res.results.map(this._transformPerson);
    };

    getPerson = async (id) => {
        try {
            const person = await this.getResource(`/people/${id}/`);
            const homeworld = await this._transformHomeworld(person.homeworld);

            return {
                ...this._transformPerson(person),
                homeworld,
            };
        } catch (error) {
            console.error(`Error fetching person with id ${id}:`, error);
            throw error;
        }
    };

    getAllPlanets = async () => {
        const res = await this.getResource(`/planets/`);
        return res.results.map(this._transformPlanet).slice(1); // Обрезка с пояснением
    };

    getPlanet = async (id) => {
        try {
            const planet = await this.getResource(`/planets/${id}/`);
            return this._transformPlanet(planet);
        } catch (error) {
            console.error(`Error fetching planet with id ${id}:`, error);
            throw error;
        }
    };

    getAllStarships = async () => {
        const res = await this.getResource(`/starships/`);
        return res.results.map(this._transformStarship).slice(2, -1); // Обрезка с пояснением
    };

    getStarship = async (id) => {
        try {
            const starship = await this.getResource(`/starships/${id}/`);
            return this._transformStarship(starship);
        } catch (error) {
            console.error(`Error fetching starship with id ${id}:`, error);
            throw error;
        }
    };

    getImageUrl = (type, id) => {
        return `${this._imageBase}/${type}/${id}.jpg`;
    };

    getPersonImage = ({ id }) => this.getImageUrl('characters', id);
    getStarshipImage = ({ id }) => this.getImageUrl('starships', id);
    getPlanetImage = ({ id }) => this.getImageUrl('planets', id);

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        const match = item.url.match(idRegExp);
        if (!match) {
            throw new Error("ID could not be extracted from URL: " + item.url);
        }
        return match[1];
    };

    _transformPlanet = (planet) => ({
        id: this._extractId(planet),
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter,
        climate: planet.climate,
        terrain: planet.terrain,
        type: "planet",
    });

    _transformStarship = (starship) => ({
        id: this._extractId(starship),
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.cost_in_credits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargo_capacity,
        type: "starship",
    });

    _transformPerson = (person) => ({
        id: this._extractId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birth_year,
        eyeColor: person.eye_color,
        hairColor: person.hair_color,
        mass: person.mass,
        height: person.height,
        homeworld: person.homeworld,
        type: "person",
    });

    _transformHomeworld = async (url) => {
        const idRegExp = /\/([0-9]*)\/$/;
        const match = url.match(idRegExp);
        if (!match) {
            throw new Error("Could not extract planet ID from URL: " + url);
        }
        const planetId = match[1];
        const planet = await this.getResource(`/planets/${planetId}/`);
        return planet.name;
    };
}
