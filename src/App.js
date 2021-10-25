import React, { useState, useEffect } from 'react';
import ProductItem from './PokemonItem';
import './App.css';

import Loading from './Loading/Loading';
function getPokemon({ url }) {
  return new Promise((resolve, reject) => {
      fetch(url).then(res => res.json())
          .then(data => {
              resolve(data)
          })
  });
}

 async function getAllPokemon(url) {
  return new Promise((resolve, reject) => {
      fetch(url).then(res => res.json())
          .then(data => {
              resolve(data)
          })
  });
}
function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const getnexturl = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const getprevurl = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }

  return (
    <>
      <div>
        {loading ? <Loading/> : (
        <>
        <div class="header">
          <h1>Pokemon Types</h1>
          
            <button onClick={getprevurl}>Prev</button>
            <button onClick={getnexturl}>Next</button>
         
        </div>
       
        <div className="grid-container">
        {pokemonData.map((pokemon, i) => {
          return <ProductItem key={i} pokemon={pokemon} />
        })}
      </div>
      </>
        )}
      </div>
    </>
  );
}

export default App;