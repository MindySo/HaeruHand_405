import json, re
from typing import Any, Dict

def extract_json_block(text: str) -> Dict[str, Any]:
    if not text:
        return {}
    m = re.search(r"\{.*\}", text, flags=re.S)
    if not m:
        return {}
    try:
        return json.loads(m.group(0))
    except json.JSONDecodeError:
        return {}
