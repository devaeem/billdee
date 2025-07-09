"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  const navigation = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Resources", href: "#resources" },
      { name: "Case Studies", href: "#case-studies" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "News", href: "#news" },
      { name: "Press", href: "#press" },
    ],
    social: [
      {
        name: "Facebook",
        href: "#",
        icon: Facebook,
      },
      {
        name: "Instagram",
        href: "#",
        icon: Instagram,
      },
      {
        name: "Twitter",
        href: "#",
        icon: Twitter,
      },
    ],
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-12 xl:grid-cols-3 xl:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className=" uppercase tracking-wide  bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-2xl font-extrabold text-transparent">
                BillDee
              </span>
            </Link>
            <p className="text-sm leading-6 text-gray-600">
              Making billing and invoicing simple and efficient for businesses
              of all sizes.
            </p>
            <div className="flex space-x-5">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group rounded-full bg-white p-2 shadow-sm transition-all hover:shadow-md"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5 text-gray-600 transition-colors group-hover:text-emerald-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Product</h3>
              <ul role="list" className="mt-6 space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-emerald-600"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 transition-transform group-hover:scale-110">
                        <ArrowRight className="h-3 w-3 text-emerald-500" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <ul role="list" className="mt-6 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-emerald-600"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 transition-transform group-hover:scale-110">
                        <ArrowRight className="h-3 w-3 text-emerald-500" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <div className="flex items-start gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                      <MapPin className="h-3 w-3 text-emerald-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      123 Business Street
                      <br />
                      Bangkok, Thailand 10110
                    </span>
                  </div>
                </li>
                <li>
                  <Link
                    href="tel:+66123456789"
                    className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-emerald-600"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 transition-transform group-hover:scale-110">
                      <Phone className="h-3 w-3 text-emerald-500" />
                    </div>
                    <span className="font-medium">+66 123 456 789</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:contact@billdee.com"
                    className="group flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-emerald-600"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 transition-transform group-hover:scale-110">
                      <Mail className="h-3 w-3 text-emerald-500" />
                    </div>
                    <span className="font-medium">contact@billdee.com</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-900/10 pt-8">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} BillDee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
