import axios from 'axios'



export const PutRequest = async (Url, data, navigate, setError) => {

    try {
        const response = await axios.put(Url, data);
        console.log(response);
        navigate('/sign-in');
    } catch (error) {
        setError(error.response.data);
        console.log(error);
    }

};