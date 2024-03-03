// src/components/CreateAddress.js
import React, { useState } from "react";
import axios from "axios";
import { createAddress } from "../functions/user";
import { useSelector } from "react-redux";

const CreateAddress = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState({
    fulladdress: [
      {
        houseNumber: "",
        subdistrict: "",
        district: "",
        province: "",
        zipcode: "",
      },
    ],
    name: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      fulladdress: {
        ...prevValues.fulladdress,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAddress(user.user.token, user.user.user_id, values);
      console.log(user.user.user_id);
      console.log("Address created successfully:");
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error("Error creating address:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Create Address</h2>
      <form onSubmit={handleSubmit}>
        <label>
          House Number:
          <input
            type="text"
            name="houseNumber"
            value={values.fulladdress.houseNumber}
            onChange={handleNestedChange}
          />
        </label>
        <br />
        <label>
          Subdistrict:
          <input
            type="text"
            name="subdistrict"
            value={values.fulladdress.subdistrict}
            onChange={handleNestedChange}
          />
        </label>
        <br />
        <label>
          District:
          <input
            type="text"
            name="district"
            value={values.fulladdress.district}
            onChange={handleNestedChange}
          />
        </label>
        <br />
        <label>
          Province:
          <input
            type="text"
            name="province"
            value={values.fulladdress.province}
            onChange={handleNestedChange}
          />
        </label>
        <br />
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={values.fulladdress.zipcode}
            onChange={handleNestedChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        {/* Other input fields... */}
        <br />
        <button type="submit">Create Address</button>
      </form>
    </div>
  );
};

export default CreateAddress;
