import Link from "next/link";

export function Header({
                           title,
                           subtitle,
                           link,
                           popout = false
                       }: {
    title: string;
    subtitle: string;
    link: string;
    popout?: boolean;
}) {
    return (
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>

            <Link
                href={link}
                className="text-blue-500 text-sm hover:underline"
                {...(popout
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
            >
                {subtitle}
            </Link>
        </div>
    );
}
