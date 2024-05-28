// src/components/OrdersPage.js

import React, { useState } from "react";
import ReactToPrint from "react-to-print";
import "./chowOrders.css";

const OrdersPage = ({order}) => {
    console.log(order);

    // console.log(order.order.id);
    // console.log("sssssssssssssssssssssss"+order.order['order_items'][0].book.title);
    // console.log(order.order.quantity);
    // console.log(order.order.id);

//     const [filterDate, setFilterDate] = useState("");

//     const handleFilterChange = (e) => {
//       setFilterDate(e.target.value);
//     };
//     const filteredOrders = ;
//     order.filter((order) => {
//   if (!filterDate) return true;
//   return order.orderdAt.includes(filterDate);
//     });

  return (
    <div
      className="orders-page"
      // ref={ref}
    >
      <div className="table-container">
        <h5 className="order-id">Order Number: {order.id} </h5>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {order['order_items'].map((item, index) => (
              <tr key={index}>
                <td data-label="Title">{item.book?.title}</td>
                <td data-label="Quantity">{item.quantity}</td>
                <td data-label="Price">{item.book?.price}</td>
                <td data-label="Total Price">{item.quantity * item.book?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5 className="order-total-price">
          Total Order Price: <span> {order.total}$</span>
        </h5>
      </div>

      {/* <div className="print-button-container">
        <ReactToPrint
          trigger={() => (
            <button className="print-button">Print this out!</button>
          )}
          //   content={() => ref.current}
        />
      </div> */}
    </div>
  );
};

export default OrdersPage;
