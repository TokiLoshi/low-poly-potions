import "./style.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Experience from "./Experience";

export default function App() {
	return (
		<>
			{/* <div id='canvas-container'> */}
			<Canvas>
				<OrbitControls />
				<ambientLight intensity={Math.PI / 2} />
				<pointLight
					position={[10, 10, 10]}
					intensity={Math.PI / 2}
					angle={0.15}
					penumbra={1}
					decay={0}
				/>
				<Experience />
			</Canvas>
		</>
	);
}

createRoot(document.getElementById("root")).render(<App />);
