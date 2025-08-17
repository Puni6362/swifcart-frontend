export default function Footer() {
  return (
    <footer style={{ background:"#111827", color:"#fff", padding:"20px", marginTop:"40px" }}>
      <p>© {new Date().getFullYear()} Swifcart. All Rights Reserved.</p>
      <ul style={{ display:"flex", gap:"16px", listStyle:"none", marginTop:"10px" }}>
        <li><a href="/privacy" style={{ color:"#fff", textDecoration:"none" }}>Privacy Policy</a></li>
        <li><a href="/terms" style={{ color:"#fff", textDecoration:"none" }}>Terms & Conditions</a></li>
        <li><a href="/refund" style={{ color:"#fff", textDecoration:"none" }}>Refunds</a></li>
        <li><a href="/shipping" style={{ color:"#fff", textDecoration:"none" }}>Shipping</a></li>
        <li><a href="/contact" style={{ color:"#fff", textDecoration:"none" }}>Contact</a></li>
      </ul>
    </footer>
  );
}
