import { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { categories, products } from "../config.js";

const ALL = "Everything";

export default function Menu({ onAdd }) {
  const [active, setActive] = useState(ALL);

  const shown =
    active === ALL ? products : products.filter((p) => p.category === active);

  return (
    <section className="menu" id="menu">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="kicker">The menu</p>
            <h2>Priced per piece, per pack, per tray.</h2>
          </div>
          <p className="lead">
            Nothing is charged on this page. Your order goes to our WhatsApp,
            we confirm the details and the delivery fee, then send account
            details.
          </p>
        </div>

        <div className="filters">
          {[ALL, ...categories].map((name) => (
            <button
              key={name}
              className="filter"
              data-on={active === name}
              onClick={() => setActive(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="products">
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}
