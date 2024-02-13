import "../../style/FindDonors.css";
import { useState, useEffect } from "react";
import "../../style/Register.css";
import { getAuth } from "firebase/auth";
import { db } from "../../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAnimation from "../../hooks/useAnimation";

export default function Find_Donors() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  useAnimation("animation");
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    age: "",
    bloodgroup: "",
    author: { id: auth.currentUser?.uid, email: auth.currentUser?.email },
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formRef = collection(db, "findDonors");

  const submitHandler = async (e) => {
    e.preventDefault();
    await addDoc(formRef, formData);
    console.log("data submitted");
    toast.success("Form submitted successfully :)", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      navigate("/allrequests");
    }, 2000);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      // console.log(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    });
  }, [latitude, longitude]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <div className="main-find-donors animation slide_left">
        <form onSubmit={submitHandler} className="left">
          <div className="header">
            <h1>
              Become a <span>Blood</span> donor!
            </h1>
          </div>
          <div className="input-group">
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="input-group">
            <input
              value={formData.phonenumber}
              onChange={handleChange}
              type="number"
              name="phonenumber"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="input-group">
            <input
              value={formData.age}
              onChange={handleChange}
              type="number"
              name="age"
              placeholder="Age"
              required
            />
          </div>
          <div className="radio-group">
            <label>Select Blood Group:</label>
            <div className="duo">
              <div>
                <input
                  type="radio"
                  id="A+"
                  name="bloodgroup"
                  value="A+"
                  checked={formData.bloodgroup === "A+"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="A+">A+</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="A-"
                  name="bloodgroup"
                  value="A-"
                  checked={formData.bloodgroup === "A-"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="A-">A-</label>
              </div>
            </div>
            <div className="duo">
              <div>
                <input
                  type="radio"
                  id="B+"
                  name="bloodgroup"
                  value="B+"
                  checked={formData.bloodgroup === "B+"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="B+">B+</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="B-"
                  name="bloodgroup"
                  value="B-"
                  checked={formData.bloodgroup === "B-"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="B-">B-</label>
              </div>
            </div>
            <div className="duo">
              <div>
                <input
                  type="radio"
                  id="O+"
                  name="bloodgroup"
                  value="O+"
                  checked={formData.bloodgroup === "O+"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="O+">O+</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="O-"
                  name="bloodgroup"
                  value="O-"
                  checked={formData.bloodgroup === "O-"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="O-">O-</label>
              </div>
            </div>
            <div className="duo">
              <div>
                <input
                  type="radio"
                  id="AB+"
                  name="bloodgroup"
                  value="AB+"
                  checked={formData.bloodgroup === "AB+"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="AB+">AB+</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="AB-"
                  name="bloodgroup"
                  value="AB-"
                  checked={formData.bloodgroup === "AB-"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="AB-">AB-</label>
              </div>
            </div>
          </div>
          <div className="radio-group">
            <label>Covid Recovered? (for plasma donation)</label>
            <div>
              <input
                type="radio"
                id="YesRecovered"
                name="recovered"
                value="Yes"
                checked={formData.recovered === "Yes"}
                onChange={handleChange}
                required
              />
              <label htmlFor="YesRecovered">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="NoRecovered"
                name="recovered"
                value="No"
                checked={formData.recovered === "No"}
                onChange={handleChange}
                required
              />
              <label htmlFor="NoRecovered">No</label>
            </div>
          </div>
          <div className="button">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
