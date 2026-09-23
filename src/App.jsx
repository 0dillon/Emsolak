import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Menu from "./components/Menu.jsx";
import Terms from "./components/Terms.jsx";
import Gallery from "./components/Gallery.jsx";
import Faq from "./components/Faq.jsx";
import Footer from "./components/Footer.jsx";
import OrderDrawer from "./components/OrderDrawer.jsx";

const STORE = "emsolak.cart";

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE)) ?? [];
  } catch {
    return [];
  }
};

/** Identity of a line: two cakes only merge if every choice matches. */
const keyOf = (item) =>
  [item.id, item.variant, ...item.options.map((o) => `${o.key}=${o.value}`)].join("|");

export default function App() {
  const [cart, setCart] = useState(read);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(cart));
    } catch {
      /* private browsing, the order simply will not survive a reload */
    }
  }, [cart]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const add = (item) => {
    const key = keyOf(item);
    setCart((prev) => {
      const found = prev.find((line) => line.key === key);
      return found
        ? prev.map((line) =>
            line.key === key ? { ...line, qty: line.qty + item.qty } : line
          )
        : [...prev, { ...item, key }];
    });
    setToast(`${item.qty} ${item.name} added to your order`);
  };

  const remove = (index) => setCart((prev) => prev.filter((_, i) => i !== index));

  const count = cart.reduce((n, line) => n + line.qty, 0);

  return (
    <>
      <Header count={count} onOpen={() => setOpen(true)} />

      <main>
        <Hero />
        <Menu onAdd={add} />
        <Terms />
        <Gallery />
        <Faq />
      </main>

      <Footer />

      {open && (
        <OrderDrawer
          cart={cart}
          onRemove={remove}
          onClose={() => setOpen(false)}
          onSent={() => {
            setCart([]);
            setOpen(false);
            setToast("Order sent. Check WhatsApp for our reply.");
          }}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
