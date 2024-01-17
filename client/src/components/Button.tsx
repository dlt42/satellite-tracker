import { FC } from 'react';

type ButtonProps = {
  title?: string;
  children: string | JSX.Element;
  className?: string;
  onClick: (e: unknown) => void;
};

const Button: FC<ButtonProps> = ({ children, title, onClick, className }) => (
  <div className='flex flex-row justify-center gap-1 text-center'>
    <button
      title={title ?? undefined}
      className={
        (className ? `${className} ` : ``) +
        'min-w-8 cursor-pointer whitespace-nowrap border-2 border-solid border-gray-800 bg-gray-200 p-0.5 text-base font-normal hover:bg-gray-800 hover:text-gray-200'
      }
      onClick={(e) => {
        onClick(e);
      }}
    >
      {children}
    </button>
  </div>
);

export default Button;
