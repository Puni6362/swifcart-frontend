import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background:"#111827", color:"#fff", padding:"20px", marginTop:"40px" }}>
      <p>© {new Date().getFullYear()} Swifcart. All Rights Reserved.</p>
      <ul style={{ display:"flex", gap:"16px", listStyle:"none", marginTop:"10px" }}>
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/terms">Terms & Conditions</Link></li>
        <li><Link to="/refund">Refunds</Link></li>
        <li><Link to="/shipping">Shipping</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </footer>
  );
}
