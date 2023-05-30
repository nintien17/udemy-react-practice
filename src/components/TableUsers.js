import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";


const TableUsers = (props) => {
  const [listUsers, setlistUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  };

  const handleUpdateTable = (user) =>{
    setlistUsers([user,...listUsers]);
  }

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
    </>
  );
};

export default TableUsers;
