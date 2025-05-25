# utils.py

import json

def prompt_user(message: str) -> str:
    return input(f"🛠️  {message}: ")

def write_file(path, data):
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
