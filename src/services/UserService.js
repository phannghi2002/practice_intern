import axios from './customize-axios';
//không nhất thiết phải import instance from './customize-axios'; vì instance là duy nhất nên ta thay tên thì nó vẫn là cái đó.

const fetchAllUser = (page) => {
    return axios.get(`/users?page=${page}`);
};

export { fetchAllUser };
