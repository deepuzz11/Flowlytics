import React from 'react'
import Navbar from '../Components/Navbar'
import DatasetUploader from '../Components/DatasetUploader'
import DataCleaningTools from '../Components/DataCleaningTools'
import VisualizationDashboard from '../Components/VisualizationDashboard'
import Tutorials from '../Components/Tutorials'
import PredictiveModeling from '../Components/PredictiveModeling'
import Footer from '../Components/Footer'

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-4 sm:mx-8 lg:mx-16">
        <DatasetUploader />
        <DataCleaningTools />
        <VisualizationDashboard />
        <Tutorials />
        <PredictiveModeling />
      </div>
      <Footer />
    </div>
  )
}

export default Main
