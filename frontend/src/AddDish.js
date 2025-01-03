import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddDish.css"; // Assuming you create a CSS file for styling

function AddDish() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState("Yes");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/add-dish", { name, price, availability })
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
    };

    return (
        <div className="add-dish-page">
            <h1 className="add-dish-title">Add Dish</h1>
            <form className="add-dish-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Dish Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter dish name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-input"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Availability</label>
                    <select
                        className="form-select"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <button className="submit-btn" type="submit">Add Dish</button>
            </form>
        </div>
    );
}

export default AddDish;