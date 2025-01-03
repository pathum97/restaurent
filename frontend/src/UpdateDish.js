import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateDish.css"; // Import the CSS file

function UpdateDish() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dish, setDish] = useState({ name: "", price: "", availability: "Yes" });

    useEffect(() => {
        axios.get("http://localhost:8081/")
            .then((res) => {
                const foundDish = res.data.dishes.find((d) => d.id === parseInt(id));
                setDish(foundDish || { name: "", price: "", availability: "Yes" });
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/update-dish/${id}`, dish)
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
    };

    return (
        <div className="update-dish-container">
            <h3>Update Dish</h3>
            <form onSubmit={handleSubmit} className="update-dish-form">
                <div className="form-group">
                    <label>Dish Name</label>
                    <input
                        type="text"
                        value={dish.name}
                        onChange={(e) => setDish({ ...dish, name: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        value={dish.price}
                        onChange={(e) => setDish({ ...dish, price: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Availability</label>
                    <select
                        value={dish.availability}
                        onChange={(e) => setDish({ ...dish, availability: e.target.value })}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Update Dish</button>
            </form>
        </div>
    );
}

export default UpdateDish;
