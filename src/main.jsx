import { Fragment } from "react";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import DropshippingStore from "./DropshippingStore"; // ✅ fixed path

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <DropshippingStore />
      <Footer />
    </Fragment>
  );
}
