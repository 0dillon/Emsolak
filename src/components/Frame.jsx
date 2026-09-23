/**
 * Photo slot. Pass `src` once real photography exists; until then it renders a
 * flat block with the shot it is waiting for, so nothing looks accidental.
 */
export default function Frame({ src, alt, label, className = "" }) {
  return (
    <div className={`frame ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <span className="frame-label">{label}</span>
      )}
    </div>
  );
}
