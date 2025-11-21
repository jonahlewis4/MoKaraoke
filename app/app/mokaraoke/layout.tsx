import NavMenu from "@/utils/components/NavMenu";


export default function KaraokiLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavMenu />

            {children}
        </>
    )
}

