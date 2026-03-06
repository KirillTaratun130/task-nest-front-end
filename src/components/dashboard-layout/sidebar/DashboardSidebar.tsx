import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/components/dashboard-layout/sidebar/LogoutButton";
import {MENU} from "@/components/dashboard-layout/sidebar/menu.data";
import MenuItem from "@/components/dashboard-layout/sidebar/MenuItem";

const DashboardSidebar = () => {
    return (
        <aside className='border-r h-full flex flex-col justify-between'>
            <div>
                <Link href='/' className='flex items-center p-3 gap-2.5 border-b border-card-border'>
                    <Image src='/images/logo.svg' alt='logo' width={60} height={60} />
                    <span className='text-2xl font-bold text-text-heading relative'>TASK Nest</span>
                </Link>
                <div className='p-3 relative'>
                    { MENU.map(item => (
                      <MenuItem item={item} key={item.link} />
                    ))}
                    <div className='p-1.5 mt-2'>
                        <LogoutButton />
                    </div>
                </div>
            </div>
            <footer className='text-sm text-text-secondary/40 font-normal text-center mb-4'>
                TASK Nest · 2026
            </footer>
        </aside>

    );
};

export default DashboardSidebar;