import { useState, useLayoutEffect, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { gsap } from "gsap";
import CanvasPage from "./CanvasPage";

function App() {
  const [showNewContent, setShowNewContent] = useState(false);

  useLayoutEffect(() => {
    gsap.to(".App", {
      duration: 4,
      opacity: 0,
      onComplete: () => {
        setShowNewContent(true);
      },
    });
  }, []);

  useEffect(() => {
    if (showNewContent) {
      gsap.to(".new-content", {
        opacity: 1,
        duration: 4,

        onComplete: () => {
          gsap.to(".page-content", {
            opacity: 1,
            duration: 2,
            onComplete: () => {
              gsap.to(".new-content", {
                opacity: 0,
                duration: 4,
              });
            },
          });
        },
      });
    }
  }, [showNewContent]);

  return (
    <>
      {!showNewContent && (
        <div className="App">
          <h1>MC Software Solutions</h1>
        </div>
      )}
      {showNewContent && (
        <div className="new-content">
          <h1>Get things moving</h1>
        </div>
      )}
      {showNewContent && (
        <div className="page-content">
          <CanvasPage title={""} loggedIn={false} />
        </div>
      )}
    </>
  );
}

export default App;
