import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";
import "../pokemon.css";

const pokemon = ({ pokemon }) => {
  const { id } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState();
  // console.log(selectedPokemon);

  const fetchApi = async () => {
    //total amount of pokemons are: '10271'
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setSelectedPokemon({
          id: response.id,
          name: response.name,
          types: response.types.map((type) => type.type.name),
          sprites: response.sprites.other["official-artwork"].front_default,
          species: response.species.name,
          height: response.height / (10),
          weight: response.weight / (10),
          abilities: response.abilities.map((ability) => ability.ability.name),
          hp: response.stats[0].base_stat,
          attack: response.stats[1].base_stat,
          defense: response.stats[2].base_stat,
          specialAttack: response.stats[3].base_stat,
          specialDefense: response.stats[4].base_stat,
          speed: response.stats[5].base_stat,
          total: response.stats.reduce(
            (total, stat) => total + stat.base_stat,
            0
          ),
        });
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const idpluspokemon = () => {
    const maxId = 100;
    const newId = parseInt(id, 10) + 1;
    if (newId <= maxId) {
      window.location.href = `/pokemon/${newId}`;
    }
  };
  
  const idminuspokemon = () => {
    const newId = parseInt(id, 10) - 1;
    if (newId >= 1) {
      window.location.href = `/pokemon/${newId}`;
    }
  };

  return (
    <div>
      <div
        className={`flex flex-col w-screen h-screen ${
          selectedPokemon?.types?.length > 0
            ? `bg-${selectedPokemon.types[0]}-type`
            : ""
        }`}
      >
        <div className={`top_pokemon flex flex-col w-full absolute`}>
          <Link to="/">
            <img
              src="\src\assets\back.png"
              alt="back-to-home-page"
              className="back_img"
            />
          </Link>

          <div className="name_id flex">
            <p className="text-lg">{selectedPokemon?.name}</p>
            <p>{"#" + selectedPokemon?.id}</p>
          </div>

          <div className="flex justify-evenly mt-5">
            <img
              src="\src\assets\arrow-down.png"
              alt="id-minus-1"
              className="change_id"
              onClick={idminuspokemon}
            />

            <div className="">
              {selectedPokemon?.types?.map((type, index) => (
                <span
                  key={index}
                  className={`type_pok ${type.toLowerCase()}-type`}
                >
                  {type}
                </span>
              ))}
            </div>

            <img
              src="\src\assets\arrow-up.png"
              alt="id-add-1"
              className="change_id"
              onClick={idpluspokemon}
            />
          </div>

          <div className="sprite flex justify-center">
            {selectedPokemon && (
              <img
                className="poke_img flex relative"
                src={selectedPokemon.sprites}
                alt={selectedPokemon.name}
              />
            )}
          </div>
        </div>

        <div className="btm_pokemon w-full bg-white">
          <div className="flex justify-center justify-evenly items-center h-full">
            <div className="props">
              <p>properties:</p>
              <p>species: {selectedPokemon?.types[0]} pokemon</p>
              <p>height: {selectedPokemon?.height}m</p>
              <p>weight: {selectedPokemon?.weight}kg</p>
              <p>abilities: {selectedPokemon?.abilities}</p>
            </div>

            <div className="stats">
              <p>statistics:</p>
              <p>hp: {selectedPokemon?.hp}</p>
              <p>attack: {selectedPokemon?.attack}</p>
              <p>defense: {selectedPokemon?.defense}</p>
              <p>special attack: {selectedPokemon?.specialAttack}</p>
              <p>special defense: {selectedPokemon?.specialDefense}</p>
              <p>speed: {selectedPokemon?.speed}</p>
              <p>total: {selectedPokemon?.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default pokemon;
