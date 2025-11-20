"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

//TODO future idea: make the paths and logo not hard coded
const NavMenu = () => {
    const pathname = usePathname();

    const getLinkClass = (href: string) => {
        const isActive = pathname === href;
        return `px-3 py-1 rounded font-semibold transition-colors ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:text-blue-600 hover:underline"
        }`;
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname === href) {
            e.preventDefault();
        }
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
                <img src="/favicon.ico" alt="MoKaraoki Logo" className="h-8 w-8" />
                <span className="font-bold text-lg text-blue-600">MoKaraoki</span>
            </div>
            <div className="space-x-6">
                <Link
                    href="/mokaraoke"
                    className={getLinkClass("/mokaraoke")}
                    onClick={(e) => handleClick(e, "/mokaraoke")}
                >
                    Home
                </Link>
                <Link
                    href="/mokaraoke/create"
                    className={getLinkClass("/mokaraoke/create")}
                    onClick={(e) => handleClick(e, "/mokaraoke/create")}
                >
                    Create
                </Link>
                <Link
                    href="/mokaraoke/view"
                    className={getLinkClass("/mokaraoke/view")}
                    onClick={(e) => handleClick(e, "/mokaraoke/view")}
                >
                    View
                </Link>
            </div>
        </nav>
    );
}
export default NavMenu