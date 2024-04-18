export default interface Product {
    id: number,
    code: string,
    title: string,
    description: string,
    price: number,
    stock: number,
    categoryId: number,
    brand: string,
    imgURL: string
}