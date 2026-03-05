interface IHeadingProps {
    title: string
}

const Heading = ({ title }: IHeadingProps) => {
    return (
        <div className='text-text-heading md:text-4xl text-2xl pb-8 border-b-1 border-card-border'>
            { title }
        </div>
    );
};

export default Heading;