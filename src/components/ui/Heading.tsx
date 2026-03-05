interface IHeadingProps {
    title: string
}

const Heading = ({ title }: IHeadingProps) => {
    return (
        <div className='text-gray-50 md:text-4xl text-2xl pb-3 mb-3 border-b-1 border-gray-800'>
            { title }
        </div>
    );
};

export default Heading;