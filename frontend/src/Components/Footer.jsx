import React from 'react';
import { Link } from 'react-router-dom';
import PredictiveModeling from './PredictiveModeling';
import Tutorials from './Tutorials';
import VisualizationDashboard from './VisualizationDashboard';
import DataCleaningTools from './DataCleaningTools';
const Footer = () => {
  return (
    <div className="footer bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Footer Content */}
        <p className="text-lg">© 2025 FlowLytics - All Rights Reserved</p>
        <div className="mt-4 flex gap-7 justify-center items-center">
          <Link>Data Modelling</Link>
          <Link>Data Science Tutorials</Link>
          <Link>Data Visualization</Link>
          <Link>Data Cleansing Tools</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
