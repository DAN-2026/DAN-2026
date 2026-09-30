import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, Billboard, Text, useTexture, OrbitControls } from '@react-three/drei'
import logoUrl from '../assets/logoutama/logo-noteks.png'
import acaralogo from '../assets/divisi/div_acara.png'
import loLogo from '../assets/divisi/div_LO.png'
import brandPartnerLogo from '../assets/divisi/div_brandPartner.png'
import dekorVisualLogo from '../assets/divisi/div_dekorVisual.png'
import dokumentasiLogo from '../assets/divisi/div_dokumentasi.png'
import freshMoneyLogo from '../assets/divisi/div_freshMoney.png'
import makeupLogo from '../assets/divisi/div_makeup.png'
import perlengkapanLogo from '../assets/divisi/div_perlengkapan.png'
import publicRelationLogo from '../assets/divisi/div_publicRelation.png'
import registrasiLogo from '../assets/divisi/div_registrasi.png'
import websiteLogo from '../assets/divisi/div_website.png'
import { Users } from 'lucide-react'

const divisionPhotoLoaders = {
  acara: () => import('../assets/divisi img/acara.JPG'),
  brandPartner: () => import('../assets/divisi img/BrandPartner.JPG'),
  dekorasi: () => import('../assets/divisi img/Dekorasi.JPG'),
  dokumentasi: () => import('../assets/divisi img/Dokumentasi.jpeg'),
  freshMoney: () => import('../assets/divisi img/FreshMoney.JPG'),
  perlengkapan: () => import('../assets/divisi img/Perlengkapan.JPG'),
  publicRelation: () => import('../assets/divisi img/PublicRelation.JPG'),
  registrasi: () => import('../assets/divisi img/Registrasi.JPG'),
  website: () => import('../assets/divisi img/Website.JPG'),
  bph: () => import('../assets/divisi img/BPH.JPG'),
}

const PLANETS = [
  {
    id: 1,
    name: 'Acara',
    desc: 'Divisi Acara bertanggung jawab merancang dan menjalankan seluruh kegiatan Duta Anti Narkoba UMN, dari konsep sampai hari pelaksanaan.',
    radius: 4, speed: 0.4, size: 0.6, color: '#f59e0b', startAngle: 0,
    image: acaralogo, photoLoader: divisionPhotoLoaders.acara,
  },
  {
    id: 2,
    name: 'LO',
    desc: 'Divisi LO mendampingi dan membantu kebutuhan tamu serta pihak yang bekerja sama dalam kegiatan.',
    radius: 4, speed: 0.4, size: 0.55, color: '#22d3ee', startAngle: Math.PI,
    image: loLogo, photo: loLogo,
  },
  {
    id: 3,
    name: 'Brand Partner',
    desc: 'Divisi Brand Partner menjalin kerja sama dengan mitra untuk mendukung kegiatan Duta Anti Narkoba UMN.',
    radius: 6, speed: 0.25, size: 0.6, color: '#a78bfa', startAngle: 0,
    image: brandPartnerLogo, photoLoader: divisionPhotoLoaders.brandPartner,
  },
  {
    id: 4,
    name: 'Dekor Visual',
    desc: 'Divisi Dekor Visual menyiapkan dekorasi dan kebutuhan visual agar setiap kegiatan memiliki suasana yang menarik.',
    radius: 6, speed: 0.25, size: 0.6, color: '#f472b6', startAngle: (Math.PI * 2) / 3,
    image: dekorVisualLogo, photoLoader: divisionPhotoLoaders.dekorasi,
  },
  {
    id: 5,
    name: 'Dokumentasi',
    desc: 'Divisi Dokumentasi mengabadikan momen dan mengelola dokumentasi foto maupun video kegiatan.',
    radius: 6, speed: 0.25, size: 0.6, color: '#34d399', startAngle: (Math.PI * 4) / 3,
    image: dokumentasiLogo, photoLoader: divisionPhotoLoaders.dokumentasi,
  },
  {
    id: 6,
    name: 'Fresh Money',
    desc: 'Divisi Fresh Money mengelola kebutuhan dana dan mendukung penggalangan dana untuk kegiatan.',
    radius: 8, speed: 0.15, size: 0.65, color: '#fb923c', startAngle: 0,
    image: freshMoneyLogo, photoLoader: divisionPhotoLoaders.freshMoney,
  },
  {
    id: 7,
    name: 'Makeup',
    desc: 'Divisi Makeup membantu menyiapkan penampilan para anggota dalam kegiatan dan acara.',
    radius: 8, speed: 0.15, size: 0.6, color: '#60a5fa', startAngle: (Math.PI * 2) / 3,
    image: makeupLogo, photo: makeupLogo,
  },
  {
    id: 8,
    name: 'Perlengkapan',
    desc: 'Divisi Perlengkapan menyiapkan dan memastikan ketersediaan perlengkapan yang dibutuhkan untuk kegiatan.',
    radius: 8, speed: 0.15, size: 0.6, color: '#facc15', startAngle: (Math.PI * 4) / 3,
    image: perlengkapanLogo, photoLoader: divisionPhotoLoaders.perlengkapan,
  },
  {
    id: 9,
    name: 'Public Relation',
    desc: 'Divisi Public Relation mengelola komunikasi dan publikasi informasi kepada audiens serta pihak eksternal.',
    radius: 10, speed: 0.1, size: 0.65, color: '#f87171', startAngle: 0,
    image: publicRelationLogo, photoLoader: divisionPhotoLoaders.publicRelation,
  },
  {
    id: 10,
    name: 'Registrasi',
    desc: 'Divisi Registrasi mengatur proses pendaftaran dan membantu kelancaran administrasi peserta kegiatan.',
    radius: 10, speed: 0.1, size: 0.65, color: '#4ade80', startAngle: (Math.PI * 2) / 3,
    image: registrasiLogo, photoLoader: divisionPhotoLoaders.registrasi,
  },
  {
    id: 11,
    name: 'Website',
    desc: 'Divisi Website mengelola dan mengembangkan situs sebagai pusat informasi digital Duta Anti Narkoba UMN.',
    radius: 10, speed: 0.1, size: 0.65, color: '#38bdf8', startAngle: (Math.PI * 4) / 3,
    image: websiteLogo, photoLoader: divisionPhotoLoaders.website,
  },
]

