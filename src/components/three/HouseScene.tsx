"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function House() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 1.5, 2]} />
        <meshStandardMaterial color="#7C3AED" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2, 1.2, 4]} />
        <meshStandardMaterial color="#06B6D4" metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Door */}
      <mesh position={[0, -0.1, 1.01]}>
        <boxGeometry args={[0.6, 0.9, 0.05]} />
        <meshStandardMaterial color="#F43F5E" emissive="#F43F5E" emissiveIntensity={0.3} />
      </mesh>
      {/* Windows */}
      {([-0.7, 0.7] as const).map((x) => (
        <mesh key={x} position={[x, 0.2, 1.01]}>
          <boxGeometry args={[0.5, 0.5, 0.05]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
      {/* Glow sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2.5, 1.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <MeshDistortMaterial
            color="#F43F5E"
            emissive="#F43F5E"
            emissiveIntensity={1}
            distort={0.4}
            speed={2}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#7C3AED" transparent opacity={0.6} />
    </points>
  );
}

export default function HouseScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#7C3AED" />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color="#06B6D4" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#F43F5E" />
        <Stars radius={50} depth={50} count={400} factor={2} saturation={0} fade speed={0.8} />
        <Particles />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <House />
        </Float>
      </Canvas>
    </div>
  );
}
