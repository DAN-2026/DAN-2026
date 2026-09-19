import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, Billboard, useTexture, OrbitControls } from '@react-three/drei'
import logoUrl from '../assets/logoutama/logo-noteks.png'
import acaralogo from '../assets/divisi/acara.png'
import { Users } from 'lucide-react'
import fotoAcara from '../assets/gallery/gallery3.jpg'

// Data placeholder. name/desc/photo dipakai untuk kartu saat planet diklik.
// photo: null = pakai logo divisi sebagai gambar sementara.
const PLANETS = [
  {
    id: 1,
    name: 'Acara',
    desc: 'Divisi Acara bertanggung jawab merancang dan menjalankan seluruh kegiatan Duta Anti Narkoba UMN, dari konsep sampai hari pelaksanaan.',
    photo: null,
    radius: 4, speed: 0.4, size: 0.9, color: '#f59e0b', startAngle: 0,
    image: acaralogo, photo: fotoAcara,
  },
  { id: 2, radius: 4, speed: 0.4,  size: 0.4,  color: '#22d3ee', startAngle: Math.PI },
  { id: 3, radius: 6, speed: 0.25, size: 0.55, color: '#a78bfa', startAngle: 1 },
  { id: 4, radius: 6, speed: 0.25, size: 0.45, color: '#f472b6', startAngle: 2.5 },
  { id: 5, radius: 6, speed: 0.25, size: 0.5,  color: '#34d399', startAngle: 4.2 },
  { id: 6, radius: 8, speed: 0.15, size: 0.6,  color: '#fb923c', startAngle: 0.5 },
  { id: 7, radius: 8, speed: 0.15, size: 0.5,  color: '#60a5fa', startAngle: 2.2 },
  { id: 8, radius: 8, speed: 0.15, size: 0.55, color: '#facc15', startAngle: 4.0 },
]

const ORBIT_RADII = [...new Set(PLANETS.map((p) => p.radius))]

// Cahaya "matahari" di belakang logo, digambar lewat canvas, tanpa file gambar
function SunGlow({ size = 11 }) {
  const ref = useRef()

  const texture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    g.addColorStop(0, 'rgba(255, 225, 130, 0.9)')
    g.addColorStop(0.3, 'rgba(255, 170, 60, 0.35)')
    g.addColorStop(0.65, 'rgba(90, 130, 255, 0.12)')
    g.addColorStop(1, 'rgba(90, 130, 255, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 256)
    return new THREE.CanvasTexture(c)
  }, [])

  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 1.2) * 0.05
    ref.current.scale.set(s, s, 1)
  })

  return (
    <Billboard>
      <mesh ref={ref} position={[0, 0, -0.2]} renderOrder={-1}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </Billboard>
  )
}

function CenterLogo({ height = 4 }) {
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

function OrbitRing({ radius }) {
  return (
    <mesh rotation-x={-Math.PI / 2} renderOrder={-2}>
      <ringGeometry args={[radius - 0.03, radius + 0.03, 128]} />
      <meshBasicMaterial
        color="#9cc9ff"
        transparent
        opacity={0.35}
        side={2}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

// Bola placeholder (divisi yang belum punya logo)
function Planet({ radius, speed, size, color, startAngle }) {
  const ref = useRef()
  const angle = useRef(startAngle)

  useFrame((_, delta) => {
    angle.current += delta * speed
    ref.current.position.set(
      Math.cos(angle.current) * radius,
      0,
      Math.sin(angle.current) * radius
    )
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} transparent />
    </mesh>
  )
}

// Planet berupa logo divisi, bisa diklik
function LogoPlanet({ radius, speed, size, startAngle, image, onSelect }) {
  const ref = useRef()
  const angle = useRef(startAngle)
  const texture = useTexture(image)

  useFrame((_, delta) => {
    angle.current += delta * speed
    ref.current.position.set(
      Math.cos(angle.current) * radius,
      0,
      Math.sin(angle.current) * radius
    )
  })

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <Billboard>
        {/* rim emas tipis; juga jadi area klik yang bulat */}
        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[size * 1.07, 64]} />
          <meshBasicMaterial color="#ffd27a" transparent opacity={0.9} />
        </mesh>
        {/* raycast dimatikan supaya sudut kotak gambar tidak ikut terklik */}
        <mesh raycast={() => null}>
          <planeGeometry args={[size * 2, size * 2]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        </mesh>
      </Billboard>
    </group>
  )
}

// Kartu overlay HTML, di-render ke <body> supaya tidak kena mask/overflow halaman
function DivisionCard({ division, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#2a2a7a] to-[#1d3c7a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
       {division.photo ? (
  <img
    src={division.photo}
    alt={`Tim divisi ${division.name}`}
    className="h-64 w-full object-cover object-top"
  />
) : (
  <div className="flex h-64 items-center justify-center bg-gradient-to-b from-[#3a3f9a] to-[#1d3c7a]">
    <Users className="h-16 w-16 text-white/40" />
  </div>
)}

        <div className="p-8">
          <h3 className="text-3xl font-extrabold text-white">
            Divisi <span className="text-cyan-400">{division.name}</span>
          </h3>
          <p className="mt-4 text-base leading-relaxed text-gray-200">{division.desc}</p>
          <button
            onClick={onClose}
            className="mt-6 rounded-full bg-cyan-400 px-6 py-2 font-semibold text-slate-900 transition hover:bg-cyan-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function SolarSystem() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="h-[500px] w-full md:h-[650px]">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 9, 17], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[0, 0, 0]} intensity={120} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI * 0.55}
          autoRotate={!selected}
          autoRotateSpeed={0.5}
        />

        <Stars radius={60} depth={60} count={6000} factor={7} saturation={0} fade speed={1.5} />
        <Sparkles count={120} scale={[22, 8, 22]} size={4} speed={0.4} opacity={0.8} color="#cfe6ff" />

        {ORBIT_RADII.map((r) => (
          <OrbitRing key={r} radius={r} />
        ))}

        <SunGlow />
        <Suspense fallback={null}>
          <CenterLogo />
        </Suspense>

        {PLANETS.map((p) =>
          p.image ? (
            <Suspense key={p.id} fallback={null}>
              <LogoPlanet {...p} onSelect={() => setSelected(p)} />
            </Suspense>
          ) : (
            <Planet key={p.id} {...p} />
          )
        )}
      </Canvas>

      {selected && <DivisionCard division={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}