const ORBIT_RADII = [...new Set(PLANETS.map((p) => p.radius))]
const BPH = {
  name: 'BPH',
  desc: 'Badan Pengurus Harian mengoordinasikan seluruh divisi dan memastikan program Duta Anti Narkoba berjalan sesuai tujuan.',
  photoLoader: divisionPhotoLoaders.bph,
}

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

function CenterLogo({ height = 4, onSelect }) {
  const texture = useTexture(logoUrl)
  const aspect = texture.image.width / texture.image.height

  return (
    <Billboard
      onClick={(event) => {
        event.stopPropagation()
        onSelect()
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[height * aspect + 0.4, height + 1]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[height * aspect, height]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
      <Text
        position={[0, -height / 2 - 0.2, 0.03]}
        fontSize={0.6 * 0.38}
        maxWidth={height * 3}
        textAlign="center"
        anchorX="center"
        anchorY="top"
        color="white"
        outlineColor="#07152b"
        outlineWidth={0.6 * 0.035}
      >
        BPH
      </Text>
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
function LogoPlanet({ radius, speed, size, startAngle, name, image, onSelect }) {
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
        <Text
          position={[0, -size * 1.12, 0.03]}
          fontSize={size * 0.38}
          maxWidth={size * 5}
          textAlign="center"
          anchorX="center"
          anchorY="top"
          color="white"
          outlineColor="#07152b"
          outlineWidth={size * 0.035}
          raycast={() => null}
        >
          {name}
        </Text>
      </Billboard>
    </group>
  )
}

// Kartu overlay HTML, di-render ke <body> supaya tidak kena mask/overflow halaman
function DivisionCard({ division, onClose }) {
  const [photoUrl, setPhotoUrl] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    let isMounted = true

    if (!division.photoLoader) {
      setPhotoUrl(null)
      return () => {
        isMounted = false
      }
    }

    division.photoLoader().then((module) => {
      if (!isMounted) return
      setPhotoUrl(module.default || module)
    }).catch(() => {
      if (!isMounted) return
      setPhotoUrl(null)
    })

    return () => {
      isMounted = false
    }
  }, [division])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-[#2a2a7a] to-[#1d3c7a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
       {photoUrl ? (
  <img
    src={photoUrl}
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
            {division.name === 'BPH' ? (
              <>Badan Pengurus <span className="text-cyan-400">Harian</span></>
            ) : (
              <>Divisi <span className="text-cyan-400">{division.name}</span></>
            )}
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
          <CenterLogo onSelect={() => setSelected(BPH)} />
        </Suspense>

        {PLANETS.map((p) =>
          p.image ? (
            <Suspense key={p.id} fallback={<Planet {...p} />}>
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