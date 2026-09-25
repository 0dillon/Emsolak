import { useEffect, useRef, useState } from "react";
import { Close, WhatsApp } from "./Icons.jsx";
import { zones } from "../config.js";
import { naira, describe, subtotalOf, buildInvoice, chatLink } from "../lib/order.js";
import { validateOrder, normalisePhone, earliestDate, longDate, longestLead } from "../lib/validate.js";

const blank = {
  name: "",
  phone: "",
  address: "",
  date: "",
  time: "",
  notes: "",
};

export default function OrderDrawer({ cart, onRemove, onClose, onSent }) {
  const [customer, setCustomer] = useState(blank);
  const [zoneIndex, setZoneIndex] = useState(0);
  const [error, setError] = useState(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const escape = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", escape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", escape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const zone = zones[zoneIndex];
  const pickup = zone.fee === 0;
  const subtotal = subtotalOf(cart);
  const fixedFee = typeof zone.fee === "number";
  const total = subtotal + (fixedFee ? zone.fee : 0);

  const set = (key) => (e) => {
    setCustomer((prev) => ({ ...prev, [key]: e.target.value }));
    setError((prev) => (prev && prev.field === key ? null : prev));
  };

  /* Shown under the field it belongs to, so the reason sits next to the fix. */
  const fault = (field) =>
    error && error.field === field ? <p className="field-error">{error.message}</p> : null;

  const send = () => {
    const problem = validateOrder({ customer, cart, pickup });
    if (problem) {
      setError(problem);
      const field = bodyRef.current?.querySelector(`[name="${problem.field}"]`);
      field?.focus();
      field?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    /* Send one tidy shape of phone number, whatever was typed. */
    const tidy = { ...customer, phone: normalisePhone(customer.phone) };
    const { text } = buildInvoice({ cart, customer: tidy, zone });
    window.open(chatLink(text), "_blank", "noopener");
    onSent();
  };

  const earliest = earliestDate(cart);
  const lead = longestLead(cart);

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <aside className="drawer" aria-label="Your order">
        <div className="drawer-head">
          <h2>Your order</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <Close />
          </button>
        </div>

        <div className="drawer-body" ref={bodyRef}>
          {cart.length === 0 ? (
            <div className="drawer-empty">
              <h3>Nothing here yet</h3>
              <p>Add something from the menu and it will show up on this list.</p>
            </div>
          ) : (
            <>
              <div className="lines">
                {cart.map((line, i) => {
                  const spec = describe(line);
                  return (
                    <div className="line" key={line.key}>
                      <div className="line-main">
                        <h4>{line.name}</h4>
                        {spec && <p className="line-spec">{spec}</p>}
                        <p className="line-spec">
                          {line.qty} {line.unit}
                          {line.qty > 1 ? "s" : ""} at {naira(line.price)}
                        </p>
                      </div>
                      <div className="line-side">
                        <b>{naira(line.price * line.qty)}</b>
                        <button className="line-remove" onClick={() => onRemove(i)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="details">
                <h3>Your details</h3>

                <label className="field">
                  <span>Full name</span>
                  <input
                    name="name"
                    value={customer.name}
                    onChange={set("name")}
                    data-bad={error?.field === "name"}
                    placeholder="Tolu Adebayo"
                  />
                  {fault("name")}
                </label>

                <label className="field">
                  <span>Phone number</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    value={customer.phone}
                    onChange={set("phone")}
                    data-bad={error?.field === "phone"}
                    placeholder="0803 000 0000"
                  />
                  {fault("phone")}
                </label>

                <label className="field">
                  <span>Delivery area</span>
                  <select
                    value={zoneIndex}
                    onChange={(e) => setZoneIndex(Number(e.target.value))}
                  >
                    {zones.map((z, i) => (
                      <option key={z.name} value={i}>
                        {z.name}
                      </option>
                    ))}
                  </select>
                </label>

                {!pickup && (
                  <label className="field">
                    <span>Address</span>
                    <input
                      name="address"
                      value={customer.address}
                      onChange={set("address")}
                      data-bad={error?.field === "address"}
                      placeholder="12 Admiralty Way, Lekki Phase 1"
                    />
                    {fault("address")}
                  </label>
                )}

                <div className="field-pair">
                  <label className="field">
                    <span>Date needed</span>
                    <input
                      name="date"
                      type="date"
                      min={earliest}
                      value={customer.date}
                      onChange={set("date")}
                      data-bad={error?.field === "date"}
                    />
                  </label>

                  <label className="field">
                    <span>Time</span>
                    <input
                      name="time"
                      type="time"
                      value={customer.time}
                      onChange={set("time")}
                    />
                  </label>
                </div>

                {/* full width: the date message is a sentence, not a label */}
                {fault("date")}

                {lead.days > 0 && !fault("date") && (
                  <p className="field-hint">
                    {lead.name} needs {lead.days === 1 ? "a day" : `${lead.days} days`}{" "}
                    notice, so the earliest is {longDate(earliest)}.
                  </p>
                )}

                <label className="field">
                  <span>Anything we should know</span>
                  <textarea
                    name="notes"
                    rows={3}
                    value={customer.notes}
                    onChange={set("notes")}
                    placeholder="Less pepper. Cake reference photo to follow."
                  />
                </label>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-foot">
            <div className="totals">
              <div>
                <span>Subtotal</span>
                <b>{naira(subtotal)}</b>
              </div>
              <div>
                <span>Delivery</span>
                <b>{fixedFee ? (zone.fee ? naira(zone.fee) : "Free") : "Quoted in chat"}</b>
              </div>
              <div className="grand">
                <span>Total</span>
                <b>
                  {naira(total)}
                  {fixedFee ? "" : "+"}
                </b>
              </div>
            </div>

            <button className="btn btn-clay btn-full" style={{ marginTop: 18 }} onClick={send}>
              <WhatsApp />
              Send this order
            </button>

            <p className="disclaimer">
              No payment is taken here. We confirm everything in the chat first.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
