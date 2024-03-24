"use client";

import { useCompletion } from 'ai/react';
import { useCallback, useEffect, useState } from "react";
import Stage from "@/components/Stage";
import Decisions from "@/components/Decisions";
import { stage } from "@/lib/stage";
import Completion from './examples/completion/page';

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

  const { complete } = useCompletion({
    api: '/api/completion',
  });
  // Generate the initial decisions
  useEffect(() => {
    console.log("Story in useEffect ", story);

    fetch("/api/backend/gen-decisions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: story }),
    })
      .then((response) => {
        console.log("Response received: ", response);
        return response.json();
      })
      .then((data) => setIntialDecisions(data.decisions))
      .catch((error) =>
        console.error("Error, failed to generate decisions", error)
      );
  }, []);

  console.log("Intial Decisions: ", intialDecisions);

  const handleDecisionSelect = (decision: string) => {
    console.log("Selected decision: ", decision);
    setStory((currentStory) => [...story, decision]);
    console.log("Story after decision: ", story);
    setInitialDecisionMade(true);

    // Start the while loop for generating the story
    setContinueGeneratingStory(true);
  };

  useEffect(() => {
    if (!initialDecisionMade || !continueGeneratingStory) {
      return;
    }

    const generateStoryElement = async () => {
      const newElement = await fetchNewStoryElement(story);

      if (newElement) {
        setStory((currentStory) => [...currentStory, newElement]);
      }

      if (await shouldStopGenerating(story)) {
        setContinueGeneratingStory(false);
      }
    };
    generateStoryElement();
  }, [story, initialDecisionMade, continueGeneratingStory]);

  async function fetchNewStoryElement(
    currentStory: Array<string>
  ): Promise<string> {
    let newStoryElement = "";
    let systemPrompt = "";

    try {
      const response = await fetch("/api/backend/gen-story-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ story: currentStory }),
      });
      console.log("Response received: ", response);
      const data = await response.json();
      console.log("DATA: ", data);
      systemPrompt = data.systemPrompt;
    } catch (error) {
      console.error("Error, failed to fetch system prompt", error);
    }
    console.log("RETURNED SYSTEM PROMPT: ", systemPrompt);

    const checkAndPublish = useCallback(
      async (c: string) => {
        const completion = await complete(c);
        if (!completion) throw new Error('Failed to check typos');
        const typos = JSON.parse(completion);
        // you should add more validation here to make sure the response is valid
        if (typos?.length && !window.confirm('Typos found… continue?')) return;
        else alert('Post published');
      },
      [complete],
    );
    checkAndPublish(systemPrompt);
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
        <output>{}</output>
        <Stage text={stage} image="" />
        {intialDecisions && (
          <Decisions
            decisions={intialDecisions}
            onSelect={handleDecisionSelect}
            disabled={initialDecisionMade}
          />
        )}
      </div>
    </main>
  );
}
