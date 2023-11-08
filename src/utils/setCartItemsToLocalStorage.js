import { request } from "./axios_helper"

export const setCartItemsToLocalStorage = async () => {
    const respData = await request("GET", "/Ecommerce/cartItems")
    const cartItems = respData.data.body.map(item => {
        return (
            {
                "id": item.product.id,
                "name": item.product.name,
                "price": item.product.price,
                "imgUrl": item.product.productImage.fileName,
                "quantity": item.quantity
            }
        )
    });

    console.log(cartItems)

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}