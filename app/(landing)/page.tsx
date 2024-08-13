"use client";
import React, { useEffect, useState } from "react";
import Feed from "../../components/feed/page";
import styles from "./page.module.scss";
import axios from "axios";
import { FeedSectionItem } from "@/components/feed-section/page";
import Loader from "@/components/loader/page";
import Placeholder from "@/components/ui/placeholder/page";

const Landing = () => {
  const [feedData, setFeedData] = useState<FeedSectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/ai-data`
      );
      if (response?.data) {
        const reversed = response.data.reverse();
        setFeedData(reversed);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className={styles.landing}>
      {isLoading ? (
        <Loader />
      ) : feedData?.length ? (
        <Feed feedData={feedData} />
      ) : (
        <Placeholder label="No feed found" path="/admin" />
      )}
    </div>
  );
};

export default Landing;
