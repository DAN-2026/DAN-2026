import { Suspense, lazy, useEffect, useState } from "react";
import aboutUsBackground from "../../assets/Background DAN.png";

const SolarSystem = lazy(() => import("../../Components/SolarSystem"));

{/*BUAT FOOTER*/}
import danImage from "../../assets/logoutama/logo-dan.png";
import umnImage from "../../assets/logoutama/logo-umn.png";


function FAQ({Qstn,Answ})
{
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800 py-5 last:border-none">
      <button onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-white"
      >
        <div className="flex items-center gap-4">
          <span className={`flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold transition-colors ${
            isOpen ? 'bg-cyan-500 text-slate-900' : 'bg-cyan-400/20 text-cyan-400'
          }`}>
            {isOpen ? "−" : "+"}
          </span>
          <span className="text-lg font-medium">{Qstn}</span>
        </div>
      </button>
      {isOpen && 
      (
        <div className="mt-4 pl-12 text-slate-400 leading-relaxed text-sm animate-fade-in">
          {Answ}
        </div>
      )}
    </div>
  );
}

function AboutUs() 
{
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

  return (
    <main className="pt-8 min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-12">
        
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-white text-5xl font-extrabold leading-tight md:text-6xl">
              Duta Anti
              <br />
              Narkoba
              <br />
              <span className="text-cyan-400">
                  FAQ
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-gray-200">
              Empowering youths to live a drug-free life. <br />
              Smart, healthy, and fun! 
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-xl">
            <FAQ Qstn="Apa itu Duta Anti Narkoba?" 
            Answ="Duta Anti Narkoba adalah program edukatif yang bertujuan untuk 
            meningkatkan kesadaran dan peran generasi muda dalam memerangi 
            penyalahgunaan narkoba melalui pendidikan, kampanye, dan kegiatan 
            positif di sekolah maupun masyarakat."/>
            <FAQ Qstn="Bagaimana cara ikut program?" 
            Answ="Kamu bisa ikut serta di berbagai kegiatan publik Duta Anti Narkoba seperti Anti-Drugs Week, DAN Goes To School, atau Awarding Night — info pendaftaran biasanya dibuka lewat Instagram @dutaantinarkoba.umn. Kalau tertarik jadi bagian resmi tim Duta Anti Narkoba, ada proses seleksi (karantina) yang dibuka tiap periode kepengurusan baru."/>
            <FAQ Qstn="Apakah program ini gratis?" 
            Answ="Ya, seluruh kegiatan dan program edukasi yang diselenggarakan Duta Anti Narkoba UMN terbuka dan gratis untuk diikuti oleh mahasiswa maupun masyarakat umum."/>
          </div>        
        </div>

        <div className="pt-12 grid items-center gap-12 lg:grid-cols-2">
          <div className="flex h-[280px] items-center justify-center overflow-hidden 
          rounded-2xl bg-slate-500 shadow-2xl md:h-[360px] mt-8">
            <div className="text-center">
              <p className="text-sm text-gray-300">
                Idk
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Masukkan gambar nanti maybe?
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-white text-5xl font-extrabold leading-tight md:text-5xl">
              Apa itu
              <br />
              <span className="text-cyan-400">
                  Duta Anti Narkoba?
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-gray-200">
              Duta Anti Narkoba (DAN) UMN merupakan LSO (Lembaga 
              Semi Otonom) yang menyuarakan gerakan anti narkoba baik 
              secara internal maupun eksternal, sesuai dengan esensi 
              kampus yang menolak segala bentuk penyalahgunaan 
              narkoba. Tagline “Stay Sharp, Stay Strong, Stay Clean!” ingin 
              membawakan pesan bahwa penyalahgunaan narkoba kepada 
              semua kalangan.
            </p>
          </div>      
        </div>

        <div className="pt-12">
          <div>
            <h1 className="text-white text-4xl font-extrabold leading-tight md:text-5xl">
              Visi, Misi, <span className="text-cyan-400">dan Tagline</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-200 md:text-base">
              Kami berkomitmen untuk menciptakan generasi muda yang sehat,
              berkarakter, dan bebas dari penyalahgunaan narkoba melalui
              edukasi, aksi nyata, dan kolaborasi bersama.
            </p>
          </div>      
        </div>

        <div className="grid gap-6 pb-10 pt-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <div>
              <p className="text-3xl font-bold leading-tight text-white md:text-4xl">
                Visi
              </p>
              <p className="mt-5 text-sm leading-7 text-gray-200 md:text-base">
                Menjadi lembaga generasi yang berintegritas, berdaya saing, dan berkontribusi dalam mewujudukan Indonesia yang bebas dari narkoba.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <div>
              <p className="text-3xl font-bold leading-tight text-white md:text-4xl">
                Misi
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-bold text-cyan-400">1</span>
                  <p className="text-sm leading-6 text-gray-200">Menyelenggarakan edukasi dan sosialisasi tentang bahaya narkoba.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-bold text-cyan-400">2</span>
                  <p className="text-sm leading-6 text-gray-200">Meningkatkan kesadaran dan peran generasi muda.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-bold text-cyan-400">3</span>
                  <p className="text-sm leading-6 text-gray-200">Membangun kolaborasi dengan berbagai pihak untuk pencegahan dan penanggulangan narkoba.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <div>
              <p className="text-3xl font-bold leading-tight text-white md:text-4xl">
                Tagline
              </p>
              <p className="mt-5 text-2xl font-bold leading-tight text-cyan-400 md:text-3xl">
                “Stay Sharp, Stay Strong, Stay Clean!”
              </p>
            </div>
          </div>
        </div>
      </div>

       {/* TATA SURYA DIVISI */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-12">
        <h1 className="text-white text-5xl font-extrabold leading-tight md:text-5xl">
          Divisi <span className="text-cyan-400">Kami</span>
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-gray-200">
          Klik planet untuk mengenal tiap divisi.
        </p>
       <div
        className="mt-8"
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse closest-side at center, black 60%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse closest-side at center, black 60%, transparent 100%)',
           }}
        >
        <Suspense fallback={<div className="flex h-[500px] w-full items-center justify-center rounded-2xl border border-white/10 bg-slate-900/40 text-sm text-slate-300 md:h-[650px]">Memuat divisi kami...</div>}>
          <SolarSystem />
        </Suspense>
    </div>
      </section>

      <footer className="bg-[#19263d]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <div className="grid items-center gap-10 md:grid-cols-3">
            <div className="flex justify-center md:justify-start"> {/* LOGO PLACEHOLDER */}
              <div className="flex h-32 w-auto items-center justify-center">
                <img
                  src={danImage}
                  alt="Logo Duta Anti Narkoba UMN"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            <div className="text-center"> {/* CONTACT */}
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

            <div className="flex justify-center md:justify-center"> {/* LOGO UMN */}
              <div className="flex h-32 w-auto items-center justify-center">
                <img src={umnImage} alt="Universitas Multimedia Nusantara" className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-gray-500">{/* COPYRIGHT */}
            © 2026 DUTA ANTI NARKOBA UMN – All Rights Reserved
          </div>
        </div>
      </footer>
    </main>
  );
}

export default AboutUs;