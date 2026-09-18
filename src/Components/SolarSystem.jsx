import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, Billboard, useTexture } from '@react-three/drei'
import logoUrl from '../assets/logoutama/logo-noteks.png'

function CenterLogo({ height = 3.5 }) {
  const texture = useTexture(logoUrl)
  const aspect = texture.image.width / texture.image.height

  return (
    <Billboard>
      <mesh>
        <planeGeometry args={[height * aspect, height]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </Billboard>
  )
}

export default function SolarSystem() {
  return (
    <div className="h-[500px] w-full md:h-[650px]">
      <Canvas camera={{ position: [0, 8, 14], fov: 50 }}>
        <Stars radius={100} depth={50} count={3000} factor={8} fade speed={1} />

        <Suspense fallback={null}>
          <CenterLogo />
        </Suspense>
      </Canvas>
    </div>
  )
}