import Footer from "@/components/footer";
import Nav from "@/components/nav";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode
}

const Layout = ({
    children,
}: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col flex-wrap content-center gap-4 lg:gap-16" >
            <Nav />
            <div className="w-fit px-2 mx-auto relative grow" >
                {children}
            </div>
            <Footer />
        </div>
    )
};

export default Layout;