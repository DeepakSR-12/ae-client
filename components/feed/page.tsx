import React from "react";
import styles from "./page.module.scss";
import FeedSection, { FeedSectionItem } from "../feed-section/page";

interface FeedProps {
  feedData: FeedSectionItem[];
}

const Feed: React.FC<FeedProps> = ({ feedData }) => {
  return (
    <div className={styles.feedContainer}>
      {feedData.map((data, index) => (
        <FeedSection key={index} data={data} />
      ))}
    </div>
  );
};

export default Feed;
