import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
	useGLTF,
	AccumulativeShadows,
	RandomizedLight,
	Html,
	Text,
	Effects,
	Environment,
	Center,
} from "@react-three/drei";
import CauldronFragmentShader from "./shaders/cauldron/fragment.glsl";
import CauldronVertexShader from "./shaders/cauldron/vertex.glsl";

console.log(`Cauldron Vertex Shader: ${CauldronVertexShader}`);
console.log(`Cauldron Fragment Shader: ${CauldronFragmentShader}`);

// Pot by Kenney under CC0 https://market.pmnd.rs/model/pot
function Cauldron(props) {
	const { scene } = useGLTF(
		"https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/pot/model.gltf"
	);
	return <primitive object={scene} {...props} />;
}

// Inputs added from pmndrs/drei example https://codesandbox.io/s/024uom?file=/src/ControlledInput.js
function ControlledInput(props) {
	const { value, onChange, ...rest } = props;
	const [cursor, setCursor] = useState(null);
	const ref = useRef(null);
	useEffect(() => {
		const input = ref.current;
		if (input) input.setSelectionRange(cursor, cursor);
	}, [ref, cursor, value]);
	const handleChange = (e) => {
		setCursor(e.target.selectionStart);
		onChange && onChange(e);
	};
	return (
		<>
			<input ref={ref} value={value} onChange={handleChange} {...rest} />
		</>
	);
}

function Input(props) {
	const [text, setText] = useState("Hocus pocus");
	return (
		<>
			<group {...props}>
				<Text
					position={[-1.2, -0.022, 0]}
					anchorX='0px'
					font='/fonts/Bangers-Regular.woff'
					fontSize={0.335}
					letterSpacing={-0.0}>
					Hello World
				</Text>
				<Html transform>
					<ControlledInput
						position={[-0.5, -2, 0]}
						style={{ width: "100px" }}
						type={text}
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
				</Html>
			</group>
		</>
	);
}

export default function Experience() {
	return (
		<>
			<>
				{/* <TesterMesh /> */}
				<Cauldron position={[0, -1, 1]} />
				<Input scale={2} position={[0.4, 0.25, -1]} />
			</>
		</>
	);
}

function TesterMesh() {
	// Tester mesh
	const ref = useRef();
	useFrame((state, delta) => (ref.current.rotation.x += delta / 2));
	return (
		<>
			// Tester mesh
			<mesh
				position={[0, 0, 0]}
				rotation={[0, -1, 2]}
				ref={ref}
				onClick={() => console.log("clicked")}
				shadows>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color='hotpink' />
			</mesh>
		</>
	);
}
