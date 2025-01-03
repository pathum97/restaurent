import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddOrder.css"; // Assuming a CSS file for consistent styling

function AddOrder() {
    const [dishes, setDishes] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [dishId, setDishId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8081/")
            .then((res) => setDishes(res.data.dishes))
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedDish = dishes.find((dish) => dish.id === parseInt(dishId));
        const total = selectedDish ? selectedDish.price * quantity : 0;

        axios.post("http://localhost:8081/add-order", {
            customer_name: customerName,
            customer_phone: customerPhone,
            dish_id: dishId,
            quantity,
            total_price: total,
        })
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
    };

    return (
        <div className="add-order-page">
            <h1 className="page-title">Add Order</h1>
            <form className="order-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Customer Name</label>
                    <input
                        type="text"
                        className="form-input"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Customer Phone</label>
                    <input
                        type="text"
                        className="form-input"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Select Dish</label>
                    <select
                        className="form-select"
                        value={dishId}
                        onChange={(e) => setDishId(e.target.value)}
                        required
                    >
                        <option value="">Select a Dish</option>
                        {dishes.map((dish) => (
                            <option key={dish.id} value={dish.id}>
                                {dish.name} - ${dish.price}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input
                        type="number"
                        className="form-input"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Add Order</button>
            </form>
        </div>
    );
}

export default AddOrder;