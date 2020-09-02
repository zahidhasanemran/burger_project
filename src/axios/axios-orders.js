import Axios from 'axios';

const orderInstance = Axios.create({
    baseURL: 'https://react-burger-007.firebaseio.com/'
})

export default orderInstance;
