From Devpost: https://devpost.com/software/choose-your-own-prompt

## Inspiration
We were inspired to create this project after reading Choose Your Own Adventure books as a kid.

## What it does
Our web app allows people to continuously interact with the pirate story we created by procedurally generating decision points and the story along with it.

## How we built it
We created a Python backend to serve the LLM backend and work with the application logic. This includes the ability for the story to come to an end.

## Challenges we ran into
We had a very hard time implementing streaming and getting the application flow to work properly. Managing the state of the story within react and being able to procedurally generate it was hard.

## Accomplishments that we're proud of
We're very happy that we were able to finish our MVP and create a replayable story.

## What we learned
We learned a lot about how to get the best results from LLMs and working with them within react.

## What's next for Choose Your Own Prompt
One of the things we were looking forward to implementing was generating images with a fast SDXL model to go along with the story.

## Built With
- Next.js
- FastAPI Python Backend
- MistralAI
