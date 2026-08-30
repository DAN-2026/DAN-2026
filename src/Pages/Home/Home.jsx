import { useState } from "react";

import danImage from "../../assets/images/logo-dan.png";
import umnImage from "../../assets/images/logo-umn.png";

function Home() {
  const [activeGallery, setActiveGallery] = useState(0);

  const gallery = [
    "Gallery 1",
    "Gallery 2",
    "Gallery 3",
    "Gallery 4",
    "Gallery 5",
  ];

  const events = [
    {
      date: "18 - 22 MEI 2026",
      title: "UMN ADW 2026",
      description:
        "Program aksi kepedulian sosial yang berfokus pada pencegahan narkoba bagi anak-anak pejuang kanker di YKAKI.",
    },
    {
      date: "15 MAR 2025",
      title: "DGTS 2025",
      description:
        "Program edukasi yang berfokus pada pencegahan penyalahgunaan narkoba di kalangan pelajar dan mahasiswa.",
    },
    {
      date: "27 NOV 2025",
      title: "AWARDING NIGHT 2025",
      description:
        "Penghargaan untuk individu dan komunitas berprestasi dalam gerakan anti narkoba.",
    },
  ];

  const nextGallery = () => {
    setActiveGallery((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1
    );
  };

  const previousGallery = () => {
    setActiveGallery((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-[#17233f] via-[#1d3c7a] to-[#174bc9] text-white">

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
              live a drug-free life.
            </p>

            <button className="mt-6 rounded-lg bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400">

              Learn More

              <span className="ml-2">
                →
              </span>

            </button>

          </div>


          {/* IMAGE PLACEHOLDER */}

          <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/40 to-cyan-400/20 shadow-2xl md:h-[360px]">

            <div className="text-center">

              <div className="mb-3 text-5xl">
                📷
              </div>

              <p className="text-sm text-gray-300">
                Hero Image
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Masukkan gambar nanti
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          ABOUT DUTA ANTI NARKOBA
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">

        <div className="rounded-2xl bg-[#1c2b48] px-6 py-10 shadow-xl md:px-12">

          {/* TITLE */}

          <div className="text-center">

            <p className="mb-3 text-xs text-gray-300">
              ⓘ &nbsp; Tentang Duta Anti Narkoba
            </p>

            <h2 className="text-2xl font-bold md:text-3xl">

              WHAT IS{" "}

              <span className="text-cyan-400">
                DUTA ANTI NARKOBA?
              </span>

            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-300">

              Duta Anti Narkoba (DAN) merupakan LSO yang
              berkomitmen menyuarakan gerakan anti narkoba
              melalui edukasi dan kegiatan sosial.

            </p>

          </div>


          {/* FEATURES */}

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <Feature
              icon="🎓"
              title="Program edukasi"
              text="Program edukasi sekolah & kampus"
            />

            <Feature
              icon="👥"
              title="Kegiatan sosial"
              text="Kegiatan sosial & komunitas"
            />

            <Feature
              icon="📢"
              title="Kampanye kreatif"
              text="Kampanye kreatif & informatif"
            />

            <Feature
              icon="♡"
              title="Komitmen positif"
              text="Komitmen positif & berdampak"
            />

          </div>


          {/* GALLERY */}

          <div className="relative mt-8">

            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">

              {gallery.map((item, index) => (

                <div
                  key={index}
                  className={`flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 text-xs text-gray-300 transition md:h-28 ${index === activeGallery
                    ? "scale-[1.03] ring-2 ring-cyan-400"
                    : ""
                    }`}
                >

                  📷 {item}

                </div>

              ))}

            </div>


            {/* LEFT BUTTON */}

            <button
              onClick={previousGallery}
              className="absolute -left-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/70 bg-[#23365b] transition hover:bg-blue-500"
            >
              ←
            </button>


            {/* RIGHT BUTTON */}

            <button
              onClick={nextGallery}
              className="absolute -right-5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/70 bg-[#23365b] transition hover:bg-blue-500"
            >
              →
            </button>

          </div>


          {/* DOTS */}

          <div className="mt-5 flex justify-center gap-2">

            {gallery.map((_, index) => (

              <button
                key={index}
                onClick={() => setActiveGallery(index)}
                className={`h-1 rounded-full transition-all ${index === activeGallery
                  ? "w-6 bg-cyan-400"
                  : "w-5 bg-gray-600"
                  }`}
              />

            ))}

          </div>

        </div>

      </section>



      {/* =====================================================
          EVENTS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">

        {/* TITLE */}

        <div className="text-center">

          <p className="text-xs text-gray-300">
            🗓️ &nbsp; Kegiatan Kami
          </p>

          <h2 className="mt-2 text-4xl font-extrabold">

            OUR{" "}

            <span className="text-cyan-400">
              EVENTS
            </span>

          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-300">

            Berbagai kegiatan inspiratif yang kami selenggarakan
            untuk mewujudkan generasi bebas narkoba.

          </p>

        </div>


        {/* EVENT CARDS */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {events.map((event, index) => (

            <div
              key={index}
              className="group relative h-56 overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-[#17233f] shadow-xl"
            >

              {/* IMAGE PLACEHOLDER */}

              <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
                📷
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

                  <button className="mt-3 rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-800 transition hover:bg-cyan-400">

                    Lihat Detail →

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* EXPLORE */}

        <div className="mt-8 text-center">

          <a
            href="/event"
            className="inline-flex items-center rounded-xl border border-white/70 bg-[#192d52] px-6 py-3 text-sm font-medium transition hover:bg-blue-500"
          >

            ▦

            <span className="mx-2">
              Explore More Events
            </span>

            →

          </a>

        </div>

      </section>



      {/* =====================================================
          VIDEO
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">

        <div className="rounded-2xl bg-[#1c2b48] px-6 py-10 shadow-xl md:px-12">

          <div className="text-center">

            <h2 className="text-3xl font-bold md:text-4xl">

              <span className="text-cyan-400">
                Stay
              </span>{" "}

              Sharp,{" "}

              <span className="text-cyan-400">
                Stay
              </span>{" "}

              Strong,{" "}

              <span className="text-cyan-400">
                Stay
              </span>{" "}

              Clean.

            </h2>

            <p className="mt-3 text-sm text-gray-300">

              Saksikan kegiatan inspiratif kami dalam
              menyuarakan gerakan anti narkoba.

            </p>

          </div>


          {/* VIDEO PLACEHOLDER */}

          <div className="mx-auto mt-8 flex aspect-video max-w-3xl items-center justify-center overflow-hidden rounded-xl bg-[#111d32] shadow-2xl">

            <div className="text-center">

              <div className="mb-3 text-5xl">
                ▶
              </div>

              <p className="text-sm text-gray-300">
                Video Kegiatan
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Video dapat ditambahkan nanti
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          SPONSORS & MEDIA PARTNERS
      ====================================================== */}

      <section className="mx-auto grid max-w-7xl gap-5 px-6 pb-16 md:grid-cols-2 lg:px-12">


        {/* SPONSORS */}

        <div className="rounded-2xl bg-[#1c2b48] px-8 py-10 text-center shadow-xl">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-xl">
            🤝
          </div>

          <h2 className="mt-4 text-2xl font-bold">

            Our{" "}

            <span className="text-cyan-400">
              Sponsors
            </span>

          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm text-gray-300">

            Terima kasih kepada sponsor yang telah
            mendukung gerakan anti narkoba.

          </p>


          {/* SPONSOR PLACEHOLDER */}

          <div className="mt-8 flex h-28 items-center justify-center rounded-xl bg-[#19263d]">

            <p className="text-sm text-gray-500">
              Sponsor Logos
            </p>

          </div>


          <div className="mt-5 flex items-center justify-between">

            <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/60 transition hover:bg-blue-500">
              ←
            </button>

            <div className="flex gap-2">

              <span className="h-1 w-5 rounded bg-gray-600"></span>

              <span className="h-1 w-5 rounded bg-cyan-400"></span>

              <span className="h-1 w-5 rounded bg-gray-600"></span>

            </div>

            <button className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/60 transition hover:bg-blue-500">
              →
            </button>

          </div>

        </div>



        {/* MEDIA PARTNERS */}

        <div className="rounded-2xl bg-[#1c2b48] px-8 py-10 text-center shadow-xl">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-700 text-xl">
            📢
          </div>

          <h2 className="mt-4 text-2xl font-bold">

            Media{" "}

            <span className="text-cyan-400">
              Partners
            </span>

          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm text-gray-300">

            Berkolaborasi dengan media untuk menyebarkan
            edukasi dan informasi positif.

          </p>


          {/* MEDIA PLACEHOLDERS */}

          <div className="mt-7 grid grid-cols-4 gap-3 rounded-xl bg-[#19263d] p-5 sm:grid-cols-5">

            {Array.from({ length: 10 }).map((_, index) => (

              <div
                key={index}
                className="flex h-10 items-center justify-center rounded-md bg-white text-xs text-gray-500"
              >

                Logo {index + 1}

              </div>

            ))}

          </div>


          <div className="mt-5 flex justify-center gap-2">

            <span className="h-1 w-5 rounded bg-gray-600"></span>

            <span className="h-1 w-5 rounded bg-cyan-400"></span>

            <span className="h-1 w-5 rounded bg-gray-600"></span>

          </div>

        </div>

      </section>



      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#19263d]">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">

          <div className="grid items-center gap-10 md:grid-cols-3">


            {/* LOGO PLACEHOLDER */}

            <div className="flex justify-center md:justify-start">

              <div className="flex h-28 w-28 items-center justify-center">

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

            <div className="flex justify-center md:justify-end">

              <div className="flex h-28 w-24 items-center justify-center">

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