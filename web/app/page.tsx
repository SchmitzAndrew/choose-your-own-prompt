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

  const addStoryElement = (newElement: string) => {
    setStory((currentStory) => [...currentStory, newElement]);
  };

  const [intialDecisions, setIntialDecisions] = useState(null);
  const [initialDecisionMade, setInitialDecisionMade] = useState(false);
  const [continueGeneratingStory, setContinueGeneratingStory] = useState(false);
  const [currentDecisions, setCurrentDecisions] = useState(null);

  useEffect(() => {
    fetch("/api/backend/gen-decisions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: story }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setIntialDecisions(data.decisions))
      .catch((error) =>
        console.error("Error, failed to generate decisions", error)
      );
  }, []);

  const handleDecisionSelect = (decision: string) => {
    setStory((currentStory) => [...story, decision]);

    fetch("/api/backend/gen-decisions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: [...story, decision] }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setCurrentDecisions(data.decisions)) // Here's the change
      .catch((error) =>
        console.error("Error, failed to generate decisions", error)
      );

    setInitialDecisionMade(true);
    setContinueGeneratingStory(true);
  };

  useEffect(() => {
    if (!initialDecisionMade || !continueGeneratingStory) {
      return;
    }
    const generateStoryElement = async () => {
      const newElement = await fetchNewStoryElement(story);
      console.log("NEW ELEMENT", newElement);
      if (newElement) {
        addStoryElement(newElement);
      }
      console.log("STORY", story);
      if (await shouldStopGenerating(story)) {
        setContinueGeneratingStory(false);
      }
    };
    generateStoryElement();
  }, [initialDecisionMade, continueGeneratingStory]);

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
        {currentDecisions && (
          <Decisions
            decisions={currentDecisions}
            onSelect={handleDecisionSelect}
            disabled={!initialDecisionMade}
          />
        )}
        {story.slice(2).map((part, index) => (
          <Stage key={index} text={part} image="" />
        ))}
      </div>
    </main>
  );
}
