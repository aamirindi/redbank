import Navbar from "./Navbar";
import "../../style/AllRequests.css";
import { getAuth } from "firebase/auth";
import { db } from "../../Firebase";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAnimation from "../../hooks/useAnimation";

export default function All_Requests() {
  const auth = getAuth();
  const [data, setData] = useState([]);
  const collRef = collection(db, "findDonors");
  useAnimation("animation");

  useEffect(() => {
    const getData = () => {
      onSnapshot(collRef, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    getData();
    // console.log(data);
  }, []);

  const deleteData = async (id) => {
    const data = doc(db, "findDonors", id);
    // console.log(id);
    const confirm = window.confirm(
      "Are you sure you want to delete your Profile?"
    );
    if (confirm) {
      await deleteDoc(data);
      toast.error("Your data was deleted :(", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // console.log(auth.currentUser.uid);
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
      <div className="all-requests-container">
        <div className="header animation slide_up">
          <h1>All Requests</h1>
        </div>

        <div className="cards animation slide_left">
          {data.map((data) => {
            return (
              <div className="cards__item" key={data.id}>
                <div className="card">
                  <div className="card__content">
                    <div className="card__title">
                      Blood Group : <span>{data.bloodgroup}</span>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <p className="card__text">
                      Name : <span>{data.name}</span>
                    </p>
                    <p className="card__text">
                      Phone Number : <span>{data.phonenumber}</span>
                    </p>
                    <p className="card__text">
                      Age : <span>{data.age}</span>
                    </p>
                    <p className="card__text">
                      Covid Recovered : <span>{data.recovered}</span>
                    </p>
                    {data.author.id === auth.currentUser.uid && (
                      <button
                        onClick={() => deleteData(data.id)}
                        className="btn-all-req">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
