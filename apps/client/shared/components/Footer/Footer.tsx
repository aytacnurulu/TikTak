import type { ReactNode } from "react";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Telegram", href: "#" },
  { name: "TikTok", href: "#" },
  { name: "WhatsApp", href: "#" },
];

const socialIcons: Record<string, ReactNode> = {
  Facebook: (
    <path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2.2V2.1C16.7 2 15.4 2 14 2c-3 0-5 1.8-5 5.1V10H6v4h3v8h4z" />
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9l6 3-6 3V9z" fill="white" stroke="none" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8" cy="8" r="1.5" fill="white" stroke="none" />
      <path
        d="M6 11v7M10 11v7M10 14c0-2 3-2 3 0v4"
        stroke="white"
        fill="none"
      />
    </>
  ),
  Telegram: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  TikTok: (
    <path d="M14 3v10.5a2.5 2.5 0 1 1-2.5-2.5c.2 0 .3 0 .5.03V8.5a5 5 0 1 0 5 5V8c1 .6 2.1 1 3 1V6.5c-1.7 0-3-1.1-3-3.5h-3z" />
  ),
  WhatsApp: (
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" />
  ),
};

const footerLinks = {
  Şirkət: [
    [
      "Xüsusi təkliflər",
      "Haqqımızda",
      "Kartlar",
      "İcarəyə vermək yeriniz var?",
    ],
    ["Xəbərlər", "Karyera", "Müştəri xidmətləri"],
  ],
  Digər: [["Onlayn market", "Marketlərimiz"]],
  Hüquq: [["İstifadə şərtləri", "İmtina"]],
};

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          <div className="flex flex-col sm:flex-row gap-16">
            {Object.entries(footerLinks).map(([title, columns]) => (
              <div key={title} className="flex gap-10">
                <div>
                  <h4 className="font-semibold text-dark mb-3">{title}</h4>
                  <div className="flex gap-10">
                    {columns.map((links, i) => (
                      <ul key={i} className="space-y-2">
                        {links.map((link) => (
                          <li key={link}>
                            <Link
                              href="#"
                              className="text-sm text-gray-500 hover:text-dark"
                            >
                              {link}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="min-w-[280px]">
            <h4 className="font-semibold text-dark mb-3">
              Yeniliklərə abunə olun
            </h4>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="E-mail daxil edin"
                containerClassName="flex-1"
              />
              <Button variant="success" size="md">
                Göndər
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <span>
            © {new Date().getFullYear()} Azerbaijan Supermarket. Bütün hüquqlar
            qorunur
          </span>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">Site by 🔶 JIS</span>
            <span className="flex items-center gap-1">🌐 Azərbaycan</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="h-8 w-8 rounded-full bg-success/10 text-success flex items-center justify-center hover:bg-success/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={16}
                    height={16}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    {socialIcons[social.name]}
                  </svg>
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
