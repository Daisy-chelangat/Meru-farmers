import React from 'react';
import { Link } from 'react-router-dom';


export default function FarmFresh() {

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="min-h-screen bg-white">

      {/* Navigation */}
      <nav className="bg-gradient-to-br from-green-800 to-green-600 px-8 py-4 shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="text-white text-3xl font-bold flex items-center gap-2">
            🌾 FarmFresh
          </div>

          <ul className="hidden md:flex gap-8 text-white font-medium">
            <li>
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:opacity-80 transition-opacity">
                Home
              </button>
            </li>
            <li>
              <button onClick={scrollToAbout} className="hover:opacity-80 transition-opacity">
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => window.location.href = "/products"}
                className="hover:opacity-80 transition-opacity"
              >
                Products
              </button>
            </li>

          </ul>

          <div className="flex gap-4">
            <Link to="/login">
              <button className="px-6 py-2 bg-white text-green-800 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-6 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-all hover:-translate-y-0.5">
                Sign Up
              </button>
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url('https://plus.unsplash.com/premium_photo-1686529896385-8a8d581d0225?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870')`
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white max-w-3xl mt-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Fresh Produce You Can Trust
          </h1>
          <p className="text-lg md:text-xl mb-8 font-light">
            Sourced straight from local farmers — healthy, natural, and harvested with care.
          </p>

          <button
            onClick={scrollToAbout}
            className="px-10 py-3 bg-green-600 hover:bg-green-700 rounded-full text-white font-semibold transition-all"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-24 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-6">About Us</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            FarmFresh links farmers directly to customers.
            We provide a platform where farmers can post their products  hence customers can find the easly 
            as he/she orders.
            We cut unnecessary middlemen so farmers earn more,
            and you get clean, fresh produce at honest prices. 
          </p>
        </div>
        <div className="max-w-4xl mx-auto text-center ">
        <h2 className='text-3xl font-bold text-green-800 mb-6 mt-6' >Our mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">To ensure that farmers can easily Connect
            with customers seeking fresh, healthy produce, fostering a sustainable and equitable food system for all.
          </p>
        </div>

        <div className="max-w-4xl mx-auto text-center ">
        <h2 className='text-3xl font-bold text-green-800 mb-6 mt-6' >Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">Be real in what's posted and what's delivered to customers.
            We serve what's in the ground.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-10 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">

          <div>
            <h4 className="font-bold text-lg mb-3">FarmFresh</h4>
            <p className="text-white/80">Connecting farmers and healthy homes.</p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Quick Links</h4>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block text-white/80 hover:text-white">Home</button>
            <button onClick={scrollToAbout} className="block text-white/80 hover:text-white">About</button>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-3">Contact</h4>
            <p className="text-white/80">Email: support@farmfresh.com</p>
            <p className="text-white/80">Phone: +254 700 000000</p>
          </div>

        </div>

        <div className="mt-10 text-center text-white/70 border-t border-white/20 pt-4">
          © 2025 FarmFresh. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
