// import React, { useState } from 'react';
// import "./test.css"
// const Test = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className={`overlay-navbar ${isOpen ? 'open' : ''}`}>
//       <div className="overlay-navbar__toggle" onClick={handleToggle}>
//         <span className="overlay-navbar__toggle-icon"></span>
//       </div>
//       {isOpen && (
//       <ul className="overlay-navbar__menu">
//         <li className="overlay-navbar__menu-item">Home</li>
//         <li className="overlay-navbar__menu-item">About</li>
//         <li className="overlay-navbar__menu-item">Services</li>
//         <li className="overlay-navbar__menu-item">Contact</li>
//       </ul>
//       )}
//     </nav>
//   );
// };

// export default Test;


import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function Test(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
      />
    </Box>
  );
}