import {Outlet} from 'react-router-dom';

export const BaseLayout: React.FC = () => {
  return (
    <div>
      layout
      <Outlet />
    </div>
  )
}
