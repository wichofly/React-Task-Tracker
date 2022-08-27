import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Button from './Button';

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {/* Let's make it Dynamic: showAdd is going to be a true or false. If showAdd is true we want to show 'Close' else we want to show 'Add'*/}
      {location.pathname === '/' && <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd}
      />}
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.propTypes = {
  title: PropTypes.string,
};

// CSS in JSX
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'yellow'
// }

export default Header;
