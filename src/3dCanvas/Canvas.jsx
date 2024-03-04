import { Canvas , useThree} from "@react-three/fiber";
import Model from "./Model";
import { Environment } from "@react-three/drei";
import {a,useSpring} from '@react-spring/three'
import { useMemo } from "react";
import * as THREE from 'three'
import { useDrag } from 'react-use-gesture'

const CanvasModel = () => {
    return(
        <Canvas>
            <ambientLight intensity={0.5} />
            <Environment preset="city" />
            <Inspector ModelPosition={[0,0,4]}>
                <Model />
            </Inspector>
        </Canvas>
    )
}


function Inspector({ ModelPosition = [0,0,0],responsiveness = 20, children }) {
    const { size } = useThree()
    const euler = useMemo(() => new THREE.Euler(), [])
    const [spring, set] = useSpring(() => ({
      position: ModelPosition,
      rotation: [0, 0, 0],
    }))
    const bind = useDrag(({ delta: [dx, dy] }) => {
      euler.y += (dx / size.width) * responsiveness
      euler.x += (dy / size.width) * responsiveness
      euler.x = THREE.MathUtils.clamp(euler.x, -Math.PI / 4, Math.PI / 4)
      set({ rotation: euler.toArray().slice(0, 3) })
    })
    return (
      <a.group {...bind()} {...spring}>
        {children}
      </a.group>
    )
  }

export default CanvasModel;