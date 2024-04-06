import React, { useEffect, useRef, Suspense } from "react";
//import emailjs from "@emailjs/browser";
// component imports
import { Model } from "./Protector11"
import { StarSpheres } from "./StarSpheres";

// drei imports
import { OrbitControls } from "@react-three/drei";

// fiber imports
import { Canvas } from "@react-three/fiber";

// gsap import(s)
import gsap from "gsap";

// styles imports
import "./index.css";

// three imports
import * as THREE from "three";
import { Group } from "three";
//import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  loggedIn: boolean;
}

const CanvasPage: React.FC<Props> = ({ title, loggedIn }) => {
  const APProtectorRef = useRef<Group>(null!);

  const starSpheresRef = useRef<Group>(null!);

  const starsRef = useRef<THREE.Points>(null!);

  //const navigate = useNavigate();

  const material_3 = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x0000ff),
    transparent: true,
    emissive: 0x09e0fe,
    emissiveIntensity: 2,
  });
  const material_red = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xff0000),
    transparent: true,
    emissive: 0xff0000,
    emissiveIntensity: 2,
  });
  const material_black = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x000000),
    transparent: true,
    emissive: 0x000000,
    emissiveIntensity: 2,
  });

  const showIntroContent = (index: number) => {
    if (index == 0) {
      gsap.to("#intro", {
        zIndex: 1, // Bring the #intro div to the front
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      });
      gsap.to(".penultimate-content", {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      });
    } else if (index == 1) {
      gsap.to("#work", {
        zIndex: 1, // Bring the #work div to the front
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      });
      gsap.to(".penultimate-content", {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      });
    } else if (index == 2) {
      gsap.to("#simulations", {
        zIndex: 1, // Bring the #work div to the front
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      });
      gsap.to(".penultimate-content", {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      });
    } else if (index == 3) {
      gsap.to("#about", {
        zIndex: 1, // Bring the #work div to the front
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      });
      gsap.to(".penultimate-content", {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      });
    } else if (index == 4) {
      gsap.to("#contact", {
        zIndex: 1, // Bring the #work div to the front
        opacity: 1,
        duration: 0.1,
        ease: "power2.inOut",
      });
      gsap.to(".penultimate-content", {
        opacity: 0,
        duration: 0.1,
        ease: "power2.inOut",
      });
    }
  };

  const hideIntroContent = () => {
    gsap.to("#intro, #work, #simulations, #about, #contact", {
      zIndex: -5, // Bring the #intro div to the front
      opacity: 0,
      duration: 0.1,
      ease: "power2.inOut",
    });
    gsap.to(".penultimate-content", {
      opacity: 1,
      duration: 0.1,
      ease: "power2.inOut",
    });
  };
  const handleClick = (index: number) => {
    switch (index) {
      case 0:
        showIntroContent(index);
        break;
      case 1:
        showIntroContent(index);
        break;
      case 2:
        showIntroContent(index);
        break;
      case 3:
        showIntroContent(index);
        break;
      case 4:
        showIntroContent(index);
        break;
      // Add more cases for other sections as needed
      default:
        break;
    }
  };

  const handleClickHide = () => {
    hideIntroContent();
  };

  useEffect(() => {
    const timer = (ms: number | undefined) =>
      new Promise((res) => setTimeout(res, ms));

    async function load() {
      gsap.to(APProtectorRef.current.position, {
        z: -1000,
        duration: 1,
        delay: 0,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            gsap.to(".penultimate-content", {
              opacity: 1,
              duration: 2,
              // onComplete: () => {
              //   gsap.to(".penultimate-content", {
              //     transform: " rotateX(90deg)",
              //     duration: 1,
              //     onComplete: () => {
              //       gsap.to(".penultimate-content", {
              //         transform: " rotateX(-90deg)",
              //         duration: 1,
              //       });
              //     },
              //   });
              // },
            });
          }, 3000);
        },
      });
    }
    async function stars_expand() {
      if (APProtectorRef.current) {
        
        
        const children = APProtectorRef.current.children[0].children;
        const filteredChildren = children.filter(
          (child) =>
            child.name.startsWith("RRE") ||
            child.name.startsWith("LRE") ||
            child.name.startsWith("RFE") ||
            child.name.startsWith("LFE") ||
            child.name.startsWith("tail")
        );

        

        await Promise.all(
          
          filteredChildren.map((child) => {
            return new Promise<void>((resolve) => {
              (child as THREE.Mesh).material = material_3;
              console.log(APProtectorRef.current);
              resolve();
            });
          })
        );

        setTimeout(() => {
          load();
        }, 300);
      }
      //
      //
      //
      //
      //
      //
      //
      //
      //

      if (starsRef.current) {
        const stars = starsRef.current;
        for (let i = 0; i < stars.children.length; i++) {
          const star = stars.children[i] as THREE.Points;

          // Convert the THREE.Points object to THREE.LineSegments
          const geometry = new THREE.BufferGeometry();
          const positionAttribute = star.geometry.getAttribute(
            "position"
          ) as THREE.BufferAttribute;
          const positions = positionAttribute.array as Float32Array;
          geometry.setAttribute("position", positionAttribute.clone());
          const indices = [];
          for (let j = 0; j < positions.length; j += 3) {
            indices.push(j, j + 1); // Add two indices for each vertex to create lines
          }
          geometry.setIndex(indices);
          const material = new THREE.LineBasicMaterial({
            color: "white",
          });
          const line = new THREE.LineSegments(geometry, material);

          // Position the line segments relative to the camera

          const distance = star.position.distanceTo(
            APProtectorRef.current.position
          );
          line.position.copy(star.position);
          let scale_setter = 0.2;
          line.scale.set(
            distance / scale_setter,
            distance / scale_setter,
            distance / scale_setter
          ); // Adjust the scale to change the length of the lines

          // Replace the star object with the line segments object
          stars.remove(star);
          stars.add(line);
        }
      }

      //
      //
      //
      //
      //
      //
      //
      //

      if (starSpheresRef.current) {
        const lines = starSpheresRef.current.children as THREE.Line[];

        // Iterate over all lines
        for (const line of lines) {
          gsap.to(line.position, {
            z: 2000,
            duration: 10,
          });

          // Cast the position attribute to a BufferAttribute
          const positionAttribute = line.geometry.getAttribute(
            "position"
          ) as THREE.BufferAttribute;

          // Get a reference to the position attribute array
          const positions = positionAttribute.array as Float32Array;

          // Modify the positions array
          for (let i = 0; i < positions.length; i += 3) {
            const z = positions[i + 2]; // Get the current z-coordinate of the vertex

            // Only modify the z-coordinate if it's within the negative z-range
            if (z < -500) {
              positions[i + 5] *= 3; // Modify the z-coordinate of each vertex
            }
            // Otherwfnavigateise, move the vertex towards positive z
            else {
              positions[i + 5] += 3000; // Modify the z-coordinate of each vertex
            }
          }

          // Update the position attribute with the modified array
          positionAttribute.needsUpdate = true;
        }
      }
    }

    //
    //
    //
    //
    //
    //

    async function Model_down() {
      if (APProtectorRef.current) {
        const children = APProtectorRef.current.children[0].children;
        const filteredChildren = children.filter((child) =>
          child.name.startsWith("tail")
        );

        for (let i = 0; i < filteredChildren.length; i++) {
          const child = filteredChildren[i] as THREE.Mesh;
          const materialArray = [material_red, material_black];

          const material = child.material as THREE.MeshStandardMaterial; // set the material to a variable

          gsap.fromTo(
            material.color,
            { r: 1, g: 0, b: 0 },
            {
              r: 0,
              g: 0,
              b: 0,
              duration: 0.3,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            }
          );
        }
      }

      gsap.to(APProtectorRef.current.position, {
        y: -1,
        z: -1.5,
        duration: 5,
        delay: 0,
        ease: "power2.inOut",
        onComplete: () => {
          setTimeout(() => {
            stars_expand();
          }, 1000);
        },
      });
    }

    //
    ///
    //
    //
    //

    setTimeout(() => {
      Model_down();
    }, 5000);
  }, []);

  const lightRef2 = useRef<THREE.SpotLight>(null);

  return (
    <div>
      <div className="CcanvasDiv">
        <Canvas>
          <Suspense fallback={null}>
            <spotLight
              position={[0, 10, 10]}
              angle={0.15}
              penumbra={1}
              ref={lightRef2}
            />

            <group ref={starSpheresRef}>
              <StarSpheres />
            </group>
            <pointLight position={[0, 10, 10]} />
            <OrbitControls />

            <group ref={APProtectorRef} position={[0, 7, 0]}>
              <Model />
            </group>
          </Suspense>
        </Canvas>
      </div>
      <div className="penultimate-content">
        MC Software Solutions - for all your secure-software,
        distributed-application programming needs
        <div className="navDiv">
          <nav>
            <ul>
              <li>
                <a onClick={() => handleClick(0)} href="#intro">
                  Intro
                </a>
              </li>
              <li>
                <a onClick={() => handleClick(1)} href="#work">
                  Work
                </a>
              </li>
              <li>
                <a onClick={() => handleClick(2)} href="#simulations">
                  Simulations
                </a>
              </li>
              <li>
                <a onClick={() => handleClick(3)} href="#about">
                  About
                </a>
              </li>
              <li>
                <a onClick={() => handleClick(4)} href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <article id="intro">
        <div className="close_X">
          <a href="#" onClick={handleClickHide}>
            {" "}
            <h4> X </h4>
          </a>
        </div>
        <header>Intro</header>
        <p>
          Bespoke software solutions provider/software architecture consultancy
          for the corporate sector. Builder of quality, redundant, scalable,
          flexible systems (specialising in microservices architectures).
        </p>
        <p>
          Specialties: Sports betting and financial trading solutions,
          distributed applications development, inter-process messaging,
          third-party API integration, high-level architectural design,
          large-scale statistical analysis, .NET development. Check out a sample
          of our <a href="#work">work</a>.
        </p>
        <p>
          Roles: Applications/solutions/systems architect, technical team lead,
          data modeller, data migration specialist, principal software engineer.
        </p>
      </article>
      <article id="work">
        <div className="close_X">
          <a href="#" onClick={handleClickHide}>
            {" "}
            <h4> X </h4>
          </a>
        </div>
        <header>Work</header>
        <p>
          Responsible for the architecture, design, development, deployment, and
          support of a distributed automated low-latency exchange horse racing
          trading system implementing a real-time trading algorithm based on
          runner probabilities. This system covered the three main sports
          betting exchanges: Betfair, Betdaq, and Matchbook. This was a solo
          effort, from start to finish, and I built the system from concept
          through to deployment and support, based on the same framework as
          previous sports betting systems. At peak, turnover through the system
          was around $200M per year.
        </p>
        <p>
          Responsible for the architecture, design, development, deployment, and
          support of a distributed automated sports betting system. Working on
          the system on a full-time basis, the system was essentially
          &quot;built from scratch&quot; for one of the biggest syndicates in
          the Australian sports betting market, employing over 10 full-time
          staff, with an annual turnover more than $100M. My role included full
          control over the software architecture and data model, leading the
          development team, managing ongoing deployment of the live system and
          associated updates, and supporting the system 24 hours per day, 365
          days per year. The system comprised over 50 inter-connected
          message-based applications, a 500 GB database with billions of
          records, and pushed out over a million message-based data updates
          daily to multiple client applications.
        </p>
        <p>
          Re-architected/re-designed an alarm monitoring system that (still)
          monitors all branches and ATMs for one of Australia's major financial
          institutions. The initial system was deployed in 2006, with a major
          upgrade in 2007, and again in 2010 to migrate from a Windows-based GUI
          to a web-based GUI. The system comprises multiple logical and physical
          tiers, connected through a message-based framework implemented over
          TCP. System reliability is such that no server application has needed
          a restart since the last update 3 years ago, apart from that required
          due to infrastructure maintenance.
        </p>
      </article>
      <article id="simulations">
        <div className="close_X">
          <a href="#" onClick={handleClickHide}>
            {" "}
            <h4> X </h4>
          </a>
        </div>
        <header>Simulations</header>
        <p>
          How quickly can you simulate a tennis match by assigning each player a
          "known" winning serve percentage?
        </p>
        <p>
          Well, if you try really hard, and use lookups and cram everything into
          the L1 cache, pretty darn fast!
        </p>
        <p>
          I developed code that averages around 12 clock cycles per point
          (around 3 nanoseconds), and I performed 30 trillion (that's
          30,000,000,000,000) match simulations, in a week, for differing
          winning serve percentages and differing "starting scores" for a
          standard 3-set match decided by a first-to-7 point tiebreaker (on a
          hosted server I run).
        </p>
      </article>
      <article id="about">
        <div className="close_X">
          <a href="#" onClick={handleClickHide}>
            {" "}
            <h4> X </h4>
          </a>
        </div>
        <header>About</header>
        <p>
          MC Software Solutions is run by Misha Charrett. Misha has more than 30
          years' experience as a quality software engineer building complex
          systems with high reliability. Specialising in message-based,
          distributed, multi-threaded applications (built using a microservices
          architectural framework), Misha has an exceptional ability to distil
          complex multi-faceted problems down to simpler component-based
          solutions.
        </p>
      </article>
      <article id="contact">
        <div className="close_X">
          <a href="#" onClick={handleClickHide}>
            {" "}
            <h4> X </h4>
          </a>
        </div>
        <header>Contact</header>
        <form method="get" action="test.aspx">
          <div className="field half first">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field half">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message"></textarea>
          </div>
          <ul className="actions">
            <li>
              <input type="submit" value="Send Message" className="special" />
            </li>
            <li>
              <input type="reset" value="Reset" />
            </li>
          </ul>
        </form>
        <ul className="icons">
          <li>
            <a
              href="https://twitter.com/misha_mcss"
              className="icon fa-twitter"
            >
              <span className="label">Twitter</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/misha.mcss"
              className="icon fa-facebook"
            >
              <span className="label">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/mishacharrett/"
              className="icon fa-linkedin"
            >
              <span className="label">LinkedIn</span>
            </a>
          </li>
        </ul>
      </article>
    </div>
  );
};

export default CanvasPage;
