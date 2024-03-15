import React, { useState, useEffect } from "react";
import { getEditUser } from "../functions/admin";

const EditUserPage = () => {
  const [editUserDetails, setEditUserDetails] = useState([]);

  useEffect(() => {
    const fetchEditUser = async () => {
      try {
        const response = await getEditUser(); // Fetch edit user details
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
            แก้ไขโดย: {user.editUserBy},แก้ไขผู้ใช้งาน: {user.editUser}{" "}
            ,รายละเอียด:
            {user.editUserDetail} แก้ไขตอน: {user.editedTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditUserPage;
