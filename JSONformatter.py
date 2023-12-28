import json

# Input and output file paths
input_json_file = 'contentful.json'
output_jsonl_file = 'contentful.jsonl'

# Read JSON file and write JSONL file
with open(input_json_file, 'r') as json_file, open(output_jsonl_file, 'w') as jsonl_file:
    data = json.load(json_file)
    for item in data:
        jsonl_file.write(json.dumps(item) + '\n')
