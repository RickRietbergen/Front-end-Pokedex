import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import "./pokemon.css";
import PokemonBlock from "./components/pokemonBlock";

const App = () => {
  const [pokelist, setpokeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  const fetchApi = async () => {
    //total amount of pokemons are: '10271'
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
      .then((response) => response.json())
      .then((data) => {
        const apiDatas = data.results.map((result) =>
          fetch(result.url).then((response) => response.json())
        );
        Promise.all(apiDatas).then((responses) => {
          setpokeList(
            responses.map((data) => ({
              id: data.id,
              name: data.name,
              types: data.types.map((type) => type.type.name),
              sprites: data.sprites.other["official-artwork"].front_default,
            }))
          );
        });
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // if pokelist is edited, set filtered to all pokemons.
  useEffect(() => setFilteredPokemon(pokelist), [pokelist]);

  // if selectedType or searchTerm is edited, filter pokemons.
  useEffect(() => {
    FilterPokemon();
  }, [selectedType, searchTerm]);
  
  //filter pokemon, name, id or types.
  const FilterPokemon = () => {
    let localFiltered =
      selectedType == "All"
        ? pokelist
        : pokelist.filter((pokemon) => pokemon.types.includes(selectedType));

    localFiltered = localFiltered.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
      );
    });

    setFilteredPokemon(localFiltered);
  };

  let allTypes = ["All"];
  pokelist.forEach((pokemon) =>
    pokemon.types.forEach((type) => {
      if (!allTypes.includes(type)) allTypes.push(type);
    })
  );

  return (
    <div className="App">
      <div className="flex flex-col w-full h-screen">
        <img
          src="\src\assets\background-pokemon.png"
          alt="pokeball"
          className="fixed w-full h-full zi_img"
        />
        <h1 className="font_title text-center text-9xl text-black-300 mt-10 mb-40">
          PokeDex
        </h1>

        <div className="search_container flex justify-center items-center w-full gap-32">
          <input
            className="border border-black p-2.5 rounded-xl w-44"
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select
            className="type_select  border border-black rounded-xl p-2 w-44"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {allTypes.map((type) => (
              <option key={type} value={type}>
                {type} type
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="block_pokemons flex justify-center items-center flex-wrap w-full gap-2.5 mb-10">
        {filteredPokemon.map((pokemon) => (
          <PokemonBlock key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
