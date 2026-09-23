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
          <p className="kicker">Bakery and bulk catering, Lagos</p>

          <h1>
            Feeding Lagos,
            <br />
            <em>fifty pies</em> at a time.
          </h1>

          <p className="lead">
            Cakes for the table, pastry by the hundred, and soups cooked the
            long way. Build your order below and it lands in our WhatsApp,
            itemised and priced. No forms, no card, no wahala.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="btn btn-clay">
              Show me the menu
            </a>
            <a
              href={chatLink("Hello Emsolak, I would like to ask about an order.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line"
            >
              <WhatsApp />
              Just ask us
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
