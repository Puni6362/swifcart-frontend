export default function Navbar() {
  return (
    <nav style={{ background: "#111827", padding: "16px", color: "#fff" }}>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none", margin: 0 }}>
        <li><a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a></li>
        <li><a href="/privacy" style={{ color: "#fff", textDecoration: "none" }}>Privacy</a></li>
        <li><a href="/terms" style={{ color: "#fff", textDecoration: "none" }}>Terms</a></li>
        <li><a href="/refund" style={{ color: "#fff", textDecoration: "none" }}>Refunds</a></li>
        <li><a href="/shipping" style={{ color: "#fff", textDecoration: "none" }}>Shipping</a></li>
        <li><a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</a></li>
      </ul>
    </nav>
  );
}
