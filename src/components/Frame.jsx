import * as Art from "./art/Pastries.jsx";

/**
 * Picture slot. Pass `src` once real photography exists; until then it draws
 * the product as a silhouette on a tinted ground, which is a picture in its
 * own right rather than an apology for a missing one.
 */
export default function Frame({ src, alt, art, tone = 0, label, className = "" }) {
  const Shape = art ? Art[art] : null;

  return (
    <div className={`frame tone-${tone % 4} ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : Shape ? (
        <Shape className="frame-art" />
      ) : (
        <span className="frame-label">{label}</span>
      )}
    </div>
  );
}
