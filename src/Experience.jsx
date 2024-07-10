import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Experience() {
	const ref = useRef();
	useFrame((state, delta) => (ref.current.rotation.x += delta / 2));

	return (
		<mesh
			position={[0, 0, 0]}
			ref={ref}
			onClick={() => console.log("clicked")}
			shadows>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color='hotpink' />
		</mesh>
	);
}
