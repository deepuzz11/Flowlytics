import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Footer Content */}
        <p className="text-lg">© 2025 FlowLytics - All Rights Reserved</p>
        <div className="mt-4 flex gap-7 justify-center items-center">
          {/* Use route paths here */}
          <Link to="/predictive-modeling">Data Modelling</Link>
          <Link to="/tutorials">Data Science Tutorials</Link>
          <Link to="/visualization-dashboard">Data Visualization</Link>
          <Link to="/data-cleaning-tools">Data Cleansing Tools</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
