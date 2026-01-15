import requests
import json

# Candidate ID
DATASET_ID = "fr-esr-statistiques-sur-les-effectifs-d-etudiants-inscrits-par-etablissement"
API_URL = f"https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/{DATASET_ID}/records?limit=1"

try:
    print(f"Probing {DATASET_ID}...")
    response = requests.get(API_URL)
    response.raise_for_status()
    data = response.json()
    
    print(f"Total count: {data.get('total_count', 'Unknown')}")
    results = data.get('results', [])
    if results:
        print("Keys:", results[0].keys())
        print("Sample:", json.dumps(results[0], indent=2, ensure_ascii=False))

except Exception as e:
    print(f"Error: {e}")
