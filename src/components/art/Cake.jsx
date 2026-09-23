/**
 * The cake on the landing page. Drawn rather than photographed, so it holds up
 * until real photography exists — and keeps holding up after, as a mascot.
 *
 * Icing is built as one path: across the top, down the side, then back along
 * the bottom as a run of arcs of uneven depth, which is what makes it drip
 * like icing instead of scalloping like a doily.
 */

const INK = "#12301E";
const SPRINKLE = ["#C7365A", "#237046", "#E4681F", "#F3A81C"];

const icingPath = (x, y, w, h, depths) => {
  const step = w / depths.length;
  const drips = depths.map((depth) => `a${step / 2},${depth} 0 0,0 -${step},0`).join(" ");
  return `M${x},${y} h${w} v${h} ${drips} Z`;
};

const Tier = ({ x, y, w, h, body, icing, depths, sprinkles = [] }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="9" fill={body} />

    {sprinkles.map(([sx, sy, angle], i) => (
      <rect
        key={i}
        x={x + sx}
        y={y + sy}
        width="10"
        height="4.5"
        rx="2.2"
        fill={SPRINKLE[i % SPRINKLE.length]}
        stroke="none"
        transform={`rotate(${angle} ${x + sx + 5} ${y + sy + 2})`}
      />
    ))}

    <path d={icingPath(x, y, w, 20, depths)} fill={icing} />
  </g>
);

const Candle = ({ x, base, height }) => {
  const top = base - height;
  return (
    <g>
      <rect x={x} y={top} width="12" height={height} rx="5" fill="#FBF1DD" />
      <path
        d={`M${x},${top + 10} h12 M${x},${top + 22} h12 M${x},${top + 34} h12`}
        stroke="#D9541F"
        strokeWidth="5"
        strokeLinecap="butt"
      />
      <rect x={x} y={top} width="12" height={height} rx="5" fill="none" />

      <g className="flame" style={{ transformOrigin: `${x + 6}px ${top}px` }}>
        <path
          d={`M${x + 6},${top - 20} c9,10 12,15 12,21 a12,12 0 0,1 -24,0 c0,-6 3,-11 12,-21 Z`}
          fill="#F3A81C"
        />
        <path
          d={`M${x + 6},${top - 8} c4,5 6,8 6,11 a6,6 0 0,1 -12,0 c0,-3 2,-6 6,-11 Z`}
          fill="#FBF1DD"
          stroke="none"
        />
      </g>
    </g>
  );
};

export default function Cake({ className = "" }) {
  return (
    <svg
      viewBox="0 0 320 400"
      className={className}
      role="img"
      aria-label="A three tier celebration cake with lit candles"
      stroke={INK}
      strokeWidth="3.5"
      strokeLinejoin="round"
    >
      {/* stand */}
      <ellipse cx="160" cy="382" rx="74" ry="11" fill="#1A5535" />
      <path d="M146,330 h28 v42 q-14,7 -28,0 Z" fill="#1A5535" />
      <ellipse cx="160" cy="330" rx="112" ry="16" fill="#237046" />

      {/* tiers, bottom to top */}
      <Tier
        x={48} y={242} w={224} h={82}
        body="#F6E3C5" icing="#D9541F"
        depths={[11, 19, 13, 23, 15, 21, 12, 18, 14]}
        sprinkles={[[38, 50, -18], [94, 64, 24], [148, 46, 8], [194, 62, -32]]}
      />
      <Tier
        x={78} y={176} w={164} h={70}
        body="#FBF1DD" icing="#E4681F"
        depths={[12, 19, 11, 21, 14, 17, 12]}
        sprinkles={[[32, 48, 22], [84, 40, -14], [126, 52, 36]]}
      />
      <Tier
        x={106} y={118} w={108} h={62}
        body="#F6E3C5" icing="#D9541F"
        depths={[11, 17, 12, 19, 13]}
        sprinkles={[[24, 44, -26], [72, 40, 16]]}
      />

      {/* candles */}
      <Candle x={120} base={122} height={52} />
      <Candle x={154} base={122} height={64} />
      <Candle x={188} base={122} height={52} />

      {/* a cherry, because why not */}
      <g>
        <path d="M262,286 c0,-16 10,-26 18,-30" fill="none" strokeWidth="4" />
        <circle cx="258" cy="296" r="13" fill="#C7365A" />
        <circle cx="254" cy="292" r="3.5" fill="#FBF1DD" stroke="none" />
      </g>
    </svg>
  );
}
