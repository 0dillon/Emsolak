import Frame from "./Frame.jsx";

/**
 * Photographs from the kitchen. The first fills the large tile, which spans
 * two columns and two rows — so the grid occupies `shots.length + 3` cells and
 * only sits flush at 9 or 13 tiles. At 10 the last row holds a single tile.
 */
const shots = [
  { src: "/photos/cake-wedding.webp", label: "Three tier wedding cake, white and gold",
    alt: "A three tier white wedding cake with gold lace detail and sugar roses" },
  { src: "/photos/small-chops.webp", label: "Small chops, trays for an event",
    alt: "Foil trays of spring rolls, samosa, puff puff and peppered meat skewers" },
  { src: "/photos/cakes-anniversary.webp", label: "Anniversary cakes, sugar roses",
    alt: "Six white iced cakes, round and heart shaped, with pink sugar roses" },
  { src: "/photos/sausage-rolls.webp", label: "Sausage rolls, fresh from the oven",
    alt: "Ten golden sausage rolls laid out on paper" },
  { src: "/photos/cakes-drip.webp", label: "Drip cakes, buttercream",
    alt: "Brightly iced drip cakes in yellow, pink and turquoise buttercream" },
  { src: "/photos/cake-chocolate.webp", label: "Chocolate and cookie birthday cake",
    alt: "A square chocolate cake topped with cookies, marshmallows and cherries" },
  { src: "/photos/bread.webp", label: "Bread, a morning's bake bagged",
    alt: "Stacks of freshly baked loaves bagged and ready for delivery" },
  { src: "/photos/cakes-assorted.webp", label: "A morning's cakes, ready to go",
    alt: "More than a dozen small iced cakes arranged on a table" },
  { src: "/photos/jollof-plates.webp", label: "Jollof and fried rice, plated",
    alt: "Plates of jollof and fried rice served with fish and beef" },
  { src: "/photos/egusi.webp", label: "Egusi, cooked the long way",
    alt: "A large pot of egusi cooked with assorted meat" },
  { src: "/photos/meals-plated.webp", label: "Rice, noodles and stew",
    alt: "Plates of rice and noodles served with a vegetable and egg stew" },
  { src: "/photos/pies-tray-raw.webp", label: "Pies by the tray, before the oven",
    alt: "A full tray of unbaked pies, glazed and ready to bake" },
  { src: "/photos/frozen-rolls.webp", label: "Frozen supply, bagged by the box",
    alt: "Frozen sausage rolls and puff puff, individually bagged in a box" },
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
            Cakes, trays and pastry we have baked and delivered across Lagos
            and Ogun State — and a look at it before the oven.
          </p>
        </div>

        <div className="gallery-grid">
          {shots.map((shot) => (
            <figure key={shot.src}>
              <Frame src={shot.src} alt={shot.alt} />
              <figcaption>{shot.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
