import React from 'react'
import ProductItem from './ProductItem'
import './product.css'
export default function PokemonList({ pokemon }) {
  return (
    <div className="products">
      {
      pokemon.map(p => {
        return <ProductItem key={p} product={p} />
      })
      }
    </div>
  )
}
