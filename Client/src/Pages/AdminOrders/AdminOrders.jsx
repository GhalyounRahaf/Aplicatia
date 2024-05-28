import { useRef } from "react";
import OrdersPage from "../../Components/showOrders/showOrders.jsx";
import HandlePrint from "../../helpers/orderPDF.js";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./AdminOrders.css";

import { getAllOrdersApi } from "../../apis/apis.js";

const AdminOrders = () => {
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

export default AdminOrders;
