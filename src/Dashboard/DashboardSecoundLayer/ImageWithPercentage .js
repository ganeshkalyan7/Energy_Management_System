import React from 'react';

const ImageWithPercentage = ({ src, percentage }) => {
  const imageSize = 100 + 100;

  const imageContainerStyle = {
    position: 'relative',
    width: `${imageSize}px`,
    // height:`$${imageSize}px`,
    marginRight: '0'
  };

  const percentageTextStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '16px', // Adjust the font size based on your needs
    color: '#fff', // Adjust the text color based on your needs
    fontSize: '32px',
   fontweight: '600'
  };

  return (
    <div style={imageContainerStyle}>
      <img src={src} alt="Your Image" style={{ width: '100%', height: '100px' }} />
      <div style={percentageTextStyle}><b>{percentage}%</b></div>
    </div>
  );
};

export default ImageWithPercentage;
