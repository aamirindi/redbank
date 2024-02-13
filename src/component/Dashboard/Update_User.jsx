import Navbar from "../Dashboard/Navbar";
import "../../style/UpdateUser.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../Firebase";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import useAnimation from "../../hooks/useAnimation";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { ToastContainer, toast } from "react-toastify";

function Update_User() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({});
  const nav = useNavigate();

  const singleData = doc(db, "user", id);
  useAnimation("animation");

  useEffect(() => {
    const singleFetch = async () => {
      try {
        const docSnapshot = await getDoc(singleData);
        const fetchedData = docSnapshot.data();
        setData(fetchedData);
        setFormData(fetchedData);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    singleFetch();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "user", id), formData);
      // console.log("Document successfully updated!");
      toast.success("User Profile updated successfully :)", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setData(formData);
      closePopup();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(singleData);
      console.log("Document successfully deleted!");
      toast.error("User Profile deleted successfully :(", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      nav("/");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  let closePopup;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
      <div className="update-user-profile">
        <h1>User Profile</h1>
        <div className="user-data">
          <ul>
            <li>
              Name : <span>{data.name}</span>
            </li>
            <hr />
            <li>
              Phone No : <span>{data.phonenumber}</span>
            </li>
            <hr />
            <li>
              Gender : <span>{data.gender}</span>
            </li>
            <hr />
            <li>
              Dob : <span>{data.dob}</span>
            </li>
            <hr />
            <li>
              Blood Group : <span>{data.bloodgroup}</span>
            </li>
            <hr />
            <li>
              Covid Recovered : <span>{data.recovered}</span>
            </li>
          </ul>
        </div>
        <div className="edit-data">
          <Popup
            trigger={<button className="btn-edit"> Edit </button>}
            modal
            nested
            contentStyle={{
              width: "300px",
              maxWidth: "500px",
            }}>
            {(close) => {
              closePopup = close;
              return (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <h1 className="header"> Edit Details </h1>
                  <hr />
                  <br />
                  <div className="content-edit">
                    <form onSubmit={handleSubmit}>
                      <div className="input">
                        <input
                          type="text"
                          name="name"
                          placeholder={data.name}
                          value={formData.name || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <br />
                      <div className="input">
                        <input
                          type="number"
                          name="phonenumber"
                          placeholder={data.phonenumber}
                          value={formData.phonenumber || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <br />
                      <div className="input-dob">
                        <label htmlFor="dob" className="dob">
                          Date of birth :
                        </label>
                        <input
                          className="dob"
                          type="date"
                          name="dob"
                          id="dob"
                          value={formData.dob || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <br />

                      <div className="selection">
                        <label htmlFor="bloodgroup">Blood group : </label>
                        <select
                          name="bloodgroup"
                          id="bloodgroup"
                          value={formData.bloodgroup || ""}
                          onChange={handleInputChange}>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>
                      <br />
                      <div className="selection">
                        <label htmlFor="gender">Gender : </label>
                        <select
                          name="gender"
                          id="gender"
                          value={formData.gender || ""}
                          onChange={handleInputChange}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <br />
                      <div className="selection">
                        <label htmlFor="recovered">Covid Recovered : </label>
                        <select
                          name="recovered"
                          id="recovered"
                          value={formData.recovered || ""}
                          onChange={handleInputChange}>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <br />
                      <button className="button-edit" type="submit">
                        Edit
                      </button>
                    </form>
                  </div>
                </div>
              );
            }}
          </Popup>
          <Popup
            trigger={<button className="btn-delete"> Delete </button>}
            modal
            nested
            contentStyle={{
              width: "300px",
              maxWidth: "700px",
              backgroundColor: "white",
            }}>
            {(close) => {
              closePopup = close;
              return (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <h1 className="header"> Confirm Deletion </h1>
                  <hr />
                  <div className="content-edit">
                    <p>Are you sure you want to delete this document?</p>
                  </div>
                  <div className="actions">
                    <button className="button-delete" onClick={handleDelete}>
                      Yes, Delete
                    </button>
                  </div>
                </div>
              );
            }}
          </Popup>
        </div>
      </div>
    </>
  );
}

export default Update_User;
