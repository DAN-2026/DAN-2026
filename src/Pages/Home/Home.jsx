import { useEffect, useState } from "react";

import danImage from "../../assets/logoutama/logo-dan.png";
import umnImage from "../../assets/logoutama/logo-umn.png";

import galleryImage1 from "../../assets/gallery/gallery1.jpg";
import galleryImage2 from "../../assets/gallery/gallery2.jpg";
import galleryImage3 from "../../assets/gallery/gallery3.jpg";
import galleryImage4 from "../../assets/gallery/gallery4.jpg";
import galleryImage5 from "../../assets/gallery/gallery5.jpg";

import accountingCharityImage from "../../assets/mediaPartner/ACCOUNTINGCHARITY 2026.png";
import himsiImage from "../../assets/mediaPartner/HIMSI.jpg";
import isfestImage from "../../assets/mediaPartner/ISFEST.jpg";
import imkomImage from "../../assets/mediaPartner/IMKOM.png";
import misterMissImage from "../../assets/mediaPartner/MISTERMISSTRANSPARENT.png";
import starlightImage from "../../assets/mediaPartner/STARLIGHT.png";
import teaterKataImage from "../../assets/mediaPartner/TeaterKataK.jpg";
import traceImage from "../../assets/mediaPartner/TRACCE.png";
import ultimagzImage from "../../assets/mediaPartner/Ultimagz.png";
import umnEcoImage from "../../assets/mediaPartner/UMNECO_.png";
import umnMedicalImage from "../../assets/mediaPartner/UMNMEDICALCENTER.png";
import umnProgrammingImage from "../../assets/mediaPartner/UMNProgammingPC.png";
import umnRadioImage from "../../assets/mediaPartner/UMNRADIO.png";

import sponsor1Image from "../../assets/sponsor/sponsor1.png";
import sponsor2Image from "../../assets/sponsor/sponsor2.png";
import sponsor3Image from "../../assets/sponsor/sponsor3.png";
import sponsor4Image from "../../assets/sponsor/sponsor4.png";
import sponsor5Image from "../../assets/sponsor/sponsor5.png";
import sponsor6Image from "../../assets/sponsor/sponsor6.png";
import sponsor7Image from "../../assets/sponsor/sponsor7.png";

