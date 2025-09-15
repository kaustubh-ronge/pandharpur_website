import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react'; // Keep this for quick links
import {
  companyLinks,
  legalLinks,
  contactDetails,
  socialLinks, // This will be updated
  galleryImages,
  footerBottomLinks,
} from '@/data/FooterData/footer';

const Footer = () => {
  return (
    <footer className="container-fluid bg-gray-900 text-gray-300 pt-16 mt-24">
      <div className="container mx-auto px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: Quick Links */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">Quick Links</h4>
            {companyLinks.map((link, index) => (
              <Link key={index} href={link.href} className="flex items-center text-gray-300 hover:text-white hover:tracking-wider transition-all duration-300 mb-2">
                <ChevronRight size={16} className="mr-2" />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">Contact</h4>
            <p className="mb-3 flex items-start">{contactDetails.icons.address}{contactDetails.address}</p>
            <p className="mb-3 flex items-center">{contactDetails.icons.phone}{contactDetails.phone}</p>
            <p className="mb-3 flex items-center">{contactDetails.icons.email}{contactDetails.email}</p>
            <div className="flex pt-2 space-x-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 border border-gray-400 rounded-full flex items-center justify-center text-gray-300 hover:bg-white hover:text-gray-900 transition-colors duration-300"
                  aria-label={`Link to ${social.href}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Gallery */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">Gallery</h4>

            {/* Add mt-2 (margin-top) here to push the grid down */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {galleryImages.map((src, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded">
                  <Image
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Column 4: Legal & Help */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-4">Legal & Help</h4>
            {legalLinks.map((link, index) => (
              <Link key={index} href={link.href} className="flex items-center text-gray-300 hover:text-white hover:tracking-wider transition-all duration-300 mb-2">
                <ChevronRight size={16} className="mr-2" />
                {link.name}
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="container mx-auto px-4">
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-3 md:mb-0">
              &copy; {new Date().getFullYear()} <Link href="/" className="border-b border-gray-500 hover:text-white">Pandharpur Darshan</Link>, All Right Reserved.
            </div>
            <div className="flex space-x-4">
              {footerBottomLinks.map((link, index) => (
                <Link key={index} href={link.href} className="text-sm text-gray-400 hover:text-white">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;