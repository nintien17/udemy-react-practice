// import axios form "customize-axios"
import axios from "./customize-axios";

const fetchAllUser = (page) =>{
    return axios.get(`/api/users?page=${page}`); // lay ds nguoi dung tai trang 
}
export {fetchAllUser};