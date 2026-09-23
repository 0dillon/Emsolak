import { Bag } from "./Icons.jsx";

const links = [
  ["Menu", "#menu"],
  ["Delivery", "#terms"],
  ["Our work", "#gallery"],
  ["Questions", "#faq"],
  ["Contact", "#contact"],
];

export default function Header({ count, onOpen }) {
  return (
    <header className="header">
      <div className="shell header-inner">
        <a href="#top" className="wordmark">
          Emsolak<em>.</em>
        </a>

        <nav>
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <button className="order-btn" onClick={onOpen}>
          <Bag />
          Order
          {count > 0 && <span className="tally">{count}</span>}
        </button>
      </div>
    </header>
  );
}
