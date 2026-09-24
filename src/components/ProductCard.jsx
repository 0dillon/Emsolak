import { useState } from "react";
import Frame from "./Frame.jsx";
import { Plus, Minus } from "./Icons.jsx";
import { priceRange } from "../lib/order.js";

export default function ProductCard({ product, onAdd, tone = 0 }) {
  const min = product.moq ?? 1;
  const step = product.step ?? 1;

  const [qty, setQty] = useState(min);
  const [variant, setVariant] = useState(0);
  const [choices, setChoices] = useState(() =>
    Object.fromEntries((product.options ?? []).map((o) => [o.key, o.choices[0]]))
  );
  const [message, setMessage] = useState("");

  const nudge = (direction) => setQty((q) => Math.max(min, q + direction * step));

  const commit = (raw) => {
    const parsed = parseInt(raw, 10);
    setQty(Number.isFinite(parsed) ? Math.max(min, parsed) : min);
  };

  const submit = () => {
    const options = Object.entries(choices).map(([key, value]) => ({ key, value }));
    if (product.textField && message.trim()) {
      options.push({ key: product.textField, value: message.trim() });
    }

    onAdd({
      id: product.id,
      name: product.name,
      unit: product.unit,
      variant: product.variants ? product.variants[variant].name : "",
      price: product.variants ? product.variants[variant].price : product.price,
      options,
      qty,
    });

    setQty(min);
    setMessage("");
  };

  return (
    <article className="product">
      <Frame
        className="product-frame"
        src={product.photo}
        alt={product.alt}
        art={product.art}
        tone={tone}
        label={product.name}
      />

      <div className="product-body">
        <p className="product-note">{product.note}</p>

        <div className="product-top">
          <h3>{product.name}</h3>
          <span className="product-price">{priceRange(product)}</span>
        </div>

        <p className="product-desc">{product.desc}</p>

        {product.variants && (
          <label className="field">
            <span>Choose one</span>
            <select value={variant} onChange={(e) => setVariant(Number(e.target.value))}>
              {product.variants.map((v, i) => (
                <option key={v.name} value={i}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {(product.options ?? []).map((option) => (
          <label className="field" key={option.key}>
            <span>{option.key}</span>
            <select
              value={choices[option.key]}
              onChange={(e) =>
                setChoices((prev) => ({ ...prev, [option.key]: e.target.value }))
              }
            >
              {option.choices.map((choice) => (
                <option key={choice}>{choice}</option>
              ))}
            </select>
          </label>
        ))}

        {product.textField && (
          <label className="field">
            <span>{product.textField}</span>
            <input
              value={message}
              maxLength={60}
              placeholder="Happy Birthday Ada"
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
        )}

        {min > 1 && (
          <p className="minimum">
            Minimum {min} {product.unit}s, ordered in {step}s
          </p>
        )}

        <div className="product-actions">
          <div className="stepper">
            <button onClick={() => nudge(-1)} aria-label={`Fewer ${product.name}`}>
              <Minus />
            </button>
            <input
              type="number"
              value={qty}
              inputMode="numeric"
              onChange={(e) => setQty(e.target.value)}
              onBlur={(e) => commit(e.target.value)}
              aria-label="Quantity"
            />
            <button onClick={() => nudge(1)} aria-label={`More ${product.name}`}>
              <Plus />
            </button>
          </div>

          <button className="btn btn-clay" onClick={submit}>
            Add to order
          </button>
        </div>
      </div>
    </article>
  );
}
