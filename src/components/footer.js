import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 m-auto mt-auto">
      <div className="container mx-auto px-4">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About BK</h3>
            <ul>
              <li><a href="#" className="hover:underline">Our Story</a></li>
              <li><a href="#" className="hover:underline">Investor Relations</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">BK Info</h3>
            <ul>
              <li><a href="#" className="hover:underline">FAQs & Support</a></li>
              <li><a href="#" className="hover:underline">Nutrition Information</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul>
              <li><a href="#" className="hover:underline">Customer Care</a></li>
              <li><a href="#" className="hover:underline">Supply Chain Queries</a></li>
              <li><a href="#" className="hover:underline">Write to Us</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-8">
          <a href="#" aria-label="Facebook"><FaFacebook /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
        </div>

        {/* Legal Information */}
        <div className="mt-8 text-center">
          <p>TM & © 2024 BURGER KWEEN CORPORATION. All Rights Reserved.</p>
          <p>Terms of Service | Privacy Policy</p> {/* Add links as necessary */}
        </div>

      </div>
    </footer>
  );
};

export default Footer;