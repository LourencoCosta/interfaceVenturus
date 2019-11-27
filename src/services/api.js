import axios from 'axios';


export default function api ({url}){
   return axios.create({
        baseURL : url
    })
}

