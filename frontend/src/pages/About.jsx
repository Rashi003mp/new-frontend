import React from 'react';
import Footer from '../components/Footer';
function AboutPage() {
  return (
    <>
    <div className="max-w-4xl mx-auto p-8 mt-10">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Welcome to our e-commerce platform! We are committed to providing you with a seamless online shopping experience, offering a curated selection of high-quality apparel and accessories tailored to your style and needs.
      </p>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Our mission is to make shopping convenient, secure, and enjoyable. Whether you're looking for timeless classics or the latest trends, we've got you covered with detailed product information and easy checkout options, including Cash on Delivery and UPI payments.
      </p>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        We value our customers and strive to deliver exceptional service with fast shipping, easy returns, and responsive support. Your satisfaction is our top priority.
      </p>
      <p className="mb-6 text-lg leading-relaxed text-gray-700">
        Thank you for choosing us for your shopping needs. We look forward to serving you and making your shopping journey memorable.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Contact Us</h2>
      <p className="text-gray-700">
        Email: support@yourwebsite.com <br />
        Phone: +91 12345 67890
      </p>
    </div>
    <Footer />
    </>
  );
}

export default AboutPage
