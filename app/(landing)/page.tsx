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

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/ai-data");
      if (response?.data) setFeedData(response?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
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
