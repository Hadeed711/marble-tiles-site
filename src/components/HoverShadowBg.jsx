export default function HoverShadowBg({ mousePosition }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[0]"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.15), transparent 400px)`,
        transition: "background 0.2s ease-out",
      }}
    />
  );
}
