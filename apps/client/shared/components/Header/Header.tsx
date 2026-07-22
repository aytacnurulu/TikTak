import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import SearchBar from './SearchBar';

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode; 
}

interface HeaderProps {
  userAddress?: string;
}

const Header = ({ userAddress = 'Ünvan seçilməyib' }: HeaderProps) => {
const navItems: NavItem[] = [
  {
    href: '/account',
    label: 'Hesabım',
    icon: <Image src="/icons/user.svg" alt="" width={20} height={20} />,
  },
  {
    href: '/wishlist',
    label: 'Siyahılarım',
    icon: <Image src="/icons/favorites.svg" alt="" width={20} height={20} />,
  },
  {
    href: '/basket',
    label: 'Səbətim',
    icon: <Image src="/icons/basket.svg" alt="" width={20} height={20} />,
  },
];

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4">
        <Link href="/" className="text-xl sm:text-4xl font-extrabold text-dark shrink-0">
          TIK TAK
        </Link>

        <div className="hidden sm:flex flex-col bg-gray-50 border border-gray-200 rounded-[10px] px-3 py-1.5 shrink-0 max-w-[180px]">
          <span className="text-base font-semibold text-dark">Ünvan</span>
          <span className="text-base text-gray-500 truncate">{userAddress}</span>
        </div>

        <div className="flex-1 min-w-0">
          <SearchBar />
        </div>

        <nav className="hidden md:flex items-center gap-5 shrink-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-dark transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex md:hidden items-center gap-3 shrink-0">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-label={item.label}>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;