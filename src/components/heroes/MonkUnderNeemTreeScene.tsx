export default function MonkUnderNeemTreeScene() {
  const leaves = [
    { x: 110, delay: 0, duration: 11, drift: 35, size: 5 },
    { x: 190, delay: 2.3, duration: 13, drift: -28, size: 4 },
    { x: 255, delay: 4.8, duration: 9.5, drift: 38, size: 5 },
    { x: 310, delay: 1.1, duration: 12, drift: -22, size: 4 },
    { x: 360, delay: 3.6, duration: 10.5, drift: 30, size: 4.5 },
  ];

  const stars = [
    { x: 60, y: 30, r: 1.1, o: 0.7 },
    { x: 140, y: 18, r: 0.8, o: 0.5 },
    { x: 500, y: 25, r: 1, o: 0.6 },
    { x: 560, y: 70, r: 0.7, o: 0.45 },
    { x: 620, y: 20, r: 1.2, o: 0.6 },
    { x: 720, y: 50, r: 0.8, o: 0.5 },
    { x: 400, y: 15, r: 0.7, o: 0.4 },
  ];

  return (
    <div className="monk-scene" aria-hidden="true">
      <svg
        viewBox="0 0 760 320"
        preserveAspectRatio="xMidYMax slice"
        role="img"
        aria-label="An old monk meditates beneath a neem tree while a disciple bows and asks how to find their ikigai"
      >
        <defs>
          <linearGradient id="duskSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#201a35" />
            <stop offset="45%" stopColor="#3c3156" />
            <stop offset="78%" stopColor="#6b5470" />
            <stop offset="100%" stopColor="#8a6a72" />
          </linearGradient>
          <radialGradient id="duskMoon" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbf0d8" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#f3e3bf" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f3e3bf" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="groundGlow" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#cdb98a" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#cdb98a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="canopyShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2238" />
            <stop offset="100%" stopColor="#15111f" />
          </linearGradient>
          <linearGradient id="figureRim" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#f3e3bf" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f3e3bf" stopOpacity="0" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <rect x="0" y="0" width="760" height="320" fill="url(#duskSky)" />

        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#f3e3bf" opacity={s.o} />
        ))}

        <circle cx="650" cy="52" r="58" fill="url(#duskMoon)" />
        <circle cx="650" cy="52" r="21" fill="#fbf0d8" />
        <circle cx="650" cy="52" r="21" fill="#2a2238" opacity="0.12" />

        <ellipse cx="380" cy="302" rx="420" ry="26" fill="#120f1a" opacity="0.55" />
        <ellipse cx="300" cy="290" rx="300" ry="60" fill="url(#groundGlow)" />

        {/* neem tree: layered canopy for depth, slender trunk with root flare */}
        <g>
          <path
            d="M258 302 C 256 255, 247 222, 245 195 C 244 180, 250 166, 250 166 L 260 166 C 260 166, 254 182, 256 196 C 260 222, 268 258, 268 302 Z M 240 300 C 244 294, 254 294, 258 300 M 258 300 C 262 294, 272 294, 276 300"
            fill="#15111f"
          />
          <ellipse cx="248" cy="156" rx="17" ry="52" fill="#15111f" />

          <g fill="url(#canopyShade)">
            <ellipse cx="175" cy="128" rx="58" ry="40" />
            <ellipse cx="245" cy="98" rx="66" ry="46" />
            <ellipse cx="320" cy="120" rx="60" ry="42" />
            <ellipse cx="205" cy="168" rx="52" ry="36" />
            <ellipse cx="285" cy="165" rx="54" ry="36" />
            <ellipse cx="255" cy="72" rx="44" ry="32" />
          </g>

          {/* moonlit rim on canopy's upper-right edge */}
          <g fill="none" stroke="#f3e3bf" strokeWidth="1.4" opacity="0.3" strokeLinecap="round">
            <path d="M 300 80 C 330 82, 360 95, 372 112" />
            <path d="M 330 108 C 350 112, 368 126, 376 142" />
          </g>
        </g>

        {/* seated monk: cross-legged, robe draped over shoulders, hands resting */}
        <g transform="translate(252 272)">
          <ellipse cx="0" cy="34" rx="52" ry="12" fill="#0e0b16" opacity="0.5" />
          {/* folded legs */}
          <path d="M-46 24 C -40 10, -20 2, 0 2 C 20 2, 40 10, 46 24 C 46 32, 34 38, 0 38 C -34 38, -46 32, -46 24 Z" fill="#17121f" />
          {/* torso + robe */}
          <path d="M-28 -2 C -30 -28, -16 -48, 0 -48 C 16 -48, 30 -28, 28 -2 C 24 10, -24 10, -28 -2 Z" fill="#1a1423" />
          {/* draped shoulder fold */}
          <path d="M-28 -2 C -34 4, -36 14, -30 22 C -22 16, -18 6, -18 -2 Z" fill="#120e1a" />
          <path d="M28 -2 C 34 4, 36 14, 30 22 C 22 16, 18 6, 18 -2 Z" fill="#120e1a" />
          {/* resting hands */}
          <ellipse cx="0" cy="16" rx="10" ry="6" fill="#120e1a" />
          {/* head + subtle topknot */}
          <circle cx="0" cy="-60" r="13" fill="#1a1423" />
          <ellipse cx="0" cy="-74" rx="5" ry="4" fill="#1a1423" />
          {/* moonlit rim light along right side */}
          <path
            d="M27 -4 C 29 -26, 18 -45, 4 -48 M12 -62 C 12 -68, 8 -72, 2 -73"
            fill="none"
            stroke="url(#figureRim)"
            strokeWidth="2"
            opacity="0.8"
          />
        </g>

        {/* disciple: standing, bowed forward, palms together in question */}
        <g transform="translate(420 288) rotate(-8)">
          <ellipse cx="0" cy="22" rx="30" ry="8" fill="#0e0b16" opacity="0.45" />
          {/* robe, standing, slight forward lean baked into rotation */}
          <path d="M-17 18 C -20 -4, -16 -30, 0 -62 C 16 -30, 20 -4, 17 18 C 12 24, -12 24, -17 18 Z" fill="#1a1423" />
          {/* arms drawn in, hands together at chest in a gesture of asking */}
          <path d="M-17 -6 C -26 -2, -30 8, -24 16 C -17 10, -14 0, -14 -8 Z" fill="#120e1a" />
          <path d="M17 -6 C 26 -2, 30 8, 24 16 C 17 10, 14 0, 14 -8 Z" fill="#120e1a" />
          <ellipse cx="0" cy="4" rx="7" ry="5" fill="#0e0b16" />
          {/* head, tilted slightly toward the monk */}
          <circle cx="2" cy="-74" r="11" fill="#1a1423" />
          {/* moonlit rim */}
          <path
            d="M17 16 C 20 -4, 17 -32, 2 -62"
            fill="none"
            stroke="url(#figureRim)"
            strokeWidth="1.8"
            opacity="0.75"
          />
        </g>

        {/* the question, spoken into the dusk air near the disciple */}
        <g transform="translate(508 150)">
          <ellipse cx="0" cy="0" rx="118" ry="30" fill="#fbf0d8" opacity="0.05" filter="url(#softGlow)" />
          <text
            x="0"
            y="-6"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontStyle="italic"
            fontSize="15"
            fill="#f3e7cf"
            opacity="0.92"
          >
            &ldquo;How do I find my ikigai, sir?&rdquo;
          </text>
          <line x1="-54" y1="10" x2="-18" y2="10" stroke="#f3e7cf" strokeWidth="0.75" opacity="0.3" />
          <line x1="18" y1="10" x2="54" y2="10" stroke="#f3e7cf" strokeWidth="0.75" opacity="0.3" />
        </g>

        {/* falling neem leaves */}
        {leaves.map((l, i) => (
          <ellipse
            key={i}
            className="leaf"
            cx={l.x}
            cy="68"
            rx={l.size}
            ry={l.size / 2}
            fill="#c3d19f"
            opacity="0.85"
            style={{
              // @ts-expect-error -- CSS custom properties
              "--drift": `${l.drift}px`,
              "--duration": `${l.duration}s`,
              "--delay": `${l.delay}s`,
            }}
          />
        ))}
      </svg>

      <style>{`
        .monk-scene {
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          background: #15111f;
        }
        .monk-scene svg {
          display: block;
          width: 100%;
          height: auto;
        }
        .leaf {
          animation: leaf-fall var(--duration) linear var(--delay) infinite;
          transform-origin: center;
        }
        @keyframes leaf-fall {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          8% { opacity: 0.85; }
          100% {
            transform: translate(var(--drift), 230px) rotate(220deg);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .leaf { animation: none; opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
