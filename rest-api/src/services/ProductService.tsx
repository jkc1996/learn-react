import axios from "axios";
import { Product } from "../models/product";
import DeleteProduct from "../components/products/DeleteProduct";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ProductService {
    // Accept the signal here
    static fetchProducts = async (signal: AbortSignal): Promise<Product[]> => {
        console.log("⏳ Starting 2 second delay...");
        // 1. Wait for 2 seconds (2000ms) BEFORE calling the API, jsut to simulate a "loading" state.
        // or we can do is that in the chrome netwrok tab we can set the throttling to slow 3g/4g
        await delay(2000);
        console.log("⏳ finished 2 second delay...");
        // Pass the signal into the axios config object
        let response = await axios.get("http://localhost:3000/products", {
            signal: signal // <--- The most important part!
        });
        console.log("Products fetched:", response.data);
        return response.data; // return the actual array of products
    }

    static addProduct = async (product: Product): Promise<Product> => {
        // ✅ FIX: Extract 'id' out, and keep the rest in 'newProduct'
        // We are basically saying: "Take ID out, put everything else in newProduct variable"
        const { id, ...newProduct } = product;
        // Send 'newProduct' (which has NO id). json-server will auto-generate the ID.
        let response = await axios.post("http://localhost:3000/products", newProduct);
        console.log("Product added:", response.data);
        return response.data; // return the actual added product
    }

    static DeleteProduct = async (productId: number): Promise<Product> => {
        let response = await axios.delete(`http://localhost:3000/products/${productId}`);
        console.log(`Product with ID ${productId} deleted.`);
        return response.data; // return the deleted product object
    }

    static updateProduct = async (product: Product): Promise<Product> => {
        let response = await axios.put(`http://localhost:3000/products/${product.id}`, product);
        console.log(`Product with ID ${product.id} updated:`, response.data);
        return response.data; // return the updated product object
    }

    static fetchProductById = async (productId: number): Promise<Product> => {
        let response = await axios.get(`http://localhost:3000/products/${productId}`);
        console.log(`Product with ID ${productId} fetched:`, response.data);
        return response.data; // return the fetched product object
    }
}