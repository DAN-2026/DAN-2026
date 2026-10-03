import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { CalendarDays, Images, X } from "lucide-react";
import aboutUsBackground from "../../assets/Background DAN.png";
import danImage from "../../assets/logoutama/logo-dan.png";
import danNoTeksImage from "../../assets/logoutama/logo-noteks.png";
import umnImage from "../../assets/logoutama/logo-umn.png";
import galleryImage1 from "../../assets/gallery/gallery1.jpg";
import galleryImage2 from "../../assets/gallery/gallery2.jpg";
import galleryImage3 from "../../assets/gallery/gallery3.jpg";
import galleryImage4 from "../../assets/gallery/gallery4.jpg";
import galleryImage5 from "../../assets/gallery/gallery5.jpg";
// import bemImage from "../../assets/logoutama/logo-bem.png"; // TODO: aktifkan kalau asetnya udah ada

// Tanggal Awarding Night 2026 — ganti kalau tanggal pastinya beda
const TARGET_DATE = new Date("2026-11-25T00:00:00");

const CATEGORY_STYLES = {
  ADW: "from-teal-500 to-cyan-300",
  DGTS: "from-blue-500 to-blue-900",
  Awarding: "from-indigo-900 to-slate-950",
};

const adwGalleryImporters = Object.entries(
  import.meta.glob("../../assets/gallery/ADW/*.{JPG,jpg,jpeg,png,webp}", {
    eager: false,
    import: "default",
  })
).sort(([pathA], [pathB]) => pathA.localeCompare(pathB));

const adwGalleryPhotoCount = adwGalleryImporters.length;

const events = [
  {
    id: 1,
    category: "ADW",
    title: "Anti-Drugs Week",
    titleHighlight: "2026",
    description:
      "Kegiatan penggalangan donasi yang berlangsung selama dua minggu di lingkungan kampus, dilanjutkan dengan penyerahan donasi langsung ke Rumah Singgah Batu Karang YKAI sebagai bentuk kepedulian terhadap sesama.",
    date: "18-29 Mei 2026",
    location: "Universitas Multimedia Nusantara",
    participants: "200+ Peserta",
    photoCount: adwGalleryPhotoCount,
  },
  {
    id: 2,
    category: "DGTS",
    title: "Duta Anti Narkoba",
    titleHighlight: "Goes To School (DGTS)",
    description:
      "Program edukatif berfokus pada penyuluhan di sekolah. Interaktif dan engaging, mengajak pelajar memahami bahaya narkoba melalui campaign kreatif.",
    date: "14 Nov 2026",
    location: "SMA Negeri 1 Tangerang",
    participants: "150+ Peserta",
    photoCount: 41,
  },
  {
    id: 3,
    category: "Awarding",
    title: "Awarding Night",
    titleHighlight: "2026",
    description:
      "Malam penghargaan untuk merayakan dedikasi, inspirasi, dan dampak generasi muda dalam menciptakan masa depan yang lebih baik.",
    date: "25 Nov 2026",
    location: "Universitas Multimedia Nusantara",
    participants: "300+ Peserta",
    photoCount: 41,
  },
];

const FILTERS = ["All", "ADW", "DGTS", "Awarding"];
const galleryPhotos = [galleryImage1, galleryImage2, galleryImage3, galleryImage4, galleryImage5];