function Home() {
  const [activeGallery, setActiveGallery] = useState(0);
  const [sponsorSlide, setSponsorSlide] = useState(0);
  const [mediaPartnerSlide, setMediaPartnerSlide] = useState(0);

  const gallery = [
    {
      name: "Gallery 1",
      image: galleryImage1,
    },
    {
      name: "Gallery 2",
      image: galleryImage2,
    },
    {
      name: "Gallery 3",
      image: galleryImage3,
    },
    {
      name: "Gallery 4",
      image: galleryImage4,
    },
    {
      name: "Gallery 5",
      image: galleryImage5,
    },
  ];

  const sponsors = [
    {
      name: "Sponsor 1",
      image: sponsor1Image,
    },
    {
      name: "Sponsor 2",
      image: sponsor2Image,
    },
    {
      name: "Sponsor 3",
      image: sponsor3Image,
    },
    {
      name: "Sponsor 4",
      image: sponsor4Image,
    },
    {
      name: "Sponsor 5",
      image: sponsor5Image,
    },
    {
      name: "Sponsor 6",
      image: sponsor6Image,
    },
    {
      name: "Sponsor 7",
      image: sponsor7Image,
    },
  ];

  const events = [
    {
      date: "27 JUNI 2026",
      title: "UMN ADW 2026",
      description:
        "Program aksi kepedulian sosial bagi anak-anak pejuang kanker di YKAKI.",
        name: "UMN ADW 2026",
        image: galleryImage2,
    },
    {
      date: "15 OKTOBER 2026",
      title: "DGTS 2026",
      description:
        "Program edukasi yang berfokus pada pencegahan penyalahgunaan narkoba di kalangan pelajar dan mahasiswa.",
    },
    {
      date: "25 NOVEMBER 2026",
      title: "AWARDING NIGHT 2026",
      description:
        "Malam puncak bagi para peserta dan finalis yang telah berpartisipasi dalam kegiatan Duta Anti Narkoba.",
    },
  ];

  // const nextGallery = () => {
  //   setActiveGallery((prev) =>
  //     prev === gallery.length - 1 ? 0 : prev + 1
  //   );
  // };

  // const previousGallery = () => {
  //   setActiveGallery((prev) =>
  //     prev === 0 ? gallery.length - 1 : prev - 1
  //   );
  // };
  const sponsorsPerSlide = 2;

  const totalSponsorSlides = Math.ceil(
    sponsors.length / sponsorsPerSlide
  );

  const mediaPartners = [
    {
      name: "ACCOUNTING CHARITY 2026",
      image: accountingCharityImage,
    },
    {
      name: "HIMSI",
      image: himsiImage,
    },
    {
      name: "IMKOM",
      image: imkomImage,
    },
    {
      name: "ISFEST",
      image: isfestImage,
    },
    {
      name: "MISTER MISS",
      image: misterMissImage,
    },
    {
      name: "STARLIGHT",
      image: starlightImage,
    },
    {
      name: "TeaterKataK",
      image: teaterKataImage,
    },
    {
      name: "TRACCE",
      image: traceImage,
    },
    {
      name: "Ultimagz",
      image: ultimagzImage,
    },
    {
      name: "UMNECO",
      image: umnEcoImage,
    },
    {
      name: "UMN Medical Center",
      image: umnMedicalImage,
    },
    {
      name: "UMN Programming PC",
      image: umnProgrammingImage,
    },
    {
      name: "UMN Radio",
      image: umnRadioImage,
    },
  ];

  const mediaPartnersPerSlide = 2;
  const totalMediaPartnerSlides = Math.ceil(
    mediaPartners.length / mediaPartnersPerSlide
  );

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setSponsorSlide((currentSlide) =>
        currentSlide === totalSponsorSlides - 1 ? 0 : currentSlide + 1
      );
      setMediaPartnerSlide((currentSlide) =>
        currentSlide === totalMediaPartnerSlides - 1 ? 0 : currentSlide + 1
      );
    }, 4000);

    return () => clearInterval(carouselTimer);
  }, [totalMediaPartnerSlides, totalSponsorSlides]);

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

            <button className="mt-6 rounded-lg bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400">

              Learn More

              <span className="ml-2">
                →
              </span>

            </button>

          </div>


          {/* IMAGE PLACEHOLDER */}

          <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/40 to-cyan-400/20 shadow-2xl md:h-[360px] mt-8">

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

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-10 shadow-xl backdrop-blur-xl md:px-12">

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

            <h2 className="text-2xl font-bold md:text-3xl">

              WHAT IS{" "}

              <span className="text-cyan-400">
                DUTA ANTI NARKOBA?
              </span>

            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-200 md:text-base">

              Duta Anti Narkoba (DAN) merupakan LSO yang
              berkomitmen menyuarakan gerakan anti narkoba
              melalui edukasi dan kegiatan sosial.

            </p>

          </div>


          {/* ROLE */}

          <div className="mt-8">

            <h2 className="text-2xl font-bold md:text-3xl">
              WHAT IS{" "}
              <span className="text-cyan-400">
                THE ROLE OF DUTA ANTI NARKOBA?
              </span>
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-200 md:text-base">
              Duta Anti Narkoba berperan sebagai pelopor dan penggerak dalam
              mencegah penyalahgunaan narkoba. Melalui edukasi, kampanye, dan
              aksi nyata, Duta Anti Narkoba mengajak generasi muda untuk berani
              menolak narkoba, memilih lingkungan yang positif, dan bersama-sama
              menciptakan masa depan yang lebih sehat, aman, dan bebas narkoba.
            </p>

          </div>

          </div>


          {/* VERTICAL GALLERY */}

          <div className="relative w-full">

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
                    />
                  </div>
                ))}
              </div>

            </div>

            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2 rounded-full bg-slate-950/40 p-2">
              {gallery.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setActiveGallery(index)}
                  aria-label={`Tampilkan ${item.name}`}
                  className={`h-2 w-2 rounded-full transition-all ${activeGallery === index
                    ? "h-6 bg-cyan-400"
                    : "bg-white/50"
                    }`}
                />
              ))}
            </div>

          </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          EVENTS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">

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

            <div
              key={index}
              className="group relative h-56 overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-[#17233f] shadow-xl"
            >

              {/* IMAGE PLACEHOLDER */}

              <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
                <img
                src={event.image} 
                alt={event.title} 
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

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 shadow-xl backdrop-blur-xl md:px-12">

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

      <section className="mx-auto max-w-7xl space-y-5 px-6 pb-16 lg:px-12">


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

          <div className="mt-8 flex items-center gap-3">

            <button
              onClick={() =>
                setSponsorSlide(
                  sponsorSlide === 0
                    ? totalSponsorSlides - 1
                    : sponsorSlide - 1
                )
              }
              aria-label="Sponsor sebelumnya"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-xl text-white transition hover:bg-white/10"
            >
              ←
            </button>

            <div className="min-w-0 flex-1 overflow-hidden">

              <div className="grid grid-cols-2 gap-3">

                {sponsors
                  .slice(
                    sponsorSlide * sponsorsPerSlide,
                    sponsorSlide * sponsorsPerSlide + sponsorsPerSlide
                  )
                  .map((sponsor) => (
                    <div
                      key={sponsor.name}
                        className="flex h-28 items-center justify-center rounded-lg bg-white p-3 transition duration-300 hover:scale-[1.02] md:h-32"
                    >
                      <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}

              </div>

            </div>


            <button
              onClick={() =>
                setSponsorSlide(
                  sponsorSlide === totalSponsorSlides - 1
                    ? 0
                    : sponsorSlide + 1
                )
              }
              aria-label="Sponsor berikutnya"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-xl text-white transition hover:bg-white/10"
            >
              →
            </button>

          </div>


          <div className="mt-5 flex justify-center gap-2">

            {Array.from({ length: totalSponsorSlides }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setSponsorSlide(index)}
                  className={`h-1 rounded-full transition-all ${sponsorSlide === index
                    ? "w-8 bg-cyan-400"
                    : "w-5 bg-gray-600"
                    }`}
                />
              )
            )}

          </div>

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

          <div className="mt-8 flex items-center gap-3">

            <button
              onClick={() =>
                setMediaPartnerSlide(
                  mediaPartnerSlide === 0
                    ? totalMediaPartnerSlides - 1
                    : mediaPartnerSlide - 1
                )
              }
              aria-label="Media partner sebelumnya"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-xl text-white transition hover:bg-white/10"
            >
              ←
            </button>

            <div className="min-w-0 flex-1 overflow-hidden">

              <div className="grid grid-cols-2 gap-3">

              {mediaPartners
                .slice(
                  mediaPartnerSlide * mediaPartnersPerSlide,
                  mediaPartnerSlide * mediaPartnersPerSlide + mediaPartnersPerSlide
                )
                .map((partner) => (
                <div
                  key={partner.name}
                  className="flex h-28 items-center justify-center rounded-lg bg-white p-3 transition duration-300 hover:scale-[1.02] md:h-32"
                >
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                ))}

            </div>

            </div>

            <button
              onClick={() =>
                setMediaPartnerSlide(
                  mediaPartnerSlide === totalMediaPartnerSlides - 1
                    ? 0
                    : mediaPartnerSlide + 1
                )
              }
              aria-label="Media partner berikutnya"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-xl text-white transition hover:bg-white/10"
            >
              →
            </button>

          </div>

          <div className="mt-5 flex justify-center gap-2">

            {Array.from({ length: totalMediaPartnerSlides }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setMediaPartnerSlide(index)}
                  aria-label={`Tampilkan media partner slide ${index + 1}`}
                  className={`h-1 rounded-full transition-all ${mediaPartnerSlide === index
                    ? "w-8 bg-cyan-400"
                    : "w-5 bg-gray-600"
                    }`}
                />
              )
            )}

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