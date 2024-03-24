'use client';
import { useCallback, useEffect, useState } from "react";
import Stage from "@/components/Stage";
import Decisions from "@/components/Decisions";
import { stage } from "@/lib/stage";
import { useCompletion } from 'ai/react';

export default function Completion() {
    const { complete } = useCompletion({
        api: '/api/completion',
    });

    const [story, setStory] = useState(stage);
    const addStoryElement = (newElement: string) => {
        setStory((currentStory) => currentStory + newElement);
    };

    const [intialDecisions, setIntialDecisions] = useState(null);
    const [initialDecisionMade, setInitialDecisionMade] = useState(false);
    const [continueGeneratingStory, setContinueGeneratingStory] = useState(false);

    // Generate the initial decisions
    useEffect(() => {
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

    const handleDecisionSelect = (decision: string) => {
        console.log("Selected decision: ", decision);
        setStory((currentStory) => currentStory + decision);
        console.log("Story after decision: ", story);
        setInitialDecisionMade(true);

        
    };

    const continueStory = useCallback(
        async (c: string) => {
            try {
                const completion = await complete(c);
                console.log("Completion: ", completion);
                if (!completion) throw new Error('Failed to generate the next part of the story.');
                // Append the new story part to the existing story
                if(completion.length) {
                    addStoryElement(completion);
                }
                return;
            } catch (error) {
                console.error("Error: ", error);
            }
        },
    [complete]
    );
    return (
        <div className="mx-auto w-full max-w-5xl py-12 flex flex-col stretch">
            <h4 className="text-xl font-bold text-gray-900 md:text-xl pb-4">
                Story
            </h4>
            
            {/* {intialDecisions && (
                <Decisions
                    decisions={intialDecisions}
                    onSelect={handleDecisionSelect}
                    disabled={initialDecisionMade}
                />
            )} */}
            

            <textarea value={story} onChange={e => setStory(e.target.value)} readOnly className="w-full h-96">

            </textarea>
            <button onClick={() => continueStory(story)}>Continue The Story</button>
            
            <p>{complete}</p>
        </div>
    );
}