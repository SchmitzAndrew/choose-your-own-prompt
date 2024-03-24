"use client";

import { useEffect, useState } from "react";
import Stage from "@/components/Stage";
import Decisions from "@/components/Decisions";
import { stage } from "@/lib/stage";

export default function Home() {
  const backgroundGradient = {
    background: "linear-gradient(90deg, #8360c3 0%, #2ebf91 100%)",
  };

  const [story, setStory] = useState<Array<string>>([stage]);
  const [wasDecisionMade, setWasDecisionMade] = useState(false);
  const [continueGeneratingStory, setContinueGeneratingStory] = useState(false);
  const [currentDecisions, setCurrentDecisions] = useState(null);

  const addStoryElement = (newElement: string) => {
    setStory((currentStory) => [...currentStory, newElement]);
  };

  useEffect(() => {
    console.log("Decisions Updated", currentDecisions);
    // Perform any action that depends on the updated decisions here
  }, [currentDecisions]);



  const setDecisions = async (currentStory: Array<string>) => {
    console.log("Start creating more decisions")
    // Fetch decisions based on the current story
    // This is a simplified version. Implement fetching logic as per your API.
    const response = await fetch("/api/backend/gen-decisions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: currentStory }),
    });
    const data = await response.json();
    setCurrentDecisions(data.decisions.returnedDecisions);
  };

  const addNewStoryElement = async (currentStory: Array<string>) => {
    let newStoryElement = "";
    try {
      const response = await fetch("/api/backend/gen-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ story: currentStory }),
      });
      const data = await response.json();
      newStoryElement = data.returnedStory;
      console.log("NEW STORY ELEMENT", newStoryElement);
      addStoryElement(newStoryElement);
    } catch (error) {
      console.error("Error, failed to fetch new story part", error);
    }
  }

  const handleDecisionSelect = async (decision: string) => {
    addStoryElement(decision);
    setWasDecisionMade(true);
    await addNewStoryElement([...story, decision]);

    setDecisions([...story, decision])
    setWasDecisionMade(false);
    
  };
  
  useEffect(() => {
    // Initial setup if needed, e.g., fetch the first set of decisions
    if (story.length == 1) { // Adjust based on when you want to fetch new decisions
      setDecisions(story);
    }
  }, []);

  // Initial fetch for decisions
  useEffect(() => {
    const shouldContinue = !shouldStopGenerating(story);
    if (shouldContinue) {
      setDecisions(story);
  }
    
  }, [story]);
  

  async function shouldStopGenerating(
    currentStory: Array<string>
  ): Promise<Boolean> {
    return currentStory.length > 5;
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-12"
      style={backgroundGradient}
    >
      <div className="grow w-full rounded-xl backdrop-blur-xl justify-center items-center flex flex-col bg-white/80">
      {story.map((part, index) => (
        <div key={index}>
          <Stage text={part} image="" />
          {/* Render decisions after the last part of the story */}
          {index === story.length - 1 && currentDecisions && (
            <Decisions
              decisions={currentDecisions}
              onSelect={handleDecisionSelect}
              disabled={wasDecisionMade}
            />
          )}
        </div>
      ))}
    </div>
    </main>
  );
}


