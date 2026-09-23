import Frame from "./Frame.jsx";
import { WhatsApp } from "./Icons.jsx";
import { chatLink } from "../lib/order.js";
import { facts } from "../config.js";


export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero-grid">
        <div>
          <p className="kicker">Bakery and bulk catering</p>

          <h1>
            Trays that arrive
            <br />
            <em>full</em>, and on time.
          </h1>

          <p className="lead">
            Cakes cut for the table, pastry by the hundred, and soups cooked the
            long way. Build your order below and it lands in our WhatsApp,
            itemised and priced.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="btn btn-ink">
              See the menu
            </a>
            <a
              href={chatLink("Hello Emsolak, I would like to ask about an order.")}
              target="_blank"
              rel="noreferrer"
              className="btn btn-line"
            >
              <WhatsApp />
              Ask a question
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

        <Frame className="hero-frame" label="Hero photograph — a finished cake or a full tray" />
      </div>
    </section>
  );
}
