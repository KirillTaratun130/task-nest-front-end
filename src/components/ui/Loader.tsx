import { Loader as LoaderIcon} from "lucide-react";

const Loader = () => {
    return (
        <div>
            <LoaderIcon className='animate-spin w-10 h-10 text-white' />
        </div>
    );
};

export default Loader;