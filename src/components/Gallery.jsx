import Frame from "./Frame.jsx";

const shots = [
  "Wedding cake, three tier",
  "Meat pies, tray of fifty",
  "Small chops, deluxe pack",
  "Peppered chicken",
  "Milk loaf, sliced",
  "Birthday cake, buttercream",
  "Jollof tray, plated",
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
            Replace these blocks with real photographs. For cakes in
            particular, they do more selling than any sentence on this page.
          </p>
        </div>

        <div className="gallery-grid">
          {shots.map((shot) => (
            <Frame key={shot} label={shot} />
          ))}
        </div>
      </div>
    </section>
  );
}
