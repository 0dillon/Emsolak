import * as Art from "./art/Pastries.jsx";

/**
 * Pastry silhouettes drifting behind a section. Purely decorative, so it is
 * hidden from screen readers and ignores the mouse entirely — nothing here
 * should ever sit between someone and a button.
 *
 * Each item: [shape, left%, top%, size px, rotation deg]
 */
export default function Scatter({ items }) {
  return (
    <div className="scatter" aria-hidden="true">
      {items.map(([name, left, top, size, rotate], i) => {
        const Shape = Art[name];
        return (
          <Shape
            key={i}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              transform: `rotate(${rotate}deg)`,
              animationDelay: `${(i % 5) * -1.6}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/* Hand placed per section: kept to the margins and the gaps between blocks,
   away from anything anyone needs to read or press. */

export const heroScatter = [
  ["Donut", 4, 8, 64, -14],
  ["SausageRoll", 88, 20, 72, 18],
  ["Cherries", 2, 62, 52, 12],
  ["Cookie", 93, 72, 58, -8],
  ["Cupcake", 46, 2, 44, 10],
];

export const menuScatter = [
  ["Pie", 95, 6, 60, 16],
  ["Loaf", 2, 32, 56, -12],
  ["Donut", 96, 54, 50, -20],
  ["CakeSlice", 3, 82, 58, 14],
];

export const termsScatter = [
  ["Drumstick", 91, 12, 72, -18],
  ["Bowl", 4, 68, 62, 10],
  ["Cookie", 50, 92, 46, 22],
];

export const faqScatter = [
  ["Cupcake", 92, 14, 64, 16],
  ["Cherries", 3, 40, 54, -14],
  ["SausageRoll", 88, 76, 58, -22],
];
