import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MainPage.css"; // Assuming you create a CSS file for styling

function MainPage() {
    const [data, setData] = useState({ dishes: [], orders: [] });

    useEffect(() => {
        axios.get("http://localhost:8081/")
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    const deleteOrder = (id) => {
        axios.delete(`http://localhost:8081/delete-order/${id}`)
            .then(() => setData((prev) => ({
                ...prev,
                orders: prev.orders.filter((order) => order.order_id !== id)
            })))
            .catch((err) => console.log(err));
    };

    const deleteDish = (id) => {
        axios.delete(`http://localhost:8081/delete-dish/${id}`)
            .then(() => setData((prev) => ({
                ...prev,
                dishes: prev.dishes.filter((dish) => dish.id !== id)
            })))
            .catch((err) => console.log(err));
    };

    return (
        <div className="main-page">
            <h1 className="main-title">Restaurant Management System</h1>
            {/* Orders Table */}
            <h3 className="section-title">Orders</h3>
            <Link to="/add-order" className="btn btn-primary mb-3">Add Order</Link>
            <div className="table-container">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Dish Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.customer_name}</td>
                                <td>{order.customer_phone}</td>
                                <td>{order.dish_name}</td>
                                <td>{order.quantity}</td>
                                <td>{order.total_price}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => deleteOrder(order.order_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Dishes Table */}
            <h3 className="section-title">Dishes</h3>
            <Link to="/add-dish" className="btn btn-primary mb-3">Add Dish</Link>
            <div className="table-container">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.dishes.map((dish) => (
                            <tr key={dish.id}>
                                <td>{dish.name}</td>
                                <td>{dish.price}</td>
                                <td>{dish.availability}</td>
                                <td>
                                    <Link to={`/update-dish/${dish.id}`} className="edit-btn">Edit</Link>
                                    <button className="delete-btn" onClick={() => deleteDish(dish.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MainPage;