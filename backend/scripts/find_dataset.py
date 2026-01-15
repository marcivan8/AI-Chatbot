import requests

def search_datasets(query):
    url = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets"
    params = {
        "q": query,
        "limit": 20
    }
    response = requests.get(url, params=params)
    data = response.json()
    
    print(f"Found {data.get('total_count', 0)} datasets for query '{query}':")
    for dataset in data.get("results", []):
         print(f"ID: {dataset['dataset_id']}")
         print(f"Title: {dataset['metas']['default']['title']}")
         print(f"Records: {dataset['metas'].get('records_count', 'N/A')}")
         print("-" * 20)

if __name__ == "__main__":
    search_datasets("étudiants inscrits")
    print("="*40)
    search_datasets("établissement enseignement supérieur")
