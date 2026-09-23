/**
 * Pastry silhouettes. Each is a flat shape on a 100x100 board, drawn to read
 * at any size, from a 24px scatter to a 200px card. Detail is punched through
 * with fill-rule evenodd rather than drawn in a second colour, so every shape
 * stays a true silhouette and takes its colour from `currentColor`.
 */

const Shape = ({ d, rule = "nonzero", title, children, ...rest }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" role="img" aria-label={title} {...rest}>
    {d ? <path d={d} fillRule={rule} /> : children}
  </svg>
);

/* ring with a clean hole punched through it */
export const Donut = (p) => (
  <Shape
    title="Donut"
    rule="evenodd"
    d="M4,50 a46,46 0 1,0 92,0 a46,46 0 1,0 -92,0 Z
       M34,50 a16,16 0 1,0 32,0 a16,16 0 1,0 -32,0 Z"
    {...p}
  />
);

/* half moon, crimped along the base, two steam vents cut in the top */
export const Pie = (p) => (
  <Shape
    title="Meat pie"
    rule="evenodd"
    d="M8,62 a42,42 0 0,1 84,0
       a6,6 0 0,0 -12,0 a6,6 0 0,0 -12,0 a6,6 0 0,0 -12,0
       a6,6 0 0,0 -12,0 a6,6 0 0,0 -12,0 a6,6 0 0,0 -12,0
       a6,6 0 0,0 -12,0 Z
       M39,44 l6,-8 5,4 -6,8 Z
       M55,44 l6,-8 5,4 -6,8 Z"
    {...p}
  />
);

/* pill with three scored slashes */
export const SausageRoll = (p) => (
  <Shape
    title="Sausage roll"
    rule="evenodd"
    d="M24,32 h52 a18,18 0 0,1 0,36 h-52 a18,18 0 0,1 0,-36 Z
       M36,40 l7,0 -9,20 -7,0 Z
       M52,40 l7,0 -9,20 -7,0 Z
       M68,40 l7,0 -9,20 -7,0 Z"
    {...p}
  />
);

/* domed tin loaf, three cuts slashed across the crust */
export const Loaf = (p) => (
  <Shape
    title="Loaf"
    rule="evenodd"
    d="M10,70 V50 a40,26 0 0,1 80,0 v20 a9,9 0 0,1 -9,9 H19 a9,9 0 0,1 -9,-9 Z
       M25,44 l9,-8 5,5 -9,8 Z
       M43,39 l9,-8 5,5 -9,8 Z
       M61,44 l9,-8 5,5 -9,8 Z"
    {...p}
  />
);

/* swirled top sitting clear of a fluted case */
export const Cupcake = (p) => (
  <Shape
    title="Cupcake"
    rule="evenodd"
    d="M19,47 a14,14 0 0,1 6,-20 a18,18 0 0,1 50,0 a14,14 0 0,1 6,20 Z
       M23,54 h54 l-8,31 a8,8 0 0,1 -8,6 H39 a8,8 0 0,1 -8,-6 Z
       M38,60 l5,0 -2,25 -5,0 Z
       M53,60 l5,0 -1,25 -5,0 Z
       M64,60 l5,0 -3,25 -5,0 Z"
    {...p}
  />
);

/* round biscuit, chips punched out */
export const Cookie = (p) => (
  <Shape
    title="Cookie"
    rule="evenodd"
    d="M6,50 a44,44 0 1,0 88,0 a44,44 0 1,0 -88,0 Z
       M28,38 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0 Z
       M56,30 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 Z
       M42,58 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0 Z
       M64,60 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 Z
       M24,62 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 Z"
    {...p}
  />
);

/* meat on the bone: the knuckle lobes sit across the shaft, not along it */
export const Drumstick = (p) => (
  <Shape title="Peppered chicken" {...p}>
    <circle cx="65" cy="34" r="27" />
    <rect x="30" y="53" width="32" height="15" rx="7.5" transform="rotate(135 46 60.5)" />
    <circle cx="26" cy="67" r="9.5" />
    <circle cx="38" cy="79" r="9.5" />
  </Shape>
);

/* a wedge with a filling line through it and a cherry on the point */
export const CakeSlice = (p) => (
  <Shape
    title="Cake slice"
    rule="evenodd"
    d="M14,78 L44,30 a8,8 0 0,1 12,0 L86,78 a5,5 0 0,1 -4,7 H18 a5,5 0 0,1 -4,-7 Z
       M27,58 H73 v10 H27 Z
       M41,20 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0 Z"
    {...p}
  />
);

/* three tiers and a candle, for the cakes */
export const Tiers = (p) => (
  <Shape title="Tiered cake" {...p}>
    <rect x="13" y="66" width="74" height="23" rx="7" />
    <rect x="22" y="43" width="56" height="23" rx="7" />
    <rect x="31" y="20" width="38" height="23" rx="7" />
    <rect x="46.5" y="4" width="7" height="14" rx="3.5" />
  </Shape>
);

/* bowl with a rim, for the soups and the trays */
export const Bowl = (p) => (
  <Shape
    title="Bowl"
    rule="evenodd"
    d="M8,44 h84 a42,36 0 0,1 -84,0 Z
       M16,50 H84 v6 H16 Z"
    {...p}
  />
);

/* two cherries on a stem */
export const Cherries = (p) => (
  <Shape
    title="Cherries"
    d="M50,12 a4,4 0 0,1 4,4 c0,14 -12,20 -16,32 a4,4 0 0,1 -7,-3
       c4,-14 15,-21 15,-29 a4,4 0 0,1 4,-4 Z
       M50,16 a4,4 0 0,1 3,6 c-7,11 -4,22 -1,32 a4,4 0 0,1 -7,2
       c-4,-12 -6,-26 2,-38 a4,4 0 0,1 3,-2 Z
       M28,60 a16,16 0 1,0 32,0 a16,16 0 1,0 -32,0 Z
       M58,66 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0 Z"
    {...p}
  />
);

/* the shapes worth scattering in the background */
export const scatterShapes = [Donut, Pie, SausageRoll, Loaf, Cupcake, Cookie, Cherries, CakeSlice];
