const PokemonBlock = ({ pokemon }) => {
  return (
    <div
      className={`card_pokemon flex-col items-center rounded-xl ${pokemon.types
        .map((type) => `bg-${type}-type`)
        .join(" ")}`}
      key={pokemon.id}
      onClick={() => (window.location.href = `/pokemon/${pokemon.id}`)}
    >
      <div className="flex text-center text-xl max-h-12 mt-1 p-2">
        <h4 className="pokemon_id">#{pokemon.id}</h4>
        <h4 className="w-full">{pokemon.name}</h4>
      </div>
      <div className="types flex  items-center justify-between w-full">
        <div className="flex flex-col justify-center h-24 g-10 ml-10">
          {pokemon.types.map((type) => (
            <p className="types text-center rounded-xl" key={type}>
              {type}
            </p>
          ))}
        </div>
        <div className="flex justify-center">
          <img className="poke_img-block" src={pokemon.sprites} alt={pokemon.name} />
        </div>
      </div>
    </div>
  );
};

export default PokemonBlock;
