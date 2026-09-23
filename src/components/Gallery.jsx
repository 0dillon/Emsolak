import Frame from "./Frame.jsx";

/** Swap `art` for `src` on each of these as real photographs arrive. */
const shots = [
  { art: "Tiers", label: "Wedding cake, three tier" },
  { art: "Pie", label: "Meat pies, tray of fifty" },
  { art: "Cookie", label: "Small chops, deluxe pack" },
  { art: "Drumstick", label: "Peppered chicken" },
  { art: "Loaf", label: "Milk loaf, sliced" },
  { art: "Cupcake", label: "Birthday cake, buttercream" },
  { art: "Bowl", label: "Jollof tray, plated" },
];

export default function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="kicker">Our work</p>
            <h2>What has gone out of the kitchen.</h2>
          </div>
          <p className="lead">
            Swap these drawings for real photographs. For cakes especially,
            they do more selling than any sentence on this page.
          </p>
        </div>

        <div className="gallery-grid">
          {shots.map((shot, i) => (
            <figure key={shot.label}>
              <Frame art={shot.art} tone={i} />
              <figcaption>{shot.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
