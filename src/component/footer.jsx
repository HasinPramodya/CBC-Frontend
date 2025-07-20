import { FaFacebookF, FaTwitter} from "react-icons/fa";
import {AiFillInstagram} from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { CiPhone, CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-7xl mx-auto">
                {/* Footer Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold text-pink-400 mb-4">
                            Crystal Beauty
                        </h3>
                        <div className="space-y-3 text-gray-300 text-sm">
                            <div className="flex items-center space-x-2">
                                <FiMapPin className="w-4 h-4" />
                                <span>Nugegoda, Colombo, Sri Lanka</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CiPhone className="w-4 h-4" />
                                <span>+94 11 234 5678</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CiMail className="w-4 h-4" />
                                <span>info@crystalbeauty.lk</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>
                                <Link to="/" className="hover:text-pink-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-pink-400 transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us" className="hover:text-pink-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact-us" className="hover:text-pink-400 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="bg-gray-700 hover:bg-pink-600 p-2 rounded-full transition-colors"
                            >
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="bg-gray-700 hover:bg-pink-600 p-2 rounded-full transition-colors"
                            >
                                <AiFillInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="bg-gray-700 hover:bg-pink-600 p-2 rounded-full transition-colors"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
                    <p>&copy; 2025 BeautyGlow. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
