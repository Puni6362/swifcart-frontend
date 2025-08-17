
import React, {useMemo, useState} from "react";

/**
 * Minimal dropshipping store component (client-only).
 * Replace RAZORPAY_KEY with your VITE_RAZORPAY_KEY or call backend endpoints.
 */

const products = [
  { id:1, name:"Smart Fitness Band", price:1599, image:"https://via.placeholder.com/300?text=Fitness+Band" },
  { id:2, name:"Bamboo Toothbrush", price:199, image:"https://via.placeholder.com/300?text=Bamboo+Toothbrush" },
  { id:3, name:"Pet Grooming Kit", price:899, image:"https://via.placeholder.com/300?text=Pet+Grooming+Kit" },
];

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_demo";

export default function DropshippingStore(){
  const [view,setView] = useState("home");
  const [cart,setCart] = useState([]);
  const [address,setAddress] = useState({name:"",phone:"",email:"",line1:"",city:"",state:"",pincode:""});

  const cartItems = useMemo(()=>cart.map(ci=>({...products.find(p=>p.id===ci.id), qty:ci.qty})),[cart]);
  const subtotal = useMemo(()=>cartItems.reduce((s,it)=>s + it.price*it.qty, 0),[cartItems]);
  const shipping = subtotal > 999 || subtotal===0 ? 0 : 69;
  const total = subtotal + shipping;

  function addToCart(id){
    setCart(prev=>{
      const f = prev.find(p=>p.id===id);
      if(f) return prev.map(p=> p.id===id? {...p, qty: p.qty+1}: p);
      return [...prev, {id, qty:1}];
    });
  }
  function updateQty(id, qty){
    setCart(prev=> prev.map(p=> p.id===id? {...p, qty}: p).filter(p=>p.qty>0));
  }
  function removeItem(id){
    setCart(prev=> prev.filter(p=> p.id!==id));
  }

  async function loadRazorpay(){
    if(window.Razorpay) return true;
    return new Promise(resolve=>{
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = ()=>resolve(true);
      s.onerror = ()=>resolve(false);
      document.body.appendChild(s);
    });
  }

  async function payWithRazorpay(){
    if(total <= 0) return alert("Cart is empty");
    const ok = await loadRazorpay();
    if(!ok) return alert("Couldn't load Razorpay SDK");
    // For demo we create a dummy order client-side (NOT secure). In production call your /api/create-order
    const order = { id: `order_demo_${Date.now()}`, amount: total*100, currency: "INR" };
    const options = {
      key: RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "MyDropStore",
      order_id: order.id,
      prefill: { name: address.name, email: address.email, contact: address.phone },
      handler: function(){ setView("success"); setCart([]); }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const addressValid = ()=> {
    const { name, phone, email, line1, city, state, pincode } = address;
    return (
      name.trim().length >= 2 &&
      /^\d{10}$/.test(phone) &&
      /.+@.+\..+/.test(email) &&
      line1.trim().length >= 3 &&
      city.trim().length >= 2 &&
      state.trim().length >= 2 &&
      /^\d{6}$/.test(pincode)
    );
  }

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding:20 }}>
      <header style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <h1>MyDropStore</h1>
        <button onClick={()=>setView("cart")}>Cart ({cart.reduce((s,c)=>s+c.qty,0)})</button>
      </header>

      {view === "home" && (
        <>
          <section style={{ background: "linear-gradient(90deg,#7c3aed,#4f46e5)", color:"#fff", padding:20, borderRadius:8 }}>
            <h2>Hot Trending Products</h2>
            <p>Best deals shipped to your door.</p>
            <button onClick={()=>setView("cart")}>View Cart</button>
          </section>

          <section style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16, marginTop:16 }}>
            {products.map(p=>(
              <div key={p.id} style={{ background:"#fff", padding:12, borderRadius:8, boxShadow:"0 4px 12px rgba(0,0,0,0.06)" }}>
                <img src={p.image} alt="" style={{ width:"100%", height:160, objectFit:"cover", borderRadius:6 }} />
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                <button onClick={()=>addToCart(p.id)}>Add to Cart</button>
              </div>
            ))}
          </section>
        </>
      )}

      {view === "cart" && (
        <section>
          <h2>Your Cart</h2>
          {cartItems.length === 0 ? <p>Cart is empty</p> : (
            <>
              {cartItems.map(item=>(
                <div key={item.id} style={{ display:"flex", justifyContent:"space-between", marginBottom:8, background:"#fff", padding:8, borderRadius:6 }}>
                  <div style={{ display:"flex", gap:12 }}>
                    <img src={item.image} alt="" style={{ width:64, height:64, objectFit:"cover", borderRadius:6 }} />
                    <div>
                      <div>{item.name}</div>
                      <div>₹{item.price}</div>
                    </div>
                  </div>
                  <div>
                    <input type="number" value={item.qty} min={1} onChange={(e)=>updateQty(item.id, Math.max(1, Number(e.target.value)))} style={{ width:60 }} />
                    <button onClick={()=>removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:12, background:"#fff", padding:12, borderRadius:6 }}>
                <div>Subtotal: ₹{subtotal}</div>
                <div>Shipping: {shipping === 0 ? "FREE" : `₹${shipping}`}</div>
                <div style={{ fontWeight:700 }}>Total: ₹{total}</div>
                <div style={{ display:"flex", gap:8, marginTop:8 }}>
                  <button onClick={()=>setView("checkout")}>Checkout</button>
                  <button onClick={()=>setView("home")}>Continue shopping</button>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {view === "checkout" && (
        <section style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div style={{ background:"#fff", padding:12, borderRadius:6 }}>
            <h3>Shipping Details</h3>
            <input placeholder="Full Name" value={address.name} onChange={(e)=>setAddress({...address, name:e.target.value})} />
            <input placeholder="Phone" value={address.phone} onChange={(e)=>setAddress({...address, phone:e.target.value})} />
            <input placeholder="Email" value={address.email} onChange={(e)=>setAddress({...address, email:e.target.value})} />
            <input placeholder="Address Line 1" value={address.line1} onChange={(e)=>setAddress({...address, line1:e.target.value})} />
            <input placeholder="City" value={address.city} onChange={(e)=>setAddress({...address, city:e.target.value})} />
            <input placeholder="State" value={address.state} onChange={(e)=>setAddress({...address, state:e.target.value})} />
            <input placeholder="Pincode" value={address.pincode} onChange={(e)=>setAddress({...address, pincode:e.target.value})} />
          </div>
          <div style={{ background:"#fff", padding:12, borderRadius:6 }}>
            <h3>Order Summary</h3>
            {cartItems.map(it=> <div key={it.id} style={{ display:"flex", justifyContent:"space-between" }}>{it.name} × {it.qty} <span>₹{it.price*it.qty}</span></div>)}
            <div style={{ marginTop:8 }}>Total: ₹{total}</div>
            <div style={{ marginTop:8 }}>
              <button disabled={!addressValid()} onClick={payWithRazorpay}>Pay with Razorpay</button>
              <button disabled={!addressValid()} onClick={()=>alert("Stripe flow: call backend to create Checkout session")}>Pay with Stripe</button>
            </div>
          </div>
        </section>
      )}

      {view === "success" && (
        <div style={{ background:"#fff", padding:20, borderRadius:8 }}>
          <h2>Payment Successful</h2>
          <p>Thank you! Order confirmed.</p>
          <button onClick={()=>setView("home")}>Continue shopping</button>
        </div>
      )}
    </div>
  );
}
