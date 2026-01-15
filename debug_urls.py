
import json

with open('./backend/data/institutions.json', 'r') as f:
    data = json.load(f)

count = 0
non_empty_urls = 0
malformed_urls = 0

print(f"Total schools: {len(data)}")

for school in data:
    url = school.get('url')
    if url:
        non_empty_urls += 1
        print(f"[{school['id']}] {school['name']}: '{url}'")
        if not url.startswith('http'):
             malformed_urls += 1
             print(f"  ^^^ MALFORMED!")

print(f"\nStats:\nNon-empty URLs: {non_empty_urls}\nMalformed URLs: {malformed_urls}")
