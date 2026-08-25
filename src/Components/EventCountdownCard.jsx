import Countdown from './Countdown';
import logo from '../assets/logo.png';

function EventCountdownCard({ title, targetDate }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto px-4">
      
      {/* Card countdown - kiri */}
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl text-center">
        <h2 className="text-xl font-semibold text-white mb-6">{title}</h2>
        <Countdown targetDate={targetDate} />
      </div>

      {/* Logo + teks - kanan */}
      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="Logo" className="w-32 h-32 object-contain mb-4 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]" />
        <h1 className="text-3xl font-bold text-cyan-300 leading-tight">
          Duta Anti<br />Narkoba
        </h1>
        <p className="text-white/70 mt-2">Smart, Healthy, and Fun</p>
      </div>

    </div>
  );
}

export default EventCountdownCard;