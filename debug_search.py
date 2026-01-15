import sys
import os

# Set up path to import from backend
sys.path.append(os.path.abspath("backend"))

from tools.institutions import institution_service

print("Loading data...")
print(f"Loaded {len(institution_service.institutions)} institutions.")

query = "agriculture"
print(f"\nSearching for '{query}' in backend...")
results = institution_service.search(query=query)
print(f"Found {len(results)} results via service:")
for r in results:
    print(f"- {r['name']} (Domain: {r.get('domain')})")

print("\n--- Manual Check ---")
# Manually check where 'agriculture' appears
count = 0
for school in institution_service.institutions:
    text = str(school).lower()
    if query.lower() in text:
        print(f"Found '{query}' in {school['name']}")
        print(f"  Fields: { [k for k,v in school.items() if query.lower() in str(v).lower()] }")
        count += 1
        if count >= 3: break
