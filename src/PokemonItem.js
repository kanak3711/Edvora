import React from 'react'
import './pokemonItem.css';

function ProductItem({pokemon}) {

    return (
        
        <div class="card">
    <img src={pokemon.sprites.front_default} alt="" />
    <h3>{pokemon.name}</h3>
    <p>Ability -{pokemon.abilities[0].ability.name}</p>
  </div>
        
    )
}

export default ProductItem