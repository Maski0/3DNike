import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({Position = [0,0,0]}) {
  const groupRef = useRef()
  const { nodes, materials } = useGLTF('/blue_sneaker.glb')

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20)
    groupRef.current.position.y = (1+ Math.sin(t/1.5)) /30
  })

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