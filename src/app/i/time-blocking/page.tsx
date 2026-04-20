import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constans/seo.constans";
import Heading from "@/components/ui/Heading";
import TimeBlocking from "@/app/i/time-blocking/TimeBlocking";

export const metadata: Metadata = {
    title: 'Time blocking',
    ...NO_INDEX_PAGE
}

const TimeBlockingPage = () => {
    return (
        <div className='px-[20px]'>
            <Heading title='Календарь' />
            <TimeBlocking />
        </div>
    );
};

export default TimeBlockingPage;