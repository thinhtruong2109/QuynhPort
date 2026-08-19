import React from 'react';
import './ImagePlaceholder.css';

interface Props {
  label?: string;
  aspectRatio?: string; // e.g. "16/9" or "4/3" or "1/1"
  className?: string;
}

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const ImagePlaceholder: React.FC<Props> = ({ label, aspectRatio = '16/9', className = '' }) => {
  return (
    <div
      className={`img-ph ${className}`}
      style={{ aspectRatio }}
    >
      <div className="img-ph__corner" />
      <div className="img-ph__inner">
        <CameraIcon />
        {label && <span>{label}</span>}
      </div>
    </div>
  );
};

export default ImagePlaceholder;
