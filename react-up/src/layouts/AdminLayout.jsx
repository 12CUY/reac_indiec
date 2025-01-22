import Sidebar from '../components/Sidebar';
import PropTypes from 'prop-types';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-4 w-full">{children}</main>
    </div>
  );
};
AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
