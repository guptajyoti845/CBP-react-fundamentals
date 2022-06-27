import {useEffect, useState} from "react";
import Pet from "./Pet";

const SearchParams = () => {
    const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];
    const breeds = ['a', 'b', 'c'];

    const [location, setLocation] = useState("Seattle, WA");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);

    const updateValue = (event) => {
        console.log("event", event)
        setLocation(event.target.value)
    }

    async function requestPets() {
        const res = await fetch(
            `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        console.log("res", res)
        const json = await res.json();

        setPets(json.pets);
    }


    useEffect(  () => {
         requestPets().then((data) => {
             console.log("data", data);
         }).catch((error) => {
             console.log("failuree", error)
         });


         console.log("next line execution")
    }, [location]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location
                    <input id="location"
                           value={location}
                           placeholder="Location"
                           onChange={updateValue}
                    />
                    {location}
                </label>

                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                        onBlur={(e) => {
                            console.log("on Blurrrrr")
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                    >
                        <option/>
                        {ANIMALS.map((animal) => (
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>;

                <label htmlFor="breed">
                    Breed
                    <select
                        disabled={!breeds.length}
                        id="breed"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        onBlur={(e) => setBreed(e.target.value)}
                    >
                        <option/>
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>;


                <button>Submit</button>
            </form>

            {
                pets.map((pet) => (
                    <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />
                ))
            }
        </div>
    )
};

export default SearchParams;
