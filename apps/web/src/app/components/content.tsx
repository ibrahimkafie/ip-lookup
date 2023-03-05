type Props = {
  children: React.ReactNode;
};

export const Content = ({ children }: Props) => {
  return (
    <div className="flex justify-center bg-gray-100 text-gray-600 min-h-screen">
      <div className="flex flex-col items-center box-border md:p-4 py-24  max-w-xl w-full">
        {children}
      </div>
    </div>
  );
};

export default Content;
