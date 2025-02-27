export const calculatePrice = (price: number, discount: number) => {
    if (discount > 0) {
        return (price - (price * discount / 100)).toFixed(2)
    }
    return price
}