import axios from 'axios'

export const GetRequest = async (url) => {
    try {
        const response = await axios.get(url);
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
    }

}