import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Product from "./Product"

const PRODUCTS_LISTING_QUERY = graphql`
  query ProductsListingQuery {
    allShopifyProduct {
      edges {
        node {
          id
          images {
            localFile {
              childImageSharp {
                fixed(width: 200) {
                  ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
              }
            }
          }
          title
          publishedAt(formatString: "YYYY")
          description
          descriptionHtml
          variants {
            sku
            id
            title
            price
          }
        }
      }
    }
  }
`

const ProductsListing = () => {
  const { allShopifyProduct } = useStaticQuery(PRODUCTS_LISTING_QUERY)
  console.log("allShopifyProduct:", allShopifyProduct)

  return (
    <div>
      {allShopifyProduct.edges.map(edge => (
        <Product product={edge.node} />
      ))}
    </div>
  )
}

export default ProductsListing
