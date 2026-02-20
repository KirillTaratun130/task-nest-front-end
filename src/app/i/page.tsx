import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constans/seo.constans";

export const metadata: Metadata = {
    title: 'Dashboard',
    ...NO_INDEX_PAGE
}

const DashboardPage = () => {
    return (
        <div>
            Dashboard
        </div>
    );
};

export default DashboardPage;