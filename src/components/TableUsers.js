import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";

const TableUsers = (props) => {
  const [listUsers, setlistUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false); // hien thi khi click button addnew
  const [isShowModalEdit, setIsShowModalEdit] = useState(false); // hien thi khi click button edit
  const [dataUserEdit, setDataUserEdit] = useState({});

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
  };

  const handleUpdateTable = (user) => {
    setlistUsers([user, ...listUsers]);
  };

  useEffect(() => {
    //call API
    //dry
    getUsers(1);
  }, []);

  // xet tong so trang sau khi lay nguoi dung
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setlistUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  // Goi API lay so luong nguoi dung tai trang dang chon
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span>
          <b>List Users:</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add User
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
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
                      className="btn btn-warning mx-3"
                      onClick = {() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousPageLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
      />
    </>
  );
};

export default TableUsers;
