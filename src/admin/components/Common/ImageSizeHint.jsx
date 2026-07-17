import React from 'react';

const RECOMMENDED_IMAGE_SIZES = {
  hero: 'Recommended size: 1920 x 800 px desktop, 768 x 1024 px mobile.',
  service: 'Recommended size: 800 x 600 px.',
  consultation: 'Recommended size: 800 x 600 px.',
  course: 'Recommended size: 1200 x 675 px.',
  blog: 'Recommended size: 1200 x 630 px.',
  about: 'Recommended size: 800 x 800 px.',
  profile: 'Recommended size: 800 x 800 px.',
};

const ImageSizeHint = ({ type = 'course', className = '' }) => (
  <p className={`mt-2 rounded-md border border-[#00B7B3]/20 bg-[#00B7B3]/10 px-3 py-2 text-xs font-medium text-[#00B7B3] ${className}`}>
    {RECOMMENDED_IMAGE_SIZES[type] || RECOMMENDED_IMAGE_SIZES.course}
  </p>
);

export { RECOMMENDED_IMAGE_SIZES };
export default ImageSizeHint;
