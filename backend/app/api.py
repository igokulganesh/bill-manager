from json import load
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controls import getSpreadsheet, getWorksheet 

app = FastAPI()

origins = [
  "http://localhost:3000",
  "localhost:3000"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

sheet = getSpreadsheet("Bill Manager")

@app.get("/", tags=["root"])
async def read_root() -> dict:
  return None 

@app.get("/product", tags=["products"])
async def getProducts() -> dict:
  worksheet = getWorksheet(sheet, "Products")
  label = worksheet.row_values(1)
  return { "data": label }