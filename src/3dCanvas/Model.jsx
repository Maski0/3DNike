import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export default function Model({Position = [0,0,0]}) {
  const groupRef = useRef()
  const { nodes, materials } = useGLTF('/blue_sneaker.glb')
  return (
    <group
            ref={groupRef}
        >
            <mesh
            castShadow
            geometry={nodes.Blue_Sneaker.geometry}
            material={materials.Material01}
            dispose={null}
            position={Position}
            >
            </mesh>
        </group>
  )
}

useGLTF.preload('/blue_sneaker.glb')