import { ArrowRight } from "lucide-react";

const VOTE_FORM_URL =
  import.meta.env.VITE_VOTE_FORM_URL || "https://forms.gle/CUyu9FpXEnTs4svU7";

const STEPS = [
  "Klik tombol “Vote Sekarang” untuk membuka formulir voting.",
  "Isi data dirimu: nama lengkap, status (internal atau eksternal), NIM, angkatan, dan prodi. Kalau eksternal, NIM dan prodi cukup diisi “-”.",
  "Pilih satu kandidat favoritmu dari 10 finalis (No 1 sampai No 10).",
  "Bayar lewat QRIS yang ada di formulir. 1 vote = Rp2.000, boleh lebih dari 1 vote.",
  "Upload bukti transfer dengan nama file NamaKandidat_JumlahVote, contoh: GwenMichael_1.",
  "Klik Submit. Selesai!",
];

function HowToVoting() {
  return (
    <div className="mx-auto max-w-4xl text-white">
      <div className="text-center">
        <h3 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Cara <span className="text-cyan-300">Voting</span>
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-100/75 md:text-base">
          Dukung kandidat favoritmu di Top 10 Duta Anti Narkoba. Setiap vote bernilai Rp2.000.
        </p>
      </div>

      <ol className="mt-7 space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        {STEPS.map((text, index) => (
          <li key={text} className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-bold text-cyan-300">
              {index + 1}
            </span>
            <p className="text-sm leading-6 text-blue-100/75 md:text-base">{text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-7 text-center">
        <a
          href={VOTE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
        >
          Vote Sekarang
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default HowToVoting;