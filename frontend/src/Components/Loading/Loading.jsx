import React from 'react';
import loadingStyles from './loading.module.css'

const Loading = () => {
  return (
    <div className={loadingStyles.loaderContainer}>
        <div className={loadingStyles.spinner}></div>
    </div>
    
  )
}

export default Loading