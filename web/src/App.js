import "./App.css";
import getFirebase from "./fire-base";
import { useState } from "react";

function App() {
  let firebase = getFirebase();
  if (firebase) {
    console.log("looks like firebase loaded");
  }

  const [info, setInfo] = useState([]);

  // Start the fetch operation as soon as
  // the page loads
  window.addEventListener("load", () => {
    Fetchdata();
  });

  // Fetch the required data using the get() method
  const Fetchdata = () => {
    firebase
      .firestore()
      .collection("post")
      .limit(4)
      .orderBy("creation", "desc")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          // console.log(data);
          setInfo((arr) => [...arr, data]);
        });
      });
  };

  return (
    <div>
      <div className="hero">
        <div className="heroGroup">
          <h1>Clique'. An app for the real world. </h1>
          <p>
            Pabst man braid actually lumbersexual hoodie waistcoat cloud bread
            adaptogen master cleanse fixie activated charcoal before they sold
            out butcher.
          </p>
          <div className="logos">
            <img
              src={require("../src/images/1_xqT83bMEz92IBYxS9UQNow.png")}
              alt=""
              width="200"
            />
            <img
              src={require("../src/images/1_nZu0dsnlCQltPT1QMCHFAA.png")}
              alt=""
              width="200"
            />

            <video loop="true" autoplay="autoplay" muted>
              <source
                src={require("../src/images/my-video.mp4")}
                type="video/mp4"
              />
            </video>
          </div>
          <svg
            width="100%"
            height="172"
            viewBox="0 0 10% 172"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="white">
              <animate
                repeatCount="indefinite"
                fill="freeze"
                attributeName="d"
                dur="20s"
                values="M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z;
                
                M0 87.1596C316 87.1597 444 160 884 52.0001C1324 -55.9999 1320.29 34.966 1538 71.251C1814 117.251 2156 189.252 2560 87.1597V233.161L0 233.161V87.1596Z;

                M0 53.6584C158 11.0001 213 0 363 0C513 0 855.555 115.001 1154 115.001C1440 115.001 1626 -38.0004 2560 53.6585V199.66L0 199.66V53.6584Z;

                M0 25.9086C277 84.5821 433 65.736 720 25.9086C934.818 -3.9019 1214.06 -5.23669 1442 8.06597C2079 45.2421 2208 63.5007 2560 25.9088V171.91L0 171.91V25.9086Z
                "
              />
            </path>
          </svg>
        </div>
      </div>
      <div className="feedContainer">
        <div className="moveUp">
          {info.map((data) => (
            <Frame media={data.media[1]} />
          ))}
        </div>
      </div>

      <div className="feedContainer"></div>
    </div>
  );
}

const Frame = ({ media }) => {
  return (
    <>
      <img className="feedImages" src={media} alt="" />
    </>
  );
};

export default App;
