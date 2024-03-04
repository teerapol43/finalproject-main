import React, { useState, useEffect } from "react";
import {
  getUserCart,
  saveOrder,
  emptyCart,
  listAddress,
  editAddress,
  removeAddress,
} from "../functions/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SlipUpload from "./SlipUpload";
import QRCode from "qrcode.react";
import styled from "styled-components";
import { useParams, useNavigate, Link } from "react-router-dom";
const Checkout = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState("");
  const [sliptFile, setSliptFile] = useState(null);
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

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getUserCart(user.user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, [user.user.token]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await listAddress(user.user.token, user.user.user_id);
        const responseData = res.data;

        if (Array.isArray(responseData)) {
          setAddresses(responseData);
        } else {
          console.error("Invalid response format. Expected an array.");
          setError("Error fetching addresses. Please try again.");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError("Error fetching addresses. Please try again.");
        setLoading(false);
      }
    };

    loadData();
  }, [user.user.token, user.user.user_id]);

  const handleAddressSelect = (selectedAddress) => {
    setValues(selectedAddress);
    setSelectedAddress(selectedAddress);
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      fulladdress: {
        ...values.fulladdress,
        [e.target.name]: e.target.value,
      },
    });
  };
  console.log("address", selectedAddress);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    editAddress(user.user.token, selectedAddress._id, values)
      .then((res) => {
        console.log("edit", res);
        toast.success("อัปเดตสินค้าเรียบร้อยแล้ว");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("ไม่สามารถอัปเดตสินค้าได้");
        setLoading(false);
      });
  };

  const handleRemoveAddress = async (id) => {
    try {
      if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้?")) {
        removeAddress(user.user.token, id)
          .then((res) => {
            console.log(res);
            toast.success("ลบที่อยู่เรียบร้อยแล้ว");
          })
          .catch((err) => {
            console.log(err);
            toast.error("เกิดข้อผิดพลาดในการลบที่อยู่");
          });
      }
    } catch (error) {
      console.error("Error removing address:", error);
      toast.error("เกิดข้อผิดพลาดในการลบที่อยู่");
    }
  };

  const onNext = async (e) => {
    e.preventDefault();

    if (page === 0) {
      setPage(page + 1);
    } else {
      try {
        await saveOrder(user.user.token, {
          selectedAddress,
          products,
        }).then((res) => {
          console.log(res.data);
        });
        emptyCart(user.user.token);
        dispatch({
          type: "addToCart",
          payload: [],
        });

        toast.success("Save Order Success");
        /* navigate("/user/history"); */
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("Error during checkout. Please try again.");
      }
    }
  };

  const generatePayload = require("promptpay-qr");
  const Title = styled.h1`
    font-size: 3em;
    text-align: center;
    color: palevioletred;
    margin-bottom: 20px;
  `;

  const Container = styled.div`
    max-height: 100vh;
    padding: 4em;
    background: papayawhip;
  `;

  const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `;

  const QRWrapper = styled.div`
    margin: auto;
    text-align: center;
    padding: 20px;
    background-color: white;
    border: 2px solid palevioletred;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  `;

  const InputWrapper = styled.div`
    margin: auto;
    text-align: center;
    padding: 20px;
  `;

  const [qrCode, setQRCode] = useState("");
  const [promptpay, setPromptPay] = useState("062-671-8672");

  useEffect(() => {
    handleQR();
  }, [total]);

  function handleQR() {
    setQRCode(generatePayload(promptpay, { total: total.toFixed(2) }));
  }

  return (
    <div className="container-fluid">
      <div className="row" style={{ margin: "50px" }}>
        <div className="col-md-6">
          <div className="checkout-container">
            <div className="checkout-section">
              <div className="checkout-content">
                <div className="checkout-header">
                  <div className={`header-tab ${page === 0 ? "active" : ""}`}>
                    กรอกที่อยู่
                  </div>
                  <div className={`header-tab ${page === 1 ? "active" : ""}`}>
                    ชำระค่าสินค้า
                  </div>
                </div>
                {error && <div className="error-message">{error}</div>}
                {page === 0 ? (
                  <>
                    {addresses.length === 0 && (
                      <button>
                        <Link to="/user/address" state="/checkout">
                          Create Address
                        </Link>
                      </button>
                    )}
                    <ul>
                      {addresses.slice(0, 3).map((address) => (
                        <li
                          key={address._id}
                          onClick={() => handleAddressSelect(address)}
                          style={{
                            border:
                              selectedAddress === address
                                ? "2px solid blue"
                                : "none",
                            padding: "5px",
                            margin: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {`${address.fulladdress.houseNumber}, ${address.fulladdress.subdistrict}, ${address.fulladdress.district}, ${address.fulladdress.province}, ${address.fulladdress.zipcode}, ${address.name}, ${address.phoneNumber}`}

                          <button
                            onClick={() => handleRemoveAddress(address._id)}
                            style={{ marginLeft: "10px" }}
                          >
                            Remove Address
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="payment-section">
                    <Container>
                      <Title>ชำระเงินที่นี้</Title>
                      <FlexContainer>
                        <QRWrapper>
                          <QRCode value={qrCode} />
                          <InputWrapper>
                            <p>ชื่อบัญชี อาทิตยา ฆารเลิศ</p>
                            <p>
                              โปรดตรวจสอบจำนวนเงินให้ถูกต้องก่อนทำรายการ
                              จำนวนเงิน {total} บาท
                            </p>
                          </InputWrapper>
                        </QRWrapper>
                      </FlexContainer>
                    </Container>
                    <p id="image-preview"></p>
                    <div className="upload-slip-section">
                      <label htmlFor="slipt" className="upload-slip-btn">
                        {sliptFile ? (
                          <span className="image-preview" />
                        ) : (
                          <div className="upload-slip-text">
                            อัพโหลดสลิป
                            <SlipUpload
                              values={values}
                              setValues={setValues}
                              loading={loading}
                              setLoading={setLoading}
                            />
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-6"
          style={{ marginTop: "35px", fontSize: "20px" }}
        >
          <h4>ข้อมูลสินค้าทั้งหมด</h4>
          <hr />
          <p>จำนวนสินค้า: {products.length} ชิ้น</p>
          <hr />
          <p>รายการสินค้า</p>
          {products.map((item, i) => (
            <div key={i}>
              <p>
                {item.name} x {item.count} = {item.price * item.count}
              </p>
            </div>
          ))}
          <hr />
          ราคาสุทธิ: <b>{total}</b> บาท
          <br />
          <div className="payment-button" onClick={onNext}>
            ชำระเงิน
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
