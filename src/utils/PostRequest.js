import axios from 'axios'



export const PostRequest = async (Url, data, navigate, setError) => {

    try {
        const response = await axios.post(Url, data);
        return response;
    } catch (error) {
        setError(error.response.data);
        console.log(error);
    }

};