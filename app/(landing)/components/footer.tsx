"use client";

import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "ผลิตภัณฑ์",
    links: [
      { name: "คุณสมบัติ", href: "#features" },
      { name: "ราคา", href: "#pricing" },
      { name: "คู่มือการใช้งาน", href: "#docs" },
      { name: "API", href: "#api" },
      { name: "ความปลอดภัย", href: "#security" },
    ],
  },
  {
    title: "บริษัท",
    links: [
      { name: "เกี่ยวกับเรา", href: "#about" },
      { name: "บล็อก", href: "#blog" },
      { name: "ร่วมงานกับเรา", href: "#careers" },
      { name: "ข่าวสาร", href: "#press" },
      { name: "ติดต่อเรา", href: "#contact" },
    ],
  },
  {
    title: "ช่วยเหลือ",
    links: [
      { name: "ศูนย์ช่วยเหลือ", href: "#help" },
      { name: "สถานะระบบ", href: "#status" },
      { name: "รายงานปัญหา", href: "#report" },
      { name: "นโยบายความเป็นส่วนตัว", href: "#privacy" },
      { name: "เงื่อนไขการใช้งาน", href: "#terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-orange-100 dark:border-orange-500/10 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="relative w-8 h-8 mr-2">
                <Image
                  src="/vercel.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-semibold text-foreground">
                BillDee
              </span>
            </div>
            <p className="text-base text-muted-foreground max-w-xs">
              ระบบจัดการร้านค้าที่ช่วยให้ธุรกิจของคุณเติบโตอย่างชาญฉลาด
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-orange-500 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links section */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-2 xl:mt-0">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {group.title}
                </h3>
                <ul role="list" className="mt-6 space-y-3">
                  {group.links.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-orange-100 dark:border-orange-500/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BillDee. สงวนลิขสิทธิ์.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
              <div className="h-4 w-px bg-orange-200 dark:bg-orange-500/20" />
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                เงื่อนไขการใช้งาน
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];
