from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from dotenv import load_dotenv
from random import random
import json
import os

load_dotenv()
api_key = os.getenv("MISTRAL_API_KEY")
model = "mistral-large-latest"
client = MistralClient(api_key=api_key)


## Story Writer ## 
SYSTEM_STORY_WRITER = """
You are a choose your own adventure story writer. 
Given the reader's past storyline and decisions, you will need to continue the story from where it left off. 

DO NOT provide the reader with USER DECISIONS. Your ONLY job is to write the story, NOT the decisions.
""".strip()

SYSTEM__LOSS_STORY_WRITER = """
You are a choose your own adventure story writer. 
Given the reader's past storyline and decisions, you will need to write an ending for the story from where it left off. 

In the ending the reader should LOSE as a result of their choice or by some other being or force.

DO NOT provide the reader with USER DECISIONS. Your ONLY job is to write the story, NOT the decisions. 

Append the text "THE END" at the end of the story.
""".strip()

SYSTEM__WIN_STORY_WRITER = """
You are a choose your own adventure story writer. 
Given the reader's past storyline and decisions, you will need to write an ending for the story from where it left off. 

In the ending the reader should WIN as a result of their choice or by some other being or force.

DO NOT provide the reader with USER DECISIONS. Your ONLY job is to write the story, NOT the decisions. 

Append the text "THE END" at the end of the story.
""".strip()

def generate_story_prompt(content_dict):
    content = content_dict['content']
    # ^ this should be a list of strings. The last string should be a decision that we are writing the story for.

    # End condition
    prob_threshold = len(content)/100

    if prob_threshold > random():
        if random() > 0.6: # win
            return {'system': SYSTEM__WIN_STORY_WRITER, 'content': content}
        else: # loss 
            return {'system': SYSTEM__LOSS_STORY_WRITER, 'content': content}

    return {'system': SYSTEM_STORY_WRITER, 'content': content}


## Decision Writer ##
SYSTEM_DECISION_WRITER = """
You are a choose your own adventure writer. 
Given a scenario, you will need to create 3 decisions for the reader to choose from.

Provide ONLY WELL FORMATTED JSON with no additional context in your response.

Example response:
{decisions: ["Go left", "Go right", "Go straight"]}
""".strip()

def generate_decisions(content_dict):
    content = content_dict['content']

    m = [ChatMessage(role="system", content=SYSTEM_DECISION_WRITER)] + [ChatMessage(role="user", content=content[-1])]
    chat_response = client.chat(model=model, messages=m)

    decisions = json.loads(chat_response.choices[0].message.content)["decisions"]

    return {"decisions": decisions}
