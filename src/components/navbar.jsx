import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ background:"#111827", padding:"10px", color:"#fff" }}>
      <ul style={{ display:"flex", gap:"20px", listStyle:"none" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/privacy">Privacy</Link></li>
        <li><Link to="/terms">Terms</Link></li>
        <li><Link to="/refund">Refund</Link></li>
        <li><Link to="/shipping">Shipping</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
