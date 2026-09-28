import { renderToString } from "react-dom/server";
import App from "./App.jsx";

/** Used only at build time, to bake the page into index.html. */
export function render() {
  return renderToString(<App />);
}
