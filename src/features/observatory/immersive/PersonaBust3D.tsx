import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { styleFor, type Accessory, type Headwear } from "./bust-style";

/** Faceless, stylised bust. Morphs (squash + colour lerp) whenever the sector changes. */
const SKIN = "#7a4b32";

function Bust({ sector }: { sector: string }) {
  const s = styleFor(sector);
  const group = useRef<THREE.Group>(null);
  const garment = useRef<THREE.MeshStandardMaterial>(null);
  const trim = useRef<THREE.MeshStandardMaterial>(null);
  const morph = useRef({ sector, t: 1 });
  const target = useRef(new THREE.Color(s.garment));
  const targetTrim = useRef(new THREE.Color(s.trim));

  if (morph.current.sector !== sector) {
    morph.current = { sector, t: 0 };
    target.current.set(s.garment);
    targetTrim.current.set(s.trim);
  }

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const m = morph.current;
    m.t = Math.min(1, m.t + dt * 1.6);
    const pulse = Math.sin(m.t * Math.PI);
    if (group.current) {
      group.current.scale.set(1 + pulse * 0.08, 1 - pulse * 0.12, 1 + pulse * 0.08);
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.35 + (1 - m.t) * Math.PI * 2;
    }
    garment.current?.color.lerp(target.current, 1 - Math.exp(-6 * dt));
    trim.current?.color.lerp(targetTrim.current, 1 - Math.exp(-6 * dt));
  });

  return (
    <group ref={group} position={[0, -0.9, 0]}>
      {/* shoulders / robe */}
      <mesh position={[0, 0.35, 0]} scale={[1.25, 0.75, 0.75]}>
        <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial ref={garment} color={s.garment} roughness={0.55} metalness={0.05} />
      </mesh>
      {/* embroidered collar */}
      <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.36, 0.07, 16, 48]} />
        <meshStandardMaterial ref={trim} color={s.trim} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.22, 0.27, 0.35, 32]} />
        <meshStandardMaterial color={SKIN} roughness={0.6} />
      </mesh>
      {/* head (faceless) */}
      <mesh position={[0, 1.72, 0]} scale={[0.92, 1.08, 0.95]}>
        <sphereGeometry args={[0.5, 64, 48]} />
        <meshStandardMaterial color={SKIN} roughness={0.45} />
      </mesh>
      <Hat kind={s.headwear} color={s.trim} />
      <Prop kind={s.accessory} color={s.trim} />
    </group>
  );
}

function Hat({ kind, color }: { kind: Headwear; color: string }) {
  if (kind === "none") return null;
  if (kind === "kufi")
    return (
      <mesh position={[0, 2.12, 0]}>
        <cylinderGeometry args={[0.44, 0.47, 0.3, 48]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.3} />
      </mesh>
    );
  if (kind === "turban")
    return (
      <mesh position={[0, 2.1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.8]}>
        <torusGeometry args={[0.38, 0.17, 24, 48]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
    );
  return (
    <group position={[0, 2.12, 0]}>
      <mesh>
        <sphereGeometry args={[0.49, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.45]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.35]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Floating trade emblem orbiting at shoulder height. */
function Prop({ kind, color }: { kind: Accessory; color: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((st) => {
    if (!ref.current) return;
    const t = st.clock.elapsedTime;
    ref.current.position.set(1.15, 1.3 + Math.sin(t * 1.4) * 0.08, 0.3);
    ref.current.rotation.y = t * 0.8;
  });
  const mat = <meshStandardMaterial color={color} roughness={0.25} metalness={0.75} />;
  const geo: Record<Accessory, React.ReactNode> = {
    basket: <cylinderGeometry args={[0.22, 0.15, 0.22, 24]} />,
    sprout: <coneGeometry args={[0.14, 0.42, 16]} />,
    wheel: <torusGeometry args={[0.2, 0.06, 12, 32]} />,
    needle: <cylinderGeometry args={[0.025, 0.025, 0.6, 8]} />,
    book: <boxGeometry args={[0.36, 0.08, 0.28]} />,
    cross: <boxGeometry args={[0.12, 0.38, 0.12]} />,
    seal: <cylinderGeometry args={[0.2, 0.2, 0.06, 32]} />,
    brick: <boxGeometry args={[0.36, 0.16, 0.18]} />,
    chip: <boxGeometry args={[0.3, 0.04, 0.3]} />,
    coin: <cylinderGeometry args={[0.18, 0.18, 0.04, 32]} />,
    drum: <cylinderGeometry args={[0.16, 0.2, 0.32, 24]} />,
    bowl: <sphereGeometry args={[0.22, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />,
    star: <octahedronGeometry args={[0.2]} />,
  };
  return (
    <group ref={ref}>
      <mesh>
        {geo[kind]}
        {mat}
      </mesh>
      {kind === "cross" && (
        <mesh>
          <boxGeometry args={[0.38, 0.12, 0.12]} />
          {mat}
        </mesh>
      )}
    </group>
  );
}

export default function PersonaBust3D({ sector }: { sector: string }) {
  return (
    <Canvas camera={{ position: [0, 0.9, 4.2], fov: 32 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} />
      <directionalLight position={[-3, 2, -2]} intensity={0.6} color="#d7b26a" />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.2} color="#d7b26a" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <Bust sector={sector} />
      <ContactShadows position={[0, -0.9, 0]} opacity={0.45} blur={2.4} scale={4} far={2} />
    </Canvas>
  );
}
