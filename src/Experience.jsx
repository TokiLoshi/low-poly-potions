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
	);
}

export default function Experience() {
	const ref = useRef();
	useFrame((state, delta) => (ref.current.rotation.x += delta / 2));

	return (
		<>
			<Input scale={2} position={[0.4, 0.25, -1]} />
			<mesh
				position={[0, 0, 0]}
				ref={ref}
				onClick={() => console.log("clicked")}
				shadows>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color='hotpink' />
			</mesh>
		</>
	);
}
