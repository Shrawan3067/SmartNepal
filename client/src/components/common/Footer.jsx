import { Link } from "react-router-dom";
import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mcard.png";
import rupay from "../../assets/images/rpay.png";
import esewa from "../../assets/images/esewa.png";
import imepay from "../../assets/images/imepay.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-gray-900 text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="footer-col">
            <h3 className="text-xl font-bold text-teal-400 mb-6">SmartNepal</h3>
            <p className="text-gray-300 mb-6">
              Nepal's fastest growing online bus ticket booking platform
            </p>
            <div className="social-links flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition duration-300"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition duration-300"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="text-xl font-bold text-teal-400 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Top Routes */}
          <div className="footer-col">
            <h3 className="text-xl font-bold text-teal-400 mb-6">Top Routes</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/search?from=Janakpur&to=Kathmandu"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Janakpur to Kathmandu
                </a>
              </li>
              <li>
                <a
                  href="/search?from=Bardibas&to=Pokhara"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Bardibas to Pokhara
                </a>
              </li>
              <li>
                <a
                  href="/search?from=Dharan&to=Kathmandu"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Dharan to Kathmandu
                </a>
              </li>
              <li>
                <a
                  href="/search?from=Biratnagar&to=Kathmandu"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Biratnagar to Kathmandu
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h3 className="text-xl font-bold text-teal-400 mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-teal-400 transition duration-300 inline-block"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom border-t border-gray-800 pt-8 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} SmartNepal. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="payment-methods flex space-x-4">
              <img
                src={visa}
                alt="Visa"
                className="h-6 hover:scale-110 transition-transform duration-300"
              />
              <img
                src={mastercard}
                alt="Mastercard"
                className="h-6 hover:scale-110 transition-transform duration-300"
              />
              <img
                src={rupay}
                alt="Rupay"
                className="h-6 hover:scale-110 transition-transform duration-300"
              />
              <img
                src={esewa}
                alt="eSewa"
                className="h-6 hover:scale-110 transition-transform duration-300"
              />
              <img
                src={imepay}
                alt="IME Pay"
                className="h-6 hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
              <p>Registered with Department of Tourism, Government of Nepal</p>
              <p>Member of Nepal Tourism Board</p>
              <p>ISO 9001:2015 Certified</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
