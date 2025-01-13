import React from 'react'
import Navbar from '../Component/Navbar'
import DataCleansingTools from '../Component/DataCleaningTools'
import VisualizationDashboard from '../Component/VisualizationDashboard'
import Tutorials from '../Component/Tutorials'
import Footer from '../Component/Footer'
import PredectiveModeling from '../Component/PredectiveModeling'
import DatasetUploader from '../Component/DatasetUploader'

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="mx-4 sm:mx-8 lg:mx-16">
        <DatasetUploader />
        <DataCleansingTools />
        <VisualizationDashboard />
        <Tutorials />
        <PredectiveModeling />
      </div>
      <Footer />
    </div>
  )
}

export default Main
