"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A wireframe lattice/truss — the same drafting vocabulary as the About
 * section's blueprint SVG, extended into 3D. Deliberately built from plain
 * edge geometry (no materials beyond a single LineBasicMaterial) so it's
 * cheap to render even on integrated GPUs.
 */
function TrussStructure() {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const cols = 5;
    const rows = 4;
    const spacing = 1.1;
    const points: THREE.Vector3[] = [];

    // Build a grid of nodes, then connect horizontal, vertical, and
    // diagonal edges — classic truss bracing pattern.
    const nodeAt = (x: number, y: number) =>
      new THREE.Vector3(
        (x - (cols - 1) / 2) * spacing,
        (y - (rows - 1) / 2) * spacing,
        0
      );

    const edges: [THREE.Vector3, THREE.Vector3][] = [];

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const a = nodeAt(x, y);
        if (x < cols - 1) edges.push([a, nodeAt(x + 1, y)]); // horizontal
        if (y < rows - 1) edges.push([a, nodeAt(x, y + 1)]); // vertical
        if (x < cols - 1 && y < rows - 1) {
          // diagonal bracing, alternating direction per cell for a truss look
          if ((x + y) % 2 === 0) {
            edges.push([a, nodeAt(x + 1, y + 1)]);
          } else {
            edges.push([nodeAt(x + 1, y), nodeAt(x, y + 1)]);
          }
        }
      }
    }

    edges.forEach(([a, b]) => points.push(a, b));

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#E8A33D" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}

export function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <group rotation={[0.3, 0.5, 0]} position={[0, 0, 0]}>
        <TrussStructure />
      </group>
    </>
  );
}