// --- Icon kecil (inline SVG, konsisten sama gaya Navbar.jsx) ---
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconImage({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}
function IconArrow({ direction = "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-5 w-5 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function getTimeLeft(target) {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function CountdownBox({ value, label }) {
  return (
    <div className="flex w-16 flex-col items-center rounded-lg border border-slate-700 bg-slate-800/80 py-3 sm:w-20">
      <span className="text-2xl font-bold text-cyan-400 sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-xs text-gray-300">{label}</span>
    </div>
  );
}

function AlbumOverlay({ album, onClose }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const [adwGalleryPhotos, setAdwGalleryPhotos] = useState([]);

  useEffect(() => {
    if (album.category !== "ADW") return;

    let isMounted = true;
    Promise.all(adwGalleryImporters.map(([, importer]) => importer())).then((photos) => {
      if (!isMounted) return;
      setAdwGalleryPhotos(photos.map((photo) => photo.default ?? photo));
    });

    return () => {
      isMounted = false;
    };
  }, [album.category]);

  const photos = album.category === "ADW" ? adwGalleryPhotos : galleryPhotos;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (activePhoto) setActivePhoto(null);
        else onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhoto, onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div className="w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
        <h2 className="mb-2 px-1 text-sm font-medium tracking-wide text-white/60">OVERLAY GALERI</h2>
        <section className="overflow-hidden rounded-xl bg-slate-900 shadow-2xl">
          <header className="flex items-start justify-between gap-4 bg-gradient-to-r from-blue-700 to-blue-950 px-4 py-4 sm:px-6">
            <div>
              <h3 className="font-bold text-white">
                {album.title} {album.titleHighlight}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-blue-100">
                <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{album.date}</span>
                <span className="flex items-center gap-1.5"><Images className="h-3.5 w-3.5" />{album.photoCount} foto</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup overlay galeri"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="max-h-[min(65vh,560px)] overflow-y-auto p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
              {photos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => setActivePhoto(photo)}
                  aria-label={`Perbesar foto ${index + 1}`}
                  className="group aspect-square overflow-hidden rounded-lg bg-slate-700 outline-none ring-cyan-400 transition focus-visible:ring-2"
                >
                  <img
                    src={photo}
                    alt={`${album.title}, foto ${index + 1}`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
          <p className="px-4 pb-3 text-center text-xs text-slate-400">Klik foto untuk memperbesar</p>
        </section>
      </div>

      {activePhoto && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            onClick={() => setActivePhoto(null)}
            aria-label="Tutup foto"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={activePhoto}
            alt={`Foto album ${album.title}`}
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>,
    document.body
  );
}

function Event() {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [slide, setSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [adwGalleryPhotos, setAdwGalleryPhotos] = useState([]);
  const [adwHeroImage, setAdwHeroImage] = useState(null);
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  useEffect(() => {
    const requestedCategory = location.state?.eventCategory;
    if (!requestedCategory) return;

    const requestedIndex = events.findIndex((event) => event.category === requestedCategory);
    if (requestedIndex === -1) return;

    setSlide(requestedIndex);
    setSelectedAlbum(events[requestedIndex]);
  }, [location.state]);

  useEffect(() => {
    if (isCarouselPaused || selectedAlbum) return;

    const carouselTimer = window.setInterval(() => {
      setSlide((currentSlide) => (currentSlide + 1) % events.length);
    }, 5500);

    return () => window.clearInterval(carouselTimer);
  }, [isCarouselPaused, selectedAlbum, slide]);

  useEffect(() => {
    const bodyStyle = document.body.style;
    const previousBackground = {
      image: bodyStyle.backgroundImage,
      size: bodyStyle.backgroundSize,
      position: bodyStyle.backgroundPosition,
      attachment: bodyStyle.backgroundAttachment,
      repeat: bodyStyle.backgroundRepeat,
    };

    bodyStyle.backgroundImage = `linear-gradient(rgba(8, 19, 38, 0.35), rgba(8, 19, 38, 0.35)), url("${aboutUsBackground}")`;
    bodyStyle.backgroundSize = "cover";
    bodyStyle.backgroundPosition = "center";
    bodyStyle.backgroundAttachment = "fixed";
    bodyStyle.backgroundRepeat = "no-repeat";

    return () => {
      bodyStyle.backgroundImage = previousBackground.image;
      bodyStyle.backgroundSize = previousBackground.size;
      bodyStyle.backgroundPosition = previousBackground.position;
      bodyStyle.backgroundAttachment = previousBackground.attachment;
      bodyStyle.backgroundRepeat = previousBackground.repeat;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    import("../../assets/gallery/ADW/DJI_20260627121848_0077_D.JPG")
      .then((module) => {
        if (!isMounted) return;
        setAdwHeroImage(module.default ?? module);
      })
      .catch(() => {
        if (!isMounted) return;
        setAdwHeroImage(null);
      });

    Promise.all(adwGalleryImporters.map(([, importer]) => importer())).then((photos) => {
      if (!isMounted) return;
      setAdwGalleryPhotos(photos.map((photo) => photo.default ?? photo));
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredGallery =
    activeFilter === "All" ? events : events.filter((e) => e.category === activeFilter);

  const goPrev = () => setSlide((s) => (s === 0 ? events.length - 1 : s - 1));
  const goNext = () => setSlide((s) => (s === events.length - 1 ? 0 : s + 1));
  const current = events[slide];

  return (
    <main className="min-h-screen overflow-hidden pt-32">
      {/* HERO */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 lg:grid-cols-2 lg:px-12">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight text-slate-200 md:text-6xl">
            Awarding
            <br />
            <span className="text-cyan-400">Night </span>
            <span className="text-[#8CCAF2]">2026</span>
          </h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-[#8CCAF2]" />
          <p className="mt-5 max-w-md text-base leading-relaxed text-gray-200">
            A night to celebrate dedication, inspiration, and the impact of
            youths in creating a better future.
          </p>

          <div className="mt-8 inline-flex gap-3 rounded-2xl bg-slate-600/50 p-3">
            <CountdownBox value={days} label="Days" />
            <CountdownBox value={hours} label="Hours" />
            <CountdownBox value={minutes} label="Min" />
            <CountdownBox value={seconds} label="Secs" />
          </div>
        </div>

        <div className="relative mx-auto flex h-auto aspect-square w-full max-w-[380px] items-center justify-center md:h-[440px] md:w-[440px]">
          <div className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl" />
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-white/20 bg-white/70 text-center shadow-2xl">
            <img src={danNoTeksImage} alt="Duta Anti Narkoba" className="h-28 w-auto object-contain md:h-32" />
            <p className="mt-4 text-4xl font-extrabold text-slate-800 md:text-5xl">
              Duta Anti
              <br />
              <span className="text-blue-900">Narkoba</span>
            </p>
            <p className="mt-2 text-base text-slate-500 md:text-lg">Smart, Healthy, and Fun</p>
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12">
        <h2 className="text-center text-2xl font-bold text-white md:text-3xl">Filter Events</h2>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "border-blue-500 bg-blue-600 text-white"
                  : "border-white/20 text-white/80 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="mx-auto mt-10 max-w-7xl px-6 lg:px-12">
        <div
          className="relative overflow-hidden rounded-3xl"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onFocusCapture={() => setIsCarouselPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsCarouselPaused(false);
            }
          }}
        >
          <div
            className={`group relative flex min-h-[420px] flex-col justify-end bg-gradient-to-br p-8 md:p-12 ${
              CATEGORY_STYLES[current.category]
            }`}
          >
            {/* TODO: ganti dengan foto asli event (background image) */}
            {current.category === "ADW" && (
              <img
                src={adwHeroImage}
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/30" />

            <button
              onClick={goPrev}
              aria-label="Sebelumnya"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 hover:bg-white/20"
            >
              <IconArrow direction="left" />
            </button>
            <button
              onClick={goNext}
              aria-label="Selanjutnya"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 hover:bg-white/20"
            >
              <IconArrow direction="right" />
            </button>

            <div className="relative z-10 max-w-xl">
              <h3 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
                {current.title}
                {current.titleHighlight && (
                  <>
                    {" "}
                    <span className="text-cyan-300">{current.titleHighlight}</span>
                  </>
                )}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-100 md:text-base">
                {current.description}
              </p>

              <button
                onClick={() => setSelectedAlbum(current)}
                className="mt-6 flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
              >
                <IconImage />
                Lihat Album
              </button>

              <div className="mt-5 flex flex-wrap gap-5 text-xs text-gray-100 md:text-sm">
                <span className="flex items-center gap-1.5">
                  <IconCalendar /> {current.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconPin /> {current.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <IconUsers /> {current.participants}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Ke slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === slide ? "w-6 bg-cyan-400" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* GALERI KEGIATAN */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
          <IconImage className="h-7 w-7 text-cyan-400" /> Galeri Kegiatan
        </h2>
        <p className="mt-2 text-sm text-gray-200">
          Setiap event punya album tersendiri. Klik untuk melihat semua foto.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGallery.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelectedAlbum(e)}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 text-left"
            >
              {/* TODO: ganti dengan foto asli album */}
              <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${CATEGORY_STYLES[e.category]}`}>
                {e.category === "ADW" && adwGalleryPhotos[0] && (
                  <img
                    src={adwGalleryPhotos[0]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <span className="absolute right-3 top-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white">
                  {e.category}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-4">
                <div>
                  <p className="font-semibold text-white">{e.title}</p>
                  <p className="text-xs text-gray-300">{e.date}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-cyan-400">
                  <IconImage /> {e.photoCount}
                </span>
              </div>
            </button>
          ))}

          <button className="flex h-full min-h-[176px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/30 text-white/80 transition hover:bg-white/5">
            <span className="text-2xl">+</span>
            <span className="text-sm">Lihat semua album</span>
          </button>
        </div>
      </section>

      {/* FOOTER — sama polanya kayak di AboutUs.jsx, ditambah logo BEM */}
      <footer className="bg-[#19263d]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <div className="grid items-center gap-10 md:grid-cols-3">
            <div className="flex justify-center md:justify-start">
              <div className="flex h-32 w-auto items-center justify-center">
                <img
                  src={danImage}
                  alt="Logo Duta Anti Narkoba UMN"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white">Contact & Address</h3>
              <div className="mt-3 text-sm leading-relaxed text-gray-300">
                <p>📍 Duta Anti Narkoba UMN</p>
                <p>Universitas Multimedia Nusantara</p>
                <p>Jl. Scientia Boulevard, Gading Serpong</p>
                <p>Tangerang, Banten 15811, Indonesia</p>
              </div>
              <div className="mt-5 flex justify-center gap-3">
                <a
                  href="https://www.instagram.com/dutaantinarkoba.umn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Duta Anti Narkoba UMN"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-pink-500/40"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="mailto:dutaantinarkoba@umn.ac.id"
                  target="_blank"
                  aria-label="Email Duta Anti Narkoba UMN"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-cyan-400/40"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="flex h-32 w-auto items-center justify-center gap-4">
                <img src={umnImage} alt="Universitas Multimedia Nusantara" className="max-h-full max-w-full object-contain" />
                {/* TODO: tambahkan <img src={bemImage} .../> di sini kalau aset logo BEM sudah ada */}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-gray-500">
            © 2026 DUTA ANTI NARKOBA UMN – All Rights Reserved
          </div>
        </div>
      </footer>
      {selectedAlbum && <AlbumOverlay album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />}
    </main>
  );
}

export default Event;