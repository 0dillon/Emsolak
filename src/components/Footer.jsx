import { business } from "../config.js";
import { chatLink } from "../lib/order.js";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <span className="wordmark">Emsolak.</span>
            <p>
              A Lagos kitchen baking cakes, pastry and party food, supplying
              households, events and shops across {business.serves}.
            </p>
          </div>

          <div>
            <h4>Menu</h4>
            <a href="#menu">Pastries</a>
            <a href="#menu">Frozen supply</a>
            <a href="#menu">Cakes</a>
            <a href="#menu">Small chops and trays</a>
          </div>

          <div>
            <h4>Reach us</h4>
            <a
              href={chatLink("Hello Emsolak, I would like to ask about an order.")}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a href={business.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <p>{business.hours}</p>
          </div>
        </div>

        <div className="footer-base">
          <span>
            &copy; {new Date().getFullYear()} {business.name}
          </span>
          <span>{business.serves}</span>
        </div>
      </div>
    </footer>
  );
}
