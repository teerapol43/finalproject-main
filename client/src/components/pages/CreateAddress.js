import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createAddress } from "../functions/user";
import { useNavigate, useLocation } from "react-router-dom";

const CreateAddress = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const location = useLocation();
  console.log("lo", location);
  const [values, setValues] = useState({
    fulladdress: {
      houseNumber: "",
      subdistrict: "",
      district: "",
      province: "",
      zipcode: "",
    },
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
    let intended = location.state;
    e.preventDefault();

    try {
      await createAddress(user.user.token, user.user.user_id, values);
      if (intended) {
        navigate("../" + intended);
      } else {
        // Navigate to the editAddress page after successful form submission
        navigate("/user/address/editAddress");
      }
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
