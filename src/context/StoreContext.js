import React from 'react'
import Client from 'shopify-buy'

export const client = Client.buildClient({
    domain: "level-up-tuts-test-store-cjkadhsfg.myshopify.com",
    storefrontAccessToken: "8cd1b0441ede573c5ded02346be4f686",
})

export const StoreContext = React.createContext({
    client,
})