import React, { useEffect, useState } from "react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/courses`,
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching courses for footer:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <footer className="bg-blue-950 text-gray-300 pt-5 pb-15 relative overflow-hidden border-t border-blue-900">
      {/* Gradient background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950" />

      {/* 📱 Responsive Grid: 2 on mobile, 3 on tablet, 5 on large */}
      <div className="relative container mx-auto px-6 py-5 md:py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 z-10">
        {/* Company Info */}
        <div className="col-span-2 sm:col-span-1">
          <img className="w-32 md:w-40 h-auto rounded-lg" src="/images/itopper.jpeg" alt="" />
          <p className="text-gray-400 mt-4 mb-6 leading-relaxed">
            Empowering aspirants with comprehensive guidance and strategic preparation to conquer the UPSC Civil Services Examination.
          </p>
          <div className="flex space-x-4 mt-4 items-center -center gap-3">
            Checkout our linkedin page.{" "}
            <a
              href="https://www.linkedin.com/company/itopper"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-all"
            >
              <FaLinkedinIn />
            </a>
            {/* <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#3b82f6] hover:text-[#3b82f6] transition-all"
            >
              <FaTwitter />
            </a> */}
            {/* <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all"
            >
              <FaInstagram />
            </a> */}
            {/* <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#1d4ed8] hover:text-[#1d4ed8] transition-all"
            >
              <FaYoutube />
            </a> */}
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
            Address
          </h3>
          <ul className="space-y-3 text-gray-400">
            <li>
            210, Dhan Trident
              <br />
              Indore, Madhya Pradesh, India
            </li>
            <li>
              <span className="text-white font-medium">Email:</span>{" "}
              support@itopper.com
            </li>
            <li>
              <span className="text-white font-medium">Phone:</span> +91
              9755995529
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
            Company
          </h3>
          <ul className="space-y-3">
            <li>
              <HashLink
                smooth
                to="/#about"
                className="hover:text-[#1d4ed8] transition-all"
              >
                About Us
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="/#courses"
                className="hover:text-[#1d4ed8] transition-all"
              >
                Courses
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="/login"
                className="hover:text-[#1d4ed8] transition-all"
              >
                Get Started
              </HashLink>
            </li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
            Courses
          </h3>
          <ul className="space-y-3">
            {/* Hardcoded UPSC Courses */}
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.alert("This page is currently under construction. Please check back later!"); }}
                className="hover:text-[#1e3a8a] transition-all"
              >
                UPSC General Studies
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.alert("This page is currently under construction. Please check back later!"); }}
                className="hover:text-[#1e3a8a] transition-all"
              >
                Optional Subjects
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.alert("This page is currently under construction. Please check back later!"); }}
                className="hover:text-[#1e3a8a] transition-all"
              >
                CSAT Preparation
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.alert("This page is currently under construction. Please check back later!"); }}
                className="hover:text-[#1e3a8a] transition-all"
              >
                Interview Guidance
              </a>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
            Policies
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/privacy"
                className="hover:text-[#3b82f6] transition-all"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="hover:text-[#3b82f6] transition-all"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/refund"
                className="hover:text-[#3b82f6] transition-all"
              >
                Refund Policy
              </Link>
            </li>
            <li>
              <Link
                to="/cancellation"
                className="hover:text-[#3b82f6] transition-all"
              >
                Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-white/10 mt-8 pt-6 text-center text-lg text-gray-500 relative z-10">
        © {new Date().getFullYear()} itopper. All Rights Reserved. | Design &
        Developed By{" "}
        <span
          className="text-transparent bg-clip-text"
          style={{
            background:
              "linear-gradient(90deg, #1e3a8a 30%, #1d4ed8 60%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ❤️ Sumit Sahu
        </span>
      </div>
    </footer>
  );
};

export default Footer;
