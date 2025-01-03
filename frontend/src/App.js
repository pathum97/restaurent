import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import AddDish from "./AddDish";
import UpdateDish from "./UpdateDish";
import AddOrder from "./AddOrder";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/add-dish" element={<AddDish />} />
                <Route path="/update-dish/:id" element={<UpdateDish />} />
                <Route path="/add-order" element={<AddOrder />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
