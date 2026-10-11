import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Volume2, VolumeX } from "lucide-react";
import Reveal from "../../components/Reveal";
import LogoMarquee from "../../components/LogoMarquee";

import aboutUsBackground from "../../assets/Background DAN.webp";
import danImage from "../../assets/logoutama/logo-dan.webp";
import umnImage from "../../assets/logoutama/logo-umn.webp";
import mainHomeImage from "../../assets/logoutama/mainHome.webp";
import activityVideo from "../../assets/gallery/vidio kegiatan/kegiatan.mp4";
import sponsorImage from "../../assets/sponsor/Spark Studen Ambassador.webp";

const galleryImageLoaders = import.meta.glob("../../assets/gallery/*.webp", {
  eager: false,
  import: "default",
});

const mediaPartnerImageLoaders = import.meta.glob("../../assets/mediaPartner/*.{png,jpg,jpeg,webp}", {
  eager: false,
  import: "default",
});

const sponsors = [{ name: "Spark Studen Ambassador", image: sponsorImage }];

async function loadImage(importer) {
  const mod = await importer();
  return mod.default ?? mod;
}

function Home() {
  const [activeGallery, setActiveGallery] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [mediaPartners, setMediaPartners] = useState([]);
  const [isActivityVideoPlaying, setIsActivityVideoPlaying] = useState(false);
  const [isActivityVideoMuted, setIsActivityVideoMuted] = useState(true);
  const activityVideoRef = useRef(null);

  const toggleActivityVideo = () => {
    const video = activityVideoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => setIsActivityVideoPlaying(false));
    } else {
      video.pause();
    }
  };

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

    Promise.all(
      Object.entries(galleryImageLoaders)
        .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
        .map(async ([path, importer]) => ({
          name: path.split('/').pop(),
          image: await loadImage(importer),
        }))
    ).then((entries) => {
      if (!isMounted) return;
      setGallery(entries);
    });

    Promise.all(
      Object.entries(mediaPartnerImageLoaders)
        .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
        .map(async ([path, importer]) => ({
          name: path.split('/').pop().replace(/\.[^/.]+$/, ''),
          image: await loadImage(importer),
        }))
    ).then((entries) => {
      if (!isMounted) return;
      setMediaPartners(entries);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const events = [
    {
      category: "ADW",
      date: "18-29 MEI 2026",
      title: "UMN ADW 2026",
      description:
        "Kegiatan penggalangan donasi untuk Rumah Singgah Batu Karang YKAI sebagai bentuk kepedulian sosial kampus.",
      name: "UMN ADW 2026",
      image: gallery[1]?.image || '',
    },
    {
      category: "DGTS",
      date: "14 NOVEMBER 2026",
      title: "DGTS 2026",
      description:
        "Program edukasi yang berfokus pada pencegahan penyalahgunaan narkoba di kalangan pelajar dan mahasiswa.",
      image: gallery[2]?.image || '',
    },
    {
      category: "Awarding",
      date: "25 NOVEMBER 2026",
      title: "AWARDING NIGHT 2026",
      description:
        "Malam puncak bagi para peserta dan finalis yang telah berpartisipasi dalam kegiatan Duta Anti Narkoba.",
      image: gallery[0]?.image || '',
    },
  ];

  const nextGallery = () => {
    setActiveGallery((previousImage) =>
      previousImage === gallery.length - 1 ? 0 : previousImage + 1
    );
  };

  const previousGallery = () => {
    setActiveGallery((previousImage) =>
      previousImage === 0 ? gallery.length - 1 : previousImage - 1
    );
  };
  useEffect(() => {
    const galleryTimer = setInterval(() => {
      setActiveGallery((currentImage) =>
        currentImage === gallery.length - 1 ? 0 : currentImage + 1
      );
    }, 4000);

    return () => clearInterval(galleryTimer);
  }, [gallery.length]);

  return (
    <main className="min-h-screen overflow-hidden ">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-12">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* TEXT */}

          <div>

            <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">

              DUTA ANTI

              <br />

              <span className="text-cyan-400">
                NARKOBA
              </span>

            </h1>

            <h2 className="mt-2 text-3xl font-bold text-cyan-400">
              ~2026~
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-gray-200">
              Smart, healthy, and fun - empowering youths to
              <br />live a drug-free life.
            </p>

            <a href="#about-duta" className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition duration-200 hover:scale-[1.02] hover:shadow-cyan-400/40">
              Learn More
            </a>

          </div>


          <div className="mt-8 h-[280px] overflow-hidden rounded-2xl shadow-2xl md:h-[360px]">
            <img
              src={mainHomeImage}
              alt="Kegiatan Duta Anti Narkoba"
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
              decoding="async"
            />
          </div>

        </div>

      </section>



      {/* =====================================================
          ABOUT DUTA ANTI NARKOBA
      ====================================================== */}

      <section id="about-duta" className="mx-auto max-w-7xl scroll-mt-20 px-6 pb-16 lg:px-12">
        <Reveal>

        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-950/60 px-6 py-10 shadow-xl backdrop-blur-xl md:px-12">

          {/* liquid glow layer khusus card ini */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative z-10 grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">

          <div>

          {/* TITLE */}

          <div className="text-left">

            {/* <p className="mb-3 text-xs text-gray-300">
              ⓘ &nbsp; Tentang Duta Anti Narkoba
            </p> */}

            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              Apa itu{" "}
              <span className="text-cyan-400">
                Duta Anti Narkoba?
              </span>
            </h2>

            <p className="mt-3 max-w-[56ch] text-[15px] leading-7 text-slate-100 md:text-base">
              Duta Anti Narkoba (DAN) merupakan LSO yang
              berkomitmen menyuarakan gerakan anti narkoba
              melalui edukasi dan kegiatan sosial.
            </p>

          </div>


          {/* ROLE */}

          <div className="mt-8">

            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              Apa peran{" "}
              <span className="text-cyan-400">
                Duta Anti Narkoba?
              </span>
            </h2>

            <p className="mt-3 max-w-[62ch] text-[15px] leading-7 text-slate-100 md:text-base">
              Duta Anti Narkoba berperan sebagai pelopor dan penggerak dalam
              mencegah penyalahgunaan narkoba. Melalui edukasi, kampanye, dan
              aksi nyata, Duta Anti Narkoba mengajak generasi muda untuk berani
              menolak narkoba, memilih lingkungan yang positif, dan bersama-sama
              menciptakan masa depan yang lebih sehat, aman, dan bebas narkoba.
            </p>

          </div>

          </div>


          {/* VERTICAL GALLERY */}

          <div className="group relative w-full">

            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-800 shadow-xl">

              <div
                className="transition-transform duration-700 ease-in-out"
                style={{
                  height: `${gallery.length * 100}%`,
                  transform: `translateY(-${activeGallery * (100 / gallery.length)}%)`,
                }}
              >
                {gallery.map((item) => (
                  <div
                    key={item.name}
                    className="w-full"
                    style={{ height: `${100 / gallery.length}%` }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
              <button
                onClick={previousGallery}
                aria-label="Foto sebelumnya"
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100/40 bg-slate-950/55 text-xl text-white shadow-lg backdrop-blur-md transition duration-200 hover:scale-105 hover:border-cyan-200/70 hover:bg-cyan-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                ↑
              </button>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
              <button
                onClick={nextGallery}
                aria-label="Foto berikutnya"
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100/40 bg-slate-950/55 text-xl text-white shadow-lg backdrop-blur-md transition duration-200 hover:scale-105 hover:border-cyan-200/70 hover:bg-cyan-400/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                ↓
              </button>
            </div>

          </div>

          </div>

        </div>

        </Reveal>
      </section>



      {/* =====================================================
          EVENTS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <Reveal>

        {/* TITLE */}

        <div className="text-center">

          {/* <p className="text-xs text-gray-300">
            🗓️ &nbsp; Kegiatan Kami
          </p> */}

          <h2 className="mt-2 text-4xl font-extrabold">

            OUR{" "}

            <span className="text-cyan-400">
              EVENTS
            </span>

          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-300">

            Berbagai kegiatan inspiratif yang kami selenggarakan
            untuk <br />mewujudkan generasi bebas narkoba.

          </p>

        </div>


        {/* EVENT CARDS */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {events.map((event, index) => (

            <Reveal key={index} delay={index * 100} className="h-full">
              <div className="group relative h-56 overflow-hidden rounded-xl bg-slate-900 shadow-xl">

              {/* IMAGE PLACEHOLDER */}

              <div className="absolute inset-0 flex items-center justify-center text-5xl">
                <img
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>


              {/* DARK OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#08152e] via-transparent to-transparent" />


              {/* CONTENT */}

              <div className="absolute inset-0 p-5">

                <div className="inline-block rounded-md bg-blue-500 px-3 py-1 text-[10px] font-semibold">

                  📅 &nbsp;
                  {event.date}

                </div>


                <div className="absolute bottom-5 left-5 right-5">

                  <h3 className="text-xl font-bold">
                    {event.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-200">
                    {event.description}
                  </p>

                  <Link to="/event#filter-events" state={{ eventCategory: event.category }} className="group/detail mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-50 backdrop-blur-sm transition duration-200 hover:border-cyan-200/60 hover:bg-cyan-300/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
                    <span>Lihat Detail</span>
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover/detail:translate-x-1">→</span>
                  </Link>

                </div>

              </div>

              </div>
            </Reveal>

          ))}

        </div>


        {/* EXPLORE */}

        <div className="mt-8 text-center">

          <a
            href="/event"
            className="group inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-gradient-to-r from-cyan-400/15 via-blue-500/15 to-indigo-500/15 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-400/10 hover:shadow-cyan-500/20"
          >
            <span>Explore More Events</span>
            <span className="text-base text-cyan-300 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

        </div>

        </Reveal>
      </section>



      {/* =====================================================
          VIDEO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <Reveal>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 shadow-xl backdrop-blur-xl md:px-12">

          <div className="text-center">

            <h2 className="text-3xl font-bold md:text-4xl">
              Together Be{" "}
              <span className="text-cyan-400">
                Bright
              </span>{" "}
              Be{" "}
              <span className="text-cyan-400">
                Brave
              </span>
              .
            </h2>

            <p className="mt-3 text-sm text-gray-300">

              Saksikan kegiatan inspiratif kami dalam
              menyuarakan gerakan anti narkoba.

            </p>

          </div>


          <div className="group/video relative mx-auto mt-8 aspect-video max-w-3xl overflow-hidden rounded-xl bg-[#111d32] shadow-2xl">
            <video
              ref={activityVideoRef}
              className="h-full w-full object-cover"
              muted={isActivityVideoMuted}
              playsInline
              preload="metadata"
              aria-label="Video kegiatan Duta Anti Narkoba"
              onClick={toggleActivityVideo}
              onPlay={() => setIsActivityVideoPlaying(true)}
              onPause={() => setIsActivityVideoPlaying(false)}
              onEnded={() => setIsActivityVideoPlaying(false)}
            >
              <source src={activityVideo} type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
            {!isActivityVideoPlaying && (
              <button
                type="button"
                onClick={toggleActivityVideo}
                aria-label="Play video"
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-slate-950/55 text-white shadow-xl backdrop-blur-sm transition duration-200 hover:scale-110 hover:bg-cyan-400 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:h-20 sm:w-20"
              >
                <Play className="ml-1 h-8 w-8 fill-current sm:h-9 sm:w-9" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsActivityVideoMuted((muted) => !muted)}
              aria-label={isActivityVideoMuted ? "Unmute video" : "Mute video"}
              className="pointer-events-none absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-slate-950/60 text-white opacity-0 backdrop-blur-sm transition hover:bg-cyan-400 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 group-hover/video:pointer-events-auto group-hover/video:opacity-100 group-focus-within/video:pointer-events-auto group-focus-within/video:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"
            >
              {isActivityVideoMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>

        </div>

        </Reveal>
      </section>



      {/* =====================================================
          SPONSORS & MEDIA PARTNERS
      ====================================================== */}

      <section className="mx-auto max-w-7xl space-y-5 px-6 pb-16 lg:px-12">
        <Reveal>


        {/* SPONSORS */}

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 shadow-xl backdrop-blur-xl md:px-10">

          <h2 className="text-2xl font-bold text-white">
            Our{" "}
            <span className="text-cyan-400">
              Sponsors
            </span>
          </h2>

          <p className="mt-2 max-w-xl text-sm text-gray-300">
            Terima kasih kepada sponsor yang telah
            mendukung gerakan anti narkoba.
          </p>

          <LogoMarquee
            items={sponsors}
            label="Daftar sponsor"
            cardClassName="bg-gradient-to-b from-[#ef3f35] via-[#f04f27] to-[#f6a31b]"
          />

        </div>



        {/* MEDIA PARTNERS */}

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 shadow-xl backdrop-blur-xl md:px-10">

          <h2 className="text-2xl font-bold text-white">
            Media{" "}
            <span className="text-cyan-400">
              Partners
            </span>
          </h2>

          <p className="mt-2 max-w-xl text-sm text-gray-300">
            Berkolaborasi dengan media untuk menyebarkan
            edukasi dan informasi positif.
          </p>

          <LogoMarquee
            items={mediaPartners}
            label="Daftar media partner"
            cardClassName="bg-white"
          />

        </div>

        </Reveal>
      </section>



      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#19263d]">
        <Reveal>

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">

          <div className="grid items-center gap-10 md:grid-cols-3">


            {/* LOGO PLACEHOLDER */}

            <div className="flex justify-center md:justify-start">

              <div className="flex h-32 w-auto items-center justify-center">

                <img
                  src={danImage}
                  alt="Logo Duta Anti Narkoba UMN"
                  className="max-h-full max-w-full object-contain"
                />

              </div>

            </div>



            {/* CONTACT */}

            <div className="text-center">

              <h3 className="text-xl font-bold">
                Contact & Address
              </h3>

              <div className="mt-3 text-sm leading-relaxed text-gray-300">

                <p>
                  📍 Duta Anti Narkoba UMN
                </p>

                <p>
                  Universitas Multimedia Nusantara
                </p>

                <p>
                  Jl. Scientia Boulevard, Gading Serpong
                </p>

                <p>
                  Tangerang, Banten 15811, Indonesia
                </p>

              </div>


              <div className="mt-5 flex justify-center gap-3">
                <a
                  href="https://www.instagram.com/dutaantinarkoba.umn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Duta Anti Narkoba UMN"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-pink-500/40"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    />

                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />

                    <line
                      x1="17.5"
                      x2="17.51"
                      y1="6.5"
                      y2="6.5"
                    />
                  </svg>

                </a>

                <a
                  href="mailto:dutaantinarkoba@umn.ac.id"
                  target="_blank"
                  aria-label="Email Duta Anti Narkoba UMN"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-cyan-400/40"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <rect
                      width="20"
                      height="16"
                      x="2"
                      y="4"
                      rx="2"
                    />

                    <path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>

              </div>

            </div>



            {/* LOGO UMN */}

            <div className="flex justify-center md:justify-center">

              <div className="flex h-32 w-auto items-center justify-center">

                <img
                  src={umnImage}
                  alt="Universitas Multimedia Nusantara"
                  className="max-h-full max-w-full object-contain"
                />

              </div>

            </div>

          </div>


          {/* COPYRIGHT */}

          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-gray-500">

            © 2026 DUTA ANTI NARKOBA UMN – All Rights Reserved

          </div>

        </div>

        </Reveal>
      </footer>

    </main>
  );
}



/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-lg">
        {icon}
      </div>

      <div>

        <p className="text-xs font-semibold text-white">
          {title}
        </p>

        <p className="text-xs leading-relaxed text-gray-400">
          {text}
        </p>

      </div>

    </div>
  );
}


export default Home;