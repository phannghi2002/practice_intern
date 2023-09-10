import { useEffect, useState } from 'react';
import _ from 'lodash';
import Table from 'react-bootstrap/Table';

import { fetchAllUser } from '~/services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '~/components/ModalAddNew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import './TableUsers.scss';
import { debounce } from 'lodash';
import { CSVLink } from 'react-csv';

import Papa from 'papaparse';
import { toast } from 'react-toastify';

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    // const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [dataUserDelete, setDataUserDelete] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [, setSortBy] = useState('asc');
    const [, setSortField] = useState('id');

    // const [keyword, setKeyword] = useState('');

    const [getAllValueUsers, setGetAllValueUsers] = useState([]);

    const [dataExport, setDataExport] = useState([]);

    const handleClose = () => {
        setIsShowModalAddNew(false);
    };

    const handleCloseDeleteConfirm = () => {
        setIsShowModalDelete(false);
    };

    useEffect(() => {
        getUsers(1);
        //ban đầu mặc định sẽ lấy trang 1
    }, []);

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            // console.log(res);

            setGetAllValueUsers(res.data);
            //setTotalUsers(res.total);
            setTotalPages(res.total_pages);
            setListUsers(res.data);
        }
    };

    const handlePageClick = (e) => {
        //console.log(e);
        getUsers(+e.selected + 1);
        // +1 vì selected này nó bắt đầu lấy số trang từ 0, dấu + trước e.selected vì ko bt nó là dạng chuỗi hay là số, dấu + để nó tự
        //chuyển thành dạng số
    };

    const handleUpdateTable = (user) => {
        setListUsers([...listUsers, user]);
    };

    //Edit
    const handleEditUser = (user) => {
        // console.log(user);
        setIsShowModalEdit(true);
        setDataUserEdit(user);
    };

    const handleCloseEdit = () => {
        setIsShowModalEdit(false);
    };

    const handleEditUserFromModal = (user) => {
        // console.log(user);
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = cloneListUsers.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        cloneListUsers[index].last_name = user.last_name;
        cloneListUsers[index].id = user.id;
        cloneListUsers[index].email = user.email;
        setListUsers(cloneListUsers);

        // console.log(listUsers);
        // console.log(cloneListUsers);

        //  cloneListUsers[index].f
    };

    //Delete
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);

        setListUsers(cloneListUsers);
    };

    //Sort
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(listUsers);

        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    };

    const handleSearch = debounce((e) => {
        let term = e.target.value;

        if (term) {
            console.log('anh nghi');
            let searchResults = getAllValueUsers.filter((item) => item.email.includes(term));
            setListUsers(searchResults);
        } else {
            getUsers(1);
        }
    }, 1000);

    //Export
    //Tham chiếu đến hàm này, thư viện có sẵn rồi. bài 18, phút thứ 7
    const getUsersExport = (e, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(['ID', 'Email', 'First Name', 'Last Name']);
            listUsers.map((item, index) => {
                let arr = [];

                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                return result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };

    //Import

    const handleImportCSV = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            console.log(file);

            if (file.type !== 'text/csv') {
                toast.error('Only accept csv files');
                return;
            }
            Papa.parse(file, {
                complete: function (results) {
                    let rawCSV = results.data;

                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== 'email' ||
                                rawCSV[0][1] !== 'first_name' ||
                                rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('Wrong format header CSV file');
                            } else {
                                // console.log(rawCSV);

                                let result = [];

                                // eslint-disable-next-line array-callback-return
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                });
                                setListUsers(result);
                            }
                        } else {
                            toast.error('Wrong format CSV file');
                        }
                    } else {
                        toast.error('Not found data on CSV file');
                    }

                    console.log('Finished:', results.data);
                },
            });
        }
    };
    return (
        <>
            <div className="my-3 add-user d-sm-flex">
                <span> List Users:</span>
                <div className="group-btns mt-2 mt-sm-0">
                    <label htmlFor="test" className="btn btn-warning ">
                        <i className="fa-solid fa-file-import me-2"></i>Import
                    </label>

                    <input id="test" type="file" hidden onChange={(e) => handleImportCSV(e)} />

                    <CSVLink
                        data={dataExport}
                        filename={'user.csv'}
                        className="btn btn-primary "
                        target="_blank"
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >
                        <i className="fa-solid fa-file-arrow-down me-2"></i>
                        Export file
                    </CSVLink>

                    <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                        <i className="fa-solid fa-circle-plus me-2"></i>
                        Add new user
                    </button>
                </div>
            </div>

            <div className="col-12 my-3 col-sm-4">
                <input
                    className="form-control "
                    placeholder="Search user by email"
                    // value={keyword}
                    onChange={(e) => handleSearch(e)}
                />
            </div>

            <div className="customize-table">
                <Table striped bordered hover>
                    <thead className="center">
                        <tr>
                            <th>
                                <div className="sort-header">
                                    <span className="center"> ID</span>
                                    <span>
                                        <i
                                            // onClick={() => {
                                            //     setSortBy('desc');
                                            //     setSortField('id');
                                            // }} ko khuyến khích
                                            onClick={() => handleSort('desc', 'id')}
                                            className="fa-solid fa-arrow-down"
                                        ></i>
                                        <i onClick={() => handleSort('asc', 'id')} className="fa-solid fa-arrow-up"></i>
                                    </span>
                                </div>
                            </th>
                            <th>Email</th>

                            <th>
                                <div className="sort-header">
                                    <span> First Name</span>
                                    <span>
                                        <i
                                            onClick={() => handleSort('desc', 'first_name')}
                                            className="fa-solid fa-arrow-down"
                                        ></i>
                                        <i
                                            onClick={() => handleSort('asc', 'first_name')}
                                            className="fa-solid fa-arrow-up"
                                        ></i>
                                    </span>
                                </div>
                            </th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning me-3"
                                                onClick={() => handleEditUser(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger mt-2 mt-sm-0"
                                                onClick={() => handleDeleteUser(item)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

            <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />

            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleCloseEdit={handleCloseEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleCloseDeleteConfirm={handleCloseDeleteConfirm}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    );
};

export default TableUsers;
