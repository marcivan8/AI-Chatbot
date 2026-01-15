import requests
import json

STATS_URL = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-statistiques-sur-les-effectifs-d-etudiants-inscrits-par-etablissement/exports/json?lang=fr&timezone=Europe%2FParis"

try:
    print(f"Fetching stats from {STATS_URL}...")
    response = requests.get(STATS_URL)
    data = response.json()
    print(f"Total Rows: {len(data)}")
    
    unique_names = set()
    for r in data:
        name = r.get("etablissement_actuel_lib")
        if name:
            unique_names.add(name)
            
    print(f"Unique Names count: {len(unique_names)}")
    print("Sample Names:", list(unique_names)[:10])

except Exception as e:
    print(e)
