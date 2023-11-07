import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function DelFavPokemon({ fav, setFav }) {
  const removePoke = (id) => {
    const deleted = fav.filter((fav) => {
      return fav.id !== id;
    });
    setFav(deleted);
  };

  return (
    <button onClick={() => removePoke(fav.id)}>
      <AiOutlineClose />
    </button>
  );
}

export default DelFavPokemon;
