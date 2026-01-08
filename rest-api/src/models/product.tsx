// Define what your API returns

export interface Product {
    id: number;
    name: string;
    price: number;
    catagory: string;   // Dropdown
    brand: string;      // Dropdown
    stock: number;      // Number
    description: string;// Textarea
    imageUrl: string;   // URL string
    isActive: boolean;  // Checkbox (Available or not)
}