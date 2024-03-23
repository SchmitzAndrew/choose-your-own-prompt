from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from dotenv import load_dotenv
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

def generate_story_prompt(content_data):
    content = content_data['content']
    # ^ this should be a list of strings. The last string should be a decision that we are writing the story for.

    return {'system': SYSTEM_STORY_WRITER, 'content': content}


## Decision Writer ##
SYSTEM_DECISION_WRITER = """
You are a choose your own adventure writer. 
Given a scenario, you will need to create 3 decisions for the reader to choose from.

Provide ONLY WELL FORMATTED JSON with no additional context in your response.

Example response:
{decisions: ["Go left", "Go right", "Go straight"]}
""".strip()

def generate_decisions(content_data):
    content = content_data['content']

    m = [ChatMessage(role="system", content=SYSTEM_DECISION_WRITER)] + [ChatMessage(role="user", content=content[-1])]
    chat_response = client.chat(model=model, messages=m)

    decisions = json.loads(chat_response.choices[0].message.content)["decisions"]

    return {"decisions": decisions}
