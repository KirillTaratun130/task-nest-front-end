import {IMenuItem} from "@/components/dashboard-layout/sidebar/menu.interface";
import Link from "next/link";


const MenuItem = ({ item }: { item: IMenuItem }) => {
    return (
        <div>
            <Link href={item.link} className='flex gap-2.5 items-center p-1.5 mt-2 hover:bg-bg-dark rounded-lg transition'>
                <item.icon color='white' />
                <span className='text-text-body'>{ item.name }</span>
            </Link>
        </div>
    );
};

export default MenuItem;