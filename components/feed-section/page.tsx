import React from "react";
import styles from "./page.module.scss";
import { cardBackgroundColors } from "@/utils/constants";

interface ItemData {
  model: string;
  text?: string;
  src?: string;
}

export interface FeedSectionItem {
  prompt: string;
  promptType: string;
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
        <span>AI Prompt: &nbsp;</span> {prompt}
      </div>

      <div className={styles.imageGrid}>
        {items.map(({ model, src, text }, index) => (
          <div
            key={index}
            style={{ background: cardBackgroundColors[index] }}
            className={styles.card}
          >
            <div className={styles.modelName}>
              Model: &nbsp;&nbsp;<span>{model}</span>
            </div>
            <div className={styles.answerSection}>
              {src ? (
                <div className={styles.imageCard}>
                  <img src={src} alt={model} />
                </div>
              ) : text ? (
                <div className={styles.text}>{text}</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedSection;
