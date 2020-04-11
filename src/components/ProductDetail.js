import React, { useState, useContext } from "react"
import Img from "gatsby-image"
import { StoreContext } from '../context/StoreContext'

const ProductDetail = ({ product }) => {
    const [selectedVariant, setVariant] = useState(product.variants[0])
    const { client } = useContext(StoreContext)

    const addToCart = async variantId => {
        const newCheckout = await client.checkout.create();
        //Not the variant ID
        //
        //console.log(product.variants[0].id)
        const lineItems = [
            {
                variantId: variantId.replace(
                    "Shopify__ProductVariant__",
                    ""
                ),
                quantity: 1,
            },
        ]
        const addItems = await client.checkout.addLineItems(
            newCheckout.id,
            lineItems
        )
        window.open(addItems.webUrl, '_blank')
        console.log('addItems:', addItems.webUrl)
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <Img fixed={product.images[0].localFile.childImageSharp.fixed} />
            <p>{product.description}</p>
            <p>JPY{selectedVariant.price}</p>
            <select
                onChange={e => {
                    const selected = product.variants.filter(
                        variant => variant.sku === e.target.value
                    )
                    setVariant(selected[0])
                }}
                value={selectedVariant.sku}
            >
                {product.variants.map(variant => (
                    <option key={variant.id} value={variant.sku}>
                        {variant.title}
                    </option>
                ))}
            </select>
            <button onClick={() => addToCart(selectedVariant.id)}>Buy Now</button>
        </div>
    )
}

export default ProductDetail
