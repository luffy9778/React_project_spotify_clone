import React from "react";
import HomeLayoutNav from "../components/home/HomeLayoutNav";
import Podcast from "../components/podcast/Podcast";

const PodcastContainer = () => {
  return (
    <div className="podcast__section">
      <HomeLayoutNav />
      <Podcast />
      <Podcast />
      <Podcast />
      <Podcast />
      <Podcast />
      <Podcast />
    </div>
  );
};

export default PodcastContainer;
