import React, { useState, useEffect } from "react";
import { getEditProduct } from "../functions/admin";

const EditProductPage = () => {
  const [editUserDetails, setEditUserDetails] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchEditUser = async () => {
      try {
        const response = await getEditProduct(); // Fetch edit user details
        console.log("values", response.data);
        setEditUserDetails(response.data); // Set edit user details state
      } catch (error) {
        console.error("Error fetching edit user details:", error);
      }
    };

    fetchEditUser(); // Call the fetch function
  }, []);

  return (
    <div>
      <h2>Edit User Details</h2>
      <ul>
        {editUserDetails.map((user, index) => (
          <li key={index}>
            แก้ไขโดย: {user.editproductById},แก้ไขลินค้า: {user.editProductId}{" "}
            ,รายละเอียด:
            {user.editproductDetail} แก้ไขเมื่อ: {user.editedTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditProductPage;
