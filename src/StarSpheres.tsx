import React, { useRef } from "react";
import * as THREE from "three";

import { LineProps } from "@react-three/drei";
import { BufferGeometry } from "three";

type CustomLineProps = LineProps & {
  position?: THREE.Vector3;
};

type ExtendedLine = THREE.Line<
  BufferGeometry,
  THREE.Material | THREE.Material[]
> &
  CustomLineProps;

export const StarSpheres = () => {
  const linesRef = useRef<ExtendedLine[]>([]);

  const linePoints = [];
  const numStars = 5000; // Set the number of stars here

  // Create an array of 5,000 random positions for the stars
  for (let i = 0; i < numStars; i++) {
    const x = Math.random() * 1000 - 500;
    const y = Math.random() * 1000 - 500;
    const z = Math.random() * 1000 - 500;
    const a = new THREE.Vector3(x, y, z);

    // Set the direction of the star by adding a random vector to its position
    const b = new THREE.Vector3(
      x + Math.random(),
      y + Math.random(),
      z + Math.random()
    );

    const points = [];
    points.push(a.x, a.y, a.z);
    points.push(b.x, b.y, b.z);

    const positions = new Float32Array(points);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    linePoints.push(geometry);
  }

  return (
    <>
      {linePoints.map((geometry, index) => (
        <line
          key={index}
          ref={(ref) => {
            if (ref) {
              linesRef.current[index] = ref as unknown as ExtendedLine;
            }
          }}
        >
          <bufferGeometry {...geometry} />
          <lineBasicMaterial color={"white"} linewidth={1} />
        </line>
      ))}
    </>
  );
};

export default StarSpheres;
