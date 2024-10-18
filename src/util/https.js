
const BASE_URL = 'https://localhost:7069/api';

const http = () => {

    const get = async (endpoint, options = {}) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers, 
                },
                ...options, 
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('GET request failed:', error);
            throw error; 
        }
    };

    // Function to handle POST requests
    const post = async (endpoint, body) => {
        try {
            console.log(body)
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('POST request failed:', error);
            throw error; // Re-throw error for further handling
        }
    };

    return { get, post }; // Export the methods as an object
};

export default http;


