import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background:"#111827", color:"#fff", padding:"20px", marginTop:"40px" }}>
      <p>© {new Date().getFullYear()} Swifcart. All Rights Reserved.</p>
      <ul style={{ display:"flex", gap:"16px", listStyle:"none", marginTop:"10px" }}>
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/terms">Terms & Conditions</Link></li>
        <li><Link href="/refund">Refunds</Link></li>
        <li><Link href="/shipping">Shipping</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </footer>
  );
}
