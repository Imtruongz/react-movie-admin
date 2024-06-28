import React, { useState, useEffect } from "react";
import InfoItemField from "../constants/InfoItemFields";
import InfoCard from "../components/common/InfoCard";
import { getCountMovies } from "../services/movieService";
import { getCountUser } from "../services/userService";
import { handleCountComment } from "../services/comment";

const HomePage = () => {
  const [infoFields, setInfoFields] = useState(InfoItemField);
  

  const updateFieldCount = (name, count) => {
    setInfoFields((currentFields) =>
      currentFields.map((field) => {
        if (field.name === name) {
          return { ...field, TotalCount: count };
        }
        return field;
      })
    );
  };

  const fetchMovieCount = async () => {
    try {
      const response = await getCountMovies();
      const movieCount = response.count;
      updateFieldCount("Movies", movieCount);
    } catch (error) {
      console.error("Error while fetching movie count:", error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await getCountUser();
      const userCount = response.count;
      updateFieldCount("Users", userCount);
    } catch (error) {
      console.error("Error while fetching user count:", error);
    }
  };

  const fetchCommentCount = async()=>{
    try {
      const response = await handleCountComment()
      const commentCount = response.count
      updateFieldCount('Comments', commentCount)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchUserCount(),
          fetchMovieCount(),
        ]);
        fetchCommentCount()
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="rounded-lg h-[calc(100vh-136px)] w-full flex flex-wrap gap-4 p-4">
        {infoFields.map((item, index) => (
          <InfoCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
