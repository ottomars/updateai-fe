import './index.css';
import React from 'react';

const Header = ({children}) => (
  <div className="Header">
    <div className="Header-inner">
      {children}
    </div>
  </div>
)

Header.propTypes = {
  children: React.PropTypes.node.isRequired
}

export default Header
