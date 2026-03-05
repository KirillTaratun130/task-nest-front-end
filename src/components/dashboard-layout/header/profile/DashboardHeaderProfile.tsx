'use client'

import {useProfile} from "@/hooks/useProfile";
import Loader from "@/components/ui/Loader";

const DashboardHeaderProfile = () => {
    const { data, isLoading } = useProfile()

    return (
        <div className='absolute right-[15px]'>
            { isLoading ? (
                <Loader />
            ) : (
                <div className='flex items-center'>
                    <div className='text-right mr-3'>
                        <p className='text-text-heading font-bold'>{ data?.user.name }</p>
                        <p className='text-text-secondary text-sm'>{ data?.user.email }</p>
                    </div>

                    <div className='w-10 h-10 flex justify-center items-center text-2xl text-text-heading bg-white/20 rounded uppercase'>
                        { data?.user?.name?.charAt(0) || 'A' }
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHeaderProfile;