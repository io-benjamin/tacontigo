import React from 'react';
import menuImage from './assets/Menu/TacontigoMenu.JPG';

function Menu() {
  return (
    <div>
      <a href={menuImage} target="_blank" rel="noopener noreferrer">
        Open Menu Image in New Tab
      </a>
    </div>
  );
}

export default Menu;