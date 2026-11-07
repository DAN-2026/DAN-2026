import { memo, useEffect, useRef, useState } from "react";

// Ulang item sampai minimal `min` kartu supaya loop tetap mulus,
// tanpa membuat belasan salinan.
function repeatToMinimum(items, min = 4) {
  if (items.length === 0) return [];
  const result = [];
  while (result.length < min) result.push(...items);
  return result;
}

function LogoMarquee({ items, label, cardClassName = "" }) {
  const rootRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animasi hanya jalan saat marquee terlihat di layar
  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const set = repeatToMinimum(items);
  const loop = [...set, ...set];

  return (
    <div ref={rootRef} className="sponsor-marquee mt-8" aria-label={label}>
      {loop.length > 0 && (
        <div
          className="sponsor-marquee-track"
          style={{
            "--marquee-duration": `${set.length * 3.5}s`,
            animationPlayState: isVisible ? "running" : "paused",
          }}
        >
          {loop.map((item, index) => {
            const isDuplicate = index >= set.length;
            return (
              <div
                key={`${item.name}-${index}`}
                className={`sponsor-marquee-card flex h-28 items-center justify-center rounded-lg p-3 transition-transform duration-300 hover:scale-[1.02] md:h-32 ${cardClassName}`}
              >
                <img
                  src={item.image}
                  alt={isDuplicate ? "" : item.name}
                  aria-hidden={isDuplicate}
                  width="320"
                  height="96"
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(LogoMarquee);
