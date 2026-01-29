from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World from Python Engine"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
