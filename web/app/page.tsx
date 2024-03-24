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

  const [intialDecisions, setIntialDecisions] = useState(null);
  const [initialDecisionMade, setInitialDecisionMade] = useState(false);

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
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-12"
      style={backgroundGradient}
    >
      <div className="grow w-full rounded-xl backdrop-blur-xl justify-center items-center flex flex-col bg-white/80">
        <Stage text={stage} image="" />
        {intialDecisions && (
          <Decisions
            decisions={intialDecisions}
            onSelect={handleDecisionSelect}
            disabled = {initialDecisionMade}         />
        )}
      </div>
    </main>
  );
}
