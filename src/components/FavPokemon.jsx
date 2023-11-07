import React from "react";
import DelFavPokemon from "./DelFavPokemon";
import LikePokemon from "./LikePokemon";

function FavPokemon({ fav, setFav }) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {fav?.map((data, idx) => (
        <div className="m-2">
          <h3>{data?.name}</h3>
          <img
            src={data?.sprites?.other?.home?.front_default}
            alt={data?.name}
            className="p-1"
          />
          <LikePokemon Fav={fav} setFav={setFav} />
        </div>
      ))}
    </div>
  );
}

export default FavPokemon;
