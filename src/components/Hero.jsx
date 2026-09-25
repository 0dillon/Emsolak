import Cake from "./art/Cake.jsx";
import Scatter, { heroScatter } from "./Scatter.jsx";
import { WhatsApp } from "./Icons.jsx";
import { chatLink } from "../lib/order.js";
import { facts } from "../config.js";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <Scatter items={heroScatter} />

      <div className="shell hero-grid">
        <div className="hero-copy">
          <h1>
            Cakes, pastry and party food,
            <br />
            <em>baked in Lagos.</em>
          </h1>

          <p className="lead">
            Priced per piece, per pack and per tray. Choose what you need
            below and send it to us on WhatsApp. We confirm the delivery fee
            before anything is paid.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="btn btn-clay">
              See the menu
            </a>
            <a
              href={chatLink("Hello Emsolak, I would like to ask about an order.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line"
            >
              <WhatsApp />
              Message us
            </a>
          </div>

          <dl className="hero-facts">
            {facts.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-cake">
          <Cake className="cake" />
        </div>
      </div>
    </section>
  );
}
