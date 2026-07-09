import { useState, useEffect } from "react";
const StoryGame = ({ story, onNewStory }) => {
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [options, setOptions] = useState([]);
  const [isEnding, setIsEnding] = useState(false);
  const [isWinningEnding, setIsWinningEnding] = useState(false);

  useEffect(() => {
    if (story && story.root_node) {
      const rootNodeId = story.root_node.id;
      setCurrentNodeId(rootNodeId);
    }
  }, [story]);

  useEffect(() => {
    if (currentNodeId && story && story.all_nodes) {
      const node = story.all_nodes[currentNodeId];
      setCurrentNode(node);
      setIsEnding(node.is_ending);
      setIsWinningEnding(node.is_winning_ending);

      if (!node.is_ending && node.options && node.options.length > 0) {
        setOptions(node.options);
      } else {
        setOptions([]);
      }
    }
  }, [currentNodeId, story]);

  const chooseOptions = (optionId) => {
    setCurrentNodeId(optionId);
  };
  const restartStory = () => {
    if (story && story.root_node) {
      setCurrentNodeId(story.root_node.id);
    }
  };
  return (
    <div className="story-game">
      <header className="story-header">
        <h2>{story.title}</h2>
      </header>
      <div className="story-content">
        {currentNode && (
          <div className="story-node">
            <p className="">{currentNode.content}</p>

            {isEnding ? (
              <div className="story-ending">
                <h3>{isWinningEnding ? "Congratulations" : "The end"}</h3>
                {isWinningEnding
                  ? "You reached the winning ending"
                  : "Your adventure has ended"}
              </div>
            ) : (
              <div>
                <h4>Choose your next step:</h4>
                <ul className="options-list">
                  {options.map((option) => (
                    <li key={option.id} className="option-item">
                      <button
                        className="option-button"
                        onClick={() => {
                          chooseOptions(option.id);
                        }}
                      >
                        {option.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <div className="story-control">
          <button onClick={restartStory} className="">
            Restart story
          </button>
          {onNewStory && (
            <button onClick={onNewStory} className="">
              New Story
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryGame;
