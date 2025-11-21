import Link from "next/link";

export function Header({ title, subtitle, link }: { title: string, subtitle: string, link: string}) {
    return (
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <Link href={link} className="text-blue-500 text-sm hover:underline">
                {subtitle}
            </Link>
        </div>
    );
}