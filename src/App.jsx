import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactLoading from "react-loading";

//component
import FavPokemon from "./components/FavPokemon";

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        let res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(res.data);
        setError("");
      } catch (error) {
        setError("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };

    loadPoke();
    return () => abortController.abort();
  }, [number]);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };
  const nextPoke = () => {
    setNumber((number) => number + 1);
  };
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const randomPoke = () => {
    setNumber(randomNumberInRange(0, 1020));
  };

  const addFav = () => {
    setFav((prevState) => [...prevState, poke]);
  };

  console.log(poke);
  console.log(`pokemon ID: ${number}`);
  console.log(fav);

  return (
    <div className="max-w-5xl p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div>
          {loading ? (
            <ReactLoading
              type="spin"
              color="black"
              height={"20%"}
              width={"20%"}
            />
          ) : (
            <>
              <h1>{poke?.name}</h1>
              <br />
              <button onClick={addFav}>Add to favourite</button>
              <img
                src={poke?.sprites?.other?.home?.front_default}
                alt={poke?.name}
              />
              <br />
              <div className="grid grid-cols-2 ">
                <p className="w-15 ml-20">
                  ABILITIES:
                  {poke?.abilities?.map((abil, idx) => (
                    <li key={idx}>{abil.ability.name}</li>
                  ))}
                </p>
                <p className="w-15 mr-20">
                  TYPE:
                  {poke?.types?.map((types, idx) => (
                    <li key={idx}>{types.type.name}</li>
                  ))}
                </p>
              </div>
              <br />
              <button onClick={prevPoke}>Previous</button>
              <button onClick={randomPoke}>Random</button>
              <button onClick={nextPoke}>Next</button>
            </>
          )}
        </div>
        <div className="m-5">
          <h2>Your Favourite Pokemon</h2>
          <br />
          {fav.length > 0 ? (
            <FavPokemon fav={fav} setFav={setFav} />
          ) : (
            <p className="flex h-full justify-center items-center">
              No Favourite Pokemon...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
