import axios from './customize-axios';
//không nhất thiết phải import instance from './customize-axios'; vì instance là duy nhất nên ta thay tên thì nó vẫn là cái đó.

const fetchAllUser = (page) => {
    return axios.get(`/users?page=${page}`);
};

const postCreateUser = (name, job) => {
    return axios.post('/users', { name, job });
};

const putUpdateUser = (name, job, id) => {
    return axios.put(`/users/${id}`, { name, job });
};

const deleteUser = (id) => {
    return axios.delete(`/users/${id}`);
};

const loginAPI = (email, password) => {
    return axios.post('/login', { email, password });
};
export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginAPI };
