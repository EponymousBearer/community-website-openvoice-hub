
export default async function GetAllProducts() {

    const response = await fetch('/api/getCartProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch products by IDs');
    }
    const data = await response.json();

    return data;
};
