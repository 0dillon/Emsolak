import { Van, Clock, Card, Crate } from "./Icons.jsx";
import Scatter, { termsScatter } from "./Scatter.jsx";
import { notice, zones } from "../config.js";

export default function Terms() {
  return (
    <section className="terms" id="terms">
      <Scatter items={termsScatter} />

      <div className="shell">
        <div className="section-head">
          <div>
            <p className="kicker">Before you order</p>
            <h2>Delivery, notice and payment.</h2>
          </div>
          <p className="lead">
            Short version: tell us early, we will quote the drop, and nothing is
            paid until we have both agreed the order.
          </p>
        </div>

        <div className="terms-grid">
          <div className="term">
            <div className="term-icon">
              <Van />
            </div>
            <h3>Where we go</h3>
            <p>
              Anywhere in Lagos and Ogun State. The fee depends on your address
              and is agreed in the chat.
            </p>
            <dl>
              {zones.map((zone) => (
                <div key={zone.name}>
                  <dt>{zone.name}</dt>
                  <dd>{zone.fee === 0 ? "Free" : zone.fee ? `₦${zone.fee.toLocaleString()}` : "Quoted"}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="term">
            <div className="term-icon">
              <Clock />
            </div>
            <h3>Notice we need</h3>
            <p>Booked in order of arrival. Large events, talk to us sooner.</p>
            <dl>
              {notice.map(([item, lead]) => (
                <div key={item}>
                  <dt>{item}</dt>
                  <dd>{lead}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="term">
            <div className="term-icon">
              <Card />
            </div>
            <h3>Paying us</h3>
            <p>
              Bank transfer only. Account details follow once your order is
              confirmed.
            </p>
            <dl>
              <div>
                <dt>Cakes and large orders</dt>
                <dd>50% deposit</dd>
              </div>
              <div>
                <dt>Balance</dt>
                <dd>Before delivery</dd>
              </div>
            </dl>
          </div>

          <div className="term">
            <div className="term-icon">
              <Crate />
            </div>
            <h3>Trade supply</h3>
            <p>
              Shops, schools and offices buying frozen pastry by the hundred get
              trade pricing and a standing weekly delivery. Message us for the
              wholesale list.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
