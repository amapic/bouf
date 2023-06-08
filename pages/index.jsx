import { Canvas } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("../component/Image"), {
  ssr: false,
});
const fragmentShader = `
uniform float u_test;


  void main() {
  gl_FragColor = vec4(1.0,1.0,1.0,1.0);
  }
`;

const vertexShader = `
uniform float u_test;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * 4.0) * 0.2;
  
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
  }
`;

const Cube = () => {
  const mesh = useRef();
  const uniforms = useMemo(
    () => ({
      u_test: {
        value: 1.0,
      },
    }),
    []
  );

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default function Home() {
  return (
    <>
      <div
        style={{
          width: "80%",
          height: "100vh",
          // display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src="images/2.jpg" />
      </div>
      {/* <Canvas>
        <Cube />
      </Canvas> */}
    </>
  );
}
