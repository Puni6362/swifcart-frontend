import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DropshippingStore from "../DropshippingStore"; // adjust import if needed

export default function Home() {
  return (
    <>
      <Navbar />
      <DropshippingStore />
      <Footer />
    </>
  );
}
