import GlobalLoader from "@/components/dashboard-layout/header/GlobalLoader";
import DashboardHeaderProfile from "@/components/dashboard-layout/header/profile/DashboardHeaderProfile";

const DashboardHeader = () => {
    return (
        <header className='pt-6'>
            {/*<GlobalLoader />*/}
            <DashboardHeaderProfile />
        </header>
    );
};

export default DashboardHeader;