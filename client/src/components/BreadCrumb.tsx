import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Button from './Button';

type BreadcrumbsPropts = { items: { label: string; link: string }[] };

const Breadcrumbs: FC<BreadcrumbsPropts> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div className='flex w-full flex-row gap-1'>
      <nav
        aria-label='breadcrumb'
        className='flex flex-grow list-none flex-row gap-1'
      >
        <ol className='flex grow list-none flex-row items-center gap-1 border border-solid border-gray-800 p-1 font-bold'>
          {items.map((item, index) => (
            <li key={`${index}-${item.link}`} className='flex flex-row gap-1'>
              <span>{index === 0 ? ':' : '>'}</span>{' '}
              <NavLink to={item.link}>{item.label}</NavLink>
            </li>
          ))}
        </ol>
      </nav>
      <Button onClick={() => navigate(`/new`)}>+</Button>
    </div>
  );
};

export default Breadcrumbs;
