import NavMenu from "@/components/NavMenu";


export default function KaraokiLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavMenu />
            {children}
        </>
    )
}

