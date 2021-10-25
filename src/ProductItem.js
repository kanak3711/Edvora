import React from 'react'
import './productItem.css';
function ProductItem({product}) {

    return (
        <div className="product_card">
            <div className="product_box">
                <h2 title={product}>{product}</h2>
                
            </div>

        </div>
    )
}

export default ProductItem