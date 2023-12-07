import React from "react";
import LikePokemon from "./LikePokemon";
import { MdOutlineClose } from "react-icons/md";

function FavPokemon({ fav, setFav }) {
  //remove pokemon from fav array
  const removeFavPoke = (id) => {
    const updateFev = [...fav];
    updateFev.splice(id, 1);
    setFav(updateFev);
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {fav?.map((data, idx) => (
        <div className="m-2" key={idx}>
          <h3>{data?.name}</h3>
          <img
            src={data?.sprites?.other?.home?.front_default}
            alt={data?.name}
            className="p-1"
          />
          <div className="btnBox flex flex-row ">
            <LikePokemon Fav={fav} setFav={setFav} />
            <button onClick={() => removeFavPoke(idx)}>
              <MdOutlineClose />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavPokemon;
