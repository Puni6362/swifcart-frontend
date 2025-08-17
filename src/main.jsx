import { Fragment } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
