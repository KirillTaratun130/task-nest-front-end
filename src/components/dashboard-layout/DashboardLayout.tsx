import {PropsWithChildren} from "react";
import DashboardSidebar from "@/components/dashboard-layout/sidebar/DashboardSidebar";
import DashboardHeader from "@/components/dashboard-layout/header/DashboardHeader";

const DashboardLayout = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <div className='grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]'>
            <DashboardSidebar />
            <main>
                <DashboardHeader />
                { children }
            </main>
        </div>
    );
};

export default DashboardLayout;