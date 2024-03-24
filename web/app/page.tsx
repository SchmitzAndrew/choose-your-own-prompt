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


  const fetchDecisions = (currentStory: Array<string>) => {
    console.log("FETCHING DECISIONS", currentStory);
    fetch("/api/backend/gen-decisions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: currentStory }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentDecisions(data.decisions);
        setWasDecisionMade(false);
      })
      .catch((error) =>
        console.error("Error, failed to generate decisions", error)
      );
    };
  
  // Initial fetch for decisions
  useEffect(() => {
    fetchDecisions(story);
  }, [story]);
  

  const handleDecisionSelect = (decision: string) => {
    if (wasDecisionMade)  return;

    const updatedStory = [...story, decision];
    setStory(updatedStory);

    setWasDecisionMade(true);
    setContinueGeneratingStory(true);
  };

  useEffect(() => {
    if (!!continueGeneratingStory) {
      return;
    }
    const generateStoryElement = async () => {
      const newElement = await fetchNewStoryElement(story);
      console.log("NEW ELEMENT", newElement);
      if (newElement) {
        addStoryElement(newElement);
        // Fetch new decisions after adding the new story element
        fetchDecisions([...story, newElement]);
      }
      console.log("STORY", story);
      if (await shouldStopGenerating(story)) {
        setContinueGeneratingStory(false);
      }
    };
    generateStoryElement();
  }, [ continueGeneratingStory, story]);

  async function fetchNewStoryElement(
    currentStory: Array<string>
  ): Promise<string> {
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
    } catch (error) {
      console.error("Error, failed to fetch new story part", error);
    }
    return newStoryElement;
  }
  async function shouldStopGenerating(
    currentStory: Array<string>
  ): Promise<Boolean> {
    return currentStory.length > 8;
  }
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-12"
      style={backgroundGradient}
    >
      <div className="grow w-full rounded-xl backdrop-blur-xl justify-center items-center flex flex-col bg-white/80">
        <Stage text={stage} image="" />
        `{currentDecisions && (
          <Decisions
            decisions={currentDecisions}
            onSelect={handleDecisionSelect}
            disabled={wasDecisionMade}
          />
        )}`
        {story.slice(2).map((part, index) => (
          <Stage key={index} text={part} image="" />
          
        ))}
      </div>
    </main>
  );
}


