// import axios form "customize-axios"
import axios from "./customize-axios";

const fetchAllUser = (page) =>{
    return axios.get(`/api/users?page=${page}`); // lay ds nguoi dung tai trang 
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", {name, job})
}

export {fetchAllUser, postCreateUser};