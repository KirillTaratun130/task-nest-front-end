interface IHeadingProps {
    title: string
}

const Heading = ({ title }: IHeadingProps) => {
    return (
        <div className='text-gray-50 md:text-4xl text-2xl pb-6 text-center'>
            { title }
        </div>
    );
};

export default Heading;