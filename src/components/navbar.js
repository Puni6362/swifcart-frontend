import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display:"flex", justifyContent:"space-between", padding:"12px 20px", background:"#4f46e5", color:"#fff" }}>
      <h2>Swifcart</h2>
      <ul style={{ display:"flex", gap:"16px", listStyle:"none" }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/privacy">Privacy</Link></li>
        <li><Link href="/terms">Terms</Link></li>
        <li><Link href="/refund">Refund</Link></li>
        <li><Link href="/shipping">Shipping</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
