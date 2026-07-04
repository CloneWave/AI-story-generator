import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingStatus from "./LoadingStatus";

const API_BASE_URL = "/api";

const StoryLoader = () => {
  const { id } = useParams;
  const navigate = useNavigate;
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStory(id);
  }, [id]);

  const loadStory = async (storyId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/stories/${storyId}/complete`,
      );
      setStory(response.data);
      setIsLoading(false);
    } catch (err) {
      if (err.resonse?.status === 404) {
        setError("Story not found");
      } else {
        setError("Failed to load the story");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const createNewStory = () => {
    navigate("/");
  };
  if (isLoading) {
    return <LoadingStatus />;
  }
  if (error) {
    return (
      <div className="story-loader">
        <div className="error-message">
          <h2>Story Not Found</h2>
          <p>{error}</p>
          <button onClick={createNewStory}>Go to Create New Story</button>
        </div>
      </div>
    );
  }
  if (story) {
    return <div className="story-loader"></div>;
  }
};

export default StoryLoader;
