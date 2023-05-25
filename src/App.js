import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { Container, Row } from "react-bootstrap";
function App() {
  return (
    <div className="app-container">
   
          <Header/>
          <TableUsers/>
    </div>
  );
}

export default App;
