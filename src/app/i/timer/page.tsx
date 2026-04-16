import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constans/seo.constans";
import Heading from "@/components/ui/Heading";
import Timer from "@/app/i/timer/Timer";

export const metadata: Metadata = {
    title: 'Timer',
    ...NO_INDEX_PAGE
}

const TimerPage = () => {
    return (
        <div className='px-[20px]'>
            <Heading title='Таймер' />
            <Timer />
        </div>
    );
};

export default TimerPage;