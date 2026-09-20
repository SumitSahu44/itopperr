import React, { useEffect, useState } from "react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { getApiUrl } from "../config/api";

const Footer = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(getApiUrl('/api/courses'));
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
    <footer className="bg-white text-slate-600 pt-10 pb-12 relative overflow-hidden border-t border-slate-200">
      {/* Responsive Grid: 2 on mobile, 3 on tablet, 5 on large */}
      <div className="relative container mx-auto px-6 py-5 md:py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 z-10">
        {/* Company Info */}
        <div className="col-span-2 sm:col-span-1">
          <Link to="/">
            <img className="w-36 md:w-44 h-auto rounded-lg" src="/images/itopper.png" alt="iTopper Logo" />
          </Link>
          <p className="text-slate-500 text-xs mt-4 mb-4 leading-relaxed font-medium">
            An initiative by <strong className="text-slate-800">UPSC 2017 Topper & Ex-Bureaucrat Mr. Amit Kumar</strong> to empower aspirants with top quality mentorship for UPSC CSE & State PCS Exams.
          </p>
          <div className="flex space-x-4 mt-2 items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">LinkedIn Page:</span>
            <a
              href="https://www.linkedin.com/company/itopper"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-300 hover:border-[#1d4ed8] hover:text-[#1d4ed8] hover:bg-blue-50 transition-all text-slate-500 shrink-0"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-base font-extrabold text-[#163F66] mb-4 border-b border-slate-100 pb-2 uppercase tracking-wider text-xs">
            Address & Contact
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
            <li className="leading-relaxed">
              Shop No 55, 2nd Floor, Old Rajinder Nagar, Delhi 110060
            </li>
            <li>
              <span className="text-slate-800 font-bold">Email:</span>{" "}
              <a href="mailto:contact@itopper.academy" className="hover:text-[#1d4ed8]">contact@itopper.academy</a>
            </li>
            <li>
              <span className="text-slate-800 font-bold">Alt Email:</span>{" "}
              <a href="mailto:itopperiasacademy@gmail.com" className="hover:text-[#1d4ed8]">itopperiasacademy@gmail.com</a>
            </li>
            <li>
              <span className="text-slate-800 font-bold">Phone:</span>{" "}
              <a href="tel:9877536047" className="hover:text-[#1d4ed8]">9877536047</a> / <a href="tel:8826064806" className="hover:text-[#1d4ed8]">8826064806</a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-extrabold text-[#163F66] mb-4 border-b border-slate-100 pb-2 uppercase tracking-wider text-xs">
            Company
          </h3>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <Link
                to="/about"
                className="hover:text-[#1d4ed8] transition-all text-slate-700 hover:underline"
              >
                About Us
              </Link>
            </li>
            <li>
              <HashLink
                smooth
                to="/#courses"
                className="hover:text-[#1d4ed8] transition-all text-slate-700 hover:underline"
              >
                Courses & Programs
              </HashLink>
            </li>
            <li>
              <Link
                to="/evaluation"
                className="hover:text-[#1d4ed8] transition-all text-slate-700 hover:underline"
              >
                Answer Evaluation
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-[#1d4ed8] transition-all text-slate-700 hover:underline"
              >
                Student Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-base font-extrabold text-[#163F66] mb-4 border-b border-slate-100 pb-2 uppercase tracking-wider text-xs">
            Key Programs
          </h3>
          <ul className="space-y-2.5 text-xs font-semibold text-slate-700">
            <li>
              <HashLink smooth to="/#courses?tab=programs" className="hover:text-[#1d4ed8] transition-all">
                Personalized Mentorship
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#courses?tab=mains" className="hover:text-[#1d4ed8] transition-all">
                Daily Answer Writing
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#courses?tab=mains" className="hover:text-[#1d4ed8] transition-all">
                Mains Test Series
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#courses?tab=programs" className="hover:text-[#1d4ed8] transition-all">
                Prelims Test Series
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#courses?tab=modules" className="hover:text-[#1d4ed8] transition-all">
                Interview Guidance
              </HashLink>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-base font-extrabold text-[#163F66] mb-4 border-b border-slate-100 pb-2 uppercase tracking-wider text-xs">
            Legal & Policies
          </h3>
          <ul className="space-y-2.5 text-xs font-semibold">
            <li>
              <Link
                to="/privacy"
                className="hover:text-[#1d4ed8] transition-all text-slate-700 hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="hover:text-[#1d4ed8] transition-all text-slate-700 hover:underline"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/refund"
                className="hover:text-[#1d4ed8] transition-all text-slate-700 hover:underline"
              >
                Refund & Return Policy
              </Link>
            </li>
            <li>
              <Link
                to="/cancellation"
                className="hover:text-[#1d4ed8] transition-all text-slate-700 hover:underline"
              >
                Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-slate-200 mt-6 pt-5 text-center text-xs font-semibold text-slate-500 relative z-10 bg-slate-50 pb-4">
        © {new Date().getFullYear()} iTopper. All Rights Reserved. | Dedicated UPSC Civil Services Prep
      </div>
    </footer>
  );
};

export default Footer;
