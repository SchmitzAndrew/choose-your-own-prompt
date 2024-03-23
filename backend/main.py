from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from utilities import *

app = FastAPI()

class Content(BaseModel):
    content: List[str]

@app.post("/gen-story-prompt")
async def gen_story_prompt_endpoint(content: Content):
    try:
        return generate_story_prompt(content.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/gen-decisions")
async def gen_decisions_endpoint(content: Content):
    try:
        return generate_decisions(content.dict())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)