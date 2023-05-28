import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import ModalAddNew from "./components/ModalAddNew";
import TableUsers from "./components/TableUsers";
import { Container } from "react-bootstrap";


function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  }

  return (
    <div className="app-container">
          <Header/>
          <Container>
            <div className="my-3 d-flex justify-content-between"> 
              <span><b>List Users:</b></span>
              <button className="btn btn-success" onClick={()=> setIsShowModalAddNew(true)}>Add User</button>
            </div>
            <TableUsers/>
          </Container>
          <ModalAddNew
            show={isShowModalAddNew}
            handleClose={handleClose}
          />    
    </div>
  );
}

export default App;
