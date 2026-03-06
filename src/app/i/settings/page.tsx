import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constans/seo.constans";
import Settings from "@/app/i/settings/Settings";
import Heading from "@/components/ui/Heading";

export const metadata: Metadata = {
    title: 'Settings',
    ...NO_INDEX_PAGE
}

const PageSettings = () => {
    return (
        <div className='px-[20px]'>
            <Heading title='Настройки' />
            <Settings />
        </div>
    )
};

export default PageSettings;