import React from 'react';
import styles from './page.module.scss';

interface ImageData {
  model: string;
  src: string;
}

export interface FeedSectionData {
  prompt: string;
  images: ImageData[];
}

interface FeedSectionProps {
  data: FeedSectionData;
}

const FeedSection: React.FC<FeedSectionProps> = ({ data }) => {
  const { prompt, images } = data;

  return (
    <div className={styles.feedSection}>
      <div className={styles.promptCard}>
        <div className={styles.prompt}>
          <span>Question:</span> {prompt}
        </div>
      </div>
      <div className={styles.imageGrid}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageCard}>
            <div className={styles.modelName}>{image.model}</div>
            <img src={image.src} alt={image.model} className={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedSection;
