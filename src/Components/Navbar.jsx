import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const menu = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/event' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-2 px-2 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              location.pathname === item.path
                ? 'bg-cyan-400 text-slate-900'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;