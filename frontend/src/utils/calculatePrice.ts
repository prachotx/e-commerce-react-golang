export const calculatePrice = (price: number, discount: number) => {
    if (discount > 0) {
        return price - (price * discount / 100)
    }
    return price
}