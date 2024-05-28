import { useRef } from "react";
import OrdersPage from "../../Components/showOrders/showOrders.jsx";
import HandlePrint from "../../helpers/orderPDF.js";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./userOrders.css";

import { getAllOrdersApi } from "../../apis/apis.js";

// const orders = [
//   {
//     order: {
      
//       id: 1111111111111111,
//       listBook: [
//         { title: "mustafa 1", quantity: 2, price: 50, created: "2023-05-19" },
//         { title: "mustafa 2", quantity: 1, price: 100, created: "2023-05-18" },
//         { title: "mustafa 3", quantity: 3, price: 30, created: "2023-05-17" },
        
//       ],
//       orderdAt: "2023-05-17",
//       totalPrice: 180,
//     },
//   },


//   {
//     order: {
//       id: 1111111111111111,
//       listBook: [
//         { title: "hatem 1", quantity: 2, price: 50, created: "2023-05-19" },
//         { title: "hatem 2", quantity: 1, price: 100, created: "2023-05-18" },
//         { title: "hatem 3", quantity: 3, price: 30, created: "2023-05-17" },
//       ],
//       orderdAt: "2023-05-17",
//       totalPrice: 180,
//     },
//   },
//   {
//     order: {
//       id: 222222222222222,
//       listBook: [
//         { title: "ahmed 1", quantity: 2, price: 100, created: "2023-05-12" },
//         { title: "ahmed 2", quantity: 1, price: 100, created: "2023-05-1" },
//         { title: "ahmed 3", quantity: 3, price: 30, created: "2023-06-17" },
//       ],
//       orderdAt: "2023-05-17",
//       totalPrice: 230,
//     },
//   },
// ];
const UserOrders = () => {
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

  const componentRef = useRef();
  const buttonRef = useRef();
  useEffect(() => {
      getAllOrdersApi({start:'', end:''}).then(res=> {
        const data = res;
        // console.log(data.data.data.orders);
        const jsonData = data.data.data.orders;
        console.log(jsonData);
        if (!loginState) {
          navigate("/login");
        } else {
          setOrders(jsonData);
        }
        }).catch(e => {
        console.log(e);
    });
  },[])

  const handlePrint = HandlePrint(componentRef, buttonRef);
// console.log(orders);
  return (
    <div className="user-order" ref={componentRef}>
      <button ref={buttonRef} className="pdf-btn mt-3" onClick={handlePrint}>
        PDF
      </button>
      {orders.map((order) => (
        // eslint-disable-next-line react/jsx-key
        <OrdersPage order={order} ref={componentRef} />
      ))}
    </div>
  );
};

export default UserOrders;
