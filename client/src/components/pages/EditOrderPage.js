import React, { useState, useEffect } from "react";
import { getEditOrder } from "../functions/admin";

const EditOrderPage = () => {
  const [editUserDetails, setEditUserDetails] = useState([]);

  useEffect(() => {
    const fetchEditUser = async () => {
      try {
        const response = await getEditOrder(); // Fetch edit user details
        setEditUserDetails(response.data); // Set edit user details state
      } catch (error) {
        console.error("Error fetching edit user details:", error);
      }
    };

    fetchEditUser(); // Call the fetch function
  }, []);

  return (
    <div>
      <h2>Edit Order Details</h2>
      <ul>
        {editUserDetails.map((user, index) => (
          <li key={index}>
            แก้ไขโดย: {user.editOrderBy},แก้ไขคำสั่งซื้อสินค้า:
            {user.editOrderId} ,รายละเอียด:
            {user.editOrderDetail} แก้ไขตอน: {user.editedTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditOrderPage;
