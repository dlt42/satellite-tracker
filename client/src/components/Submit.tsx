import { FC } from 'react';

type SubmitProps = {
  title?: string;
  className?: string;
};

const Submit: FC<SubmitProps> = ({ title, className }) => (
  <div className='flex flex-row justify-center gap-1 text-center'>
    <input
      type='submit'
      title={title}
      value={title}
      className={
        (className ? `${className} ` : ``) +
        'min-w-8 cursor-pointer whitespace-nowrap border-2 border-solid border-gray-800 bg-gray-200 p-0.5 text-base font-normal hover:bg-gray-800 hover:text-gray-200'
      }
    />
  </div>
);

export default Submit;
