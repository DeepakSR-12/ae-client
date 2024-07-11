import React from "react";
import styles from "./page.module.scss";

interface ItemData {
  model: string;
  text?: string;
  src?: string;
}

export interface FeedSectionItem {
  prompt: string;
  items: ItemData[];
}

interface FeedSectionProps {
  data: FeedSectionItem;
}

const FeedSection: React.FC<FeedSectionProps> = ({ data }) => {
  const { prompt, items } = data;

  return (
    <div className={styles.feedSection}>
      <div className={styles.prompt}>
        <span>AI Prompt:</span> {prompt}
      </div>

      <div className={styles.imageGrid}>
        {items.map(({ model, src, text }, index) => (
          <div key={index} className={styles.imageCard}>
            <div className={styles.modelName}>
              <span>Model:</span> {model}
            </div>
            {src ? (
              <img src={src} alt={model} className={styles.image} />
            ) : text ? (
              <div>{text}</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedSection;
