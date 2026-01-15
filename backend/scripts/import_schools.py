import requests
import json
import os
import sys
import unicodedata

# URLs
MAIN_DATASET_URL = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-etablissements-enseignement-superieur/exports/json"
STATS_DATASET_URL = "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-statistiques-sur-les-effectifs-d-etudiants-inscrits-par-etablissement/exports/json?lang=fr&timezone=Europe%2FParis"

OUTPUT_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "institutions.json")

# ... (Imports remain)

# Manual Additions for schools missing from official datasets
MANUAL_SCHOOLS = [
    {
        "name": "Epitech Technology",
        "city": "Paris", # Headquarters
        "type": "École d'informatique",
        "url": "https://www.epitech.eu",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Epitech.png",
        "source": "manual",
        "raw_type": "École Privée",
        "secteur": "Privé",
        "description": "L'école de l'innovation et de l'expertise informatique. Une pédagogie par projets unique pour former les experts de demain.",
        "cost": "7000€ - 10000€ / an",
        "admissionProcess": "Candidature en ligne / Entretien / Tests (Piscine)",
        "level": ["Bac+3", "Bac+5"],
        "domain": ["Informatique", "Innovation", "Tech"],
        "programs": [
            "Programme Grande École (Bac+5)",
            "Bachelor Web & Management",
            "MSc Artificial Intelligence",
            "MSc Cybersecurity"
        ]
    },
    {
        "name": "42",
        "city": "Paris",
        "type": "École d'informatique",
        "url": "https://42.fr",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/8/8d/42_Logo.svg",
        "source": "manual",
        "raw_type": "Association",
        "secteur": "Privé",
        "description": "Une formation en informatique gratuite, ouverte à toutes et à tous, sans condition de diplôme, sans limite d'âge.",
        "cost": "Gratuit",
        "admissionProcess": "Jeux en ligne / Piscine",
        "level": ["Pas de diplôme requis"],
        "domain": ["Informatique", "Programmation"],
        "programs": [
            "Cursus 42 (Architecte du numérique)",
            "Spécialisations (IA, Cyber, Web, etc.)"
        ]
    }
]

# ... (normalize_text, fetch_json remain)


def fix_url(url):
    """Ensures URL starts with http/https."""
    if not url:
        return ""
    if not url.startswith("http"):
        return "https://" + url
    return url

def map_main_record(record):
    """Maps a record from the 'Principaux' dataset."""
    name = record.get("uo_lib", "Inconnu")
    city = record.get("commune")
    if not city:
        city = record.get("localite_acheminement_uai")
        if city and "CEDEX" in city:
             city = city.split("CEDEX")[0].strip()
    if not city:
        city = "France"
    
    establishment_type = record.get("type_d_etablissement", "Enseignement Supérieur")
    if isinstance(establishment_type, list):
        establishment_type = ", ".join(establishment_type)
    elif establishment_type is None:
        establishment_type = "Enseignement Supérieur"
    
    sigle = record.get("sigle")
    if sigle:
        # Avoid duplication like "INSA - INSA"
        if sigle.lower() not in name.lower():
             name = f"{sigle} - {name}"

    url = fix_url(record.get("url", ""))
    logo = record.get("url_logo")
    secteur = record.get("secteur_d_etablissement", "Inconnu")
    
    # Enhanced Logo Logic
    if not logo:
         logo = f"https://ui-avatars.com/api/?name={name.replace(' ', '+')}&background=random"

    return {
        "name": name,
        "city": city,
        "type": establishment_type,
        "url": url,
        "logo": logo,
        "source": "main",
        "raw_type": establishment_type, # for tagging
        "secteur": secteur
    }

def map_stats_record(record):
    """Maps a record from the 'Stats' dataset."""
    name = record.get("etablissement_actuel_lib")
    city = record.get("etablissement_commune", "France")
    
    if not name:
        return None

    establishment_type = "Enseignement Supérieur" 
    secteur = record.get("secteur_etablissement", "Inconnu") # Often 'secteur_etablissement' in stats? Or deduce.
    
    return {
        "name": name,
        "city": city,
        "type": establishment_type,
        "url": "",
        "logo": f"https://ui-avatars.com/api/?name={name.replace(' ', '+')}&background=random",
        "source": "stats",
        "raw_type": "Autre",
        "secteur": secteur
    }

def enrich_school_data(school, index):
    """Adds derived fields like domains, levels, tags."""
    name = school["name"]
    raw_type = school.get("raw_type", "")
    secteur = school.get("secteur", "")
    
    # Domains & Programs (Infer programs if missing)
    domains = school.get("domain", [])
    programs = school.get("programs", [])
    
    name_lower = name.lower()
    type_lower = raw_type.lower()

    if not domains:
        
        if "ingénieur" in type_lower or "ingénieur" in name_lower or "polytechnique" in name_lower or "mines" in name_lower or "tech" in name_lower:
            domains.extend(["Ingénierie", "Sciences"])
            programs.append("Diplôme d'Ingénieur")
            if "informatique" in name_lower or "numérique" in name_lower:
                domains.append("Informatique")
        if "universi" in type_lower or "universi" in name_lower:
            domains.extend(["Sciences", "Lettres", "Droit", "Médecine"])
            programs.extend(["Licence", "Master", "Doctorat"])
        if "commerce" in type_lower or "management" in name_lower or "business" in name_lower:
            domains.extend(["Commerce", "Management", "Finance"])
            programs.append("Programme Grande École")
        if "art" in type_lower or "design" in type_lower or "beaux-arts" in name_lower:
            domains.extend(["Art", "Design"])
            programs.append("DNMADE / Master")
        if "architect" in type_lower or "architect" in name_lower:
            domains.extend(["Architecture"])
            programs.append("Diplôme d'État d'Architecte")
        if not domains:
            domains.append("Généraliste")
            programs.append("Formation Supérieure")
    
    # Clean duplicates
    domains = list(set(domains))
    programs = list(set(programs))

    # Tags & Cost Logic
    tags = ["Enseignement Supérieur"]
    cost = school.get("cost", "Variable")
    
    is_public = "public" in secteur.lower() or "public" in type_lower
    is_private = "privé" in secteur.lower() or "privé" in type_lower
    
    if "Epitech" in name:
        print(f"DEBUG: Enriching Epitech. Raw Cost: {school.get('cost')}, Programs: {len(programs)}, is_private: {is_private}")

    if is_public:
        tags.append("Public")
        if cost == "Variable": cost = "Gratuit (CVEC)"
    elif is_private:
        tags.append("Privé")
        if cost == "Variable": cost = "Payant (Voir site)"
    
    tags.extend(domains)

    return {
        "id": str(index + 1),
        "name": name,
        "logo": school["logo"],
        "city": school["city"],
        "type": school["type"],
        "domain": domains,
        "programs": programs, # New Field
        "level": school.get("level", ["Bac+3", "Bac+5"]),
        "alternance": True,
        "tags": list(set(tags)),
        "recognition": ["Diplôme d'état"],
        "admissionProcess": school.get("admissionProcess", "Parcoursup / Dossier"),
        "cost": cost,
        "description": school.get("description", f"Établissement d'enseignement supérieur situé à {school['city']}." + (f" Site web: {school['url']}" if school['url'] else "")),
        "url": school["url"] # Ensure URL is passed through
    }

# ... (normalize_text, fetch_json remain)

def normalize_text(text):
    """Normalize text for comparison (remove accents, lowercase)."""
    if not text:
        return ""
    text = text.lower().strip()
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode("utf-8")
    return text

def fetch_json(url, label="data"):
    print(f"Fetching {label} from {url}...")
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        print(f"Successfully fetched {len(data)} records for {label}.")
        return data
    except Exception as e:
        print(f"Error fetching {label}: {e}")
        # If stats fail, we might still want to proceed with just main, but for now let's fail hard to warn user
        if label == "Main Dataset":
            sys.exit(1)
        return []



def main():
    # 1. Fetch Data
    main_data = fetch_json(MAIN_DATASET_URL, "Main Dataset")
    stats_data = fetch_json(STATS_DATASET_URL, "Stats Dataset")
    
    # 2. Process Main Data (The Authority)
    schools_map = {} # Key: "normalized_name|normalized_city" -> School Record
    
    count_main = 0
    for record in main_data:
        school = map_main_record(record)
        key = f"{normalize_text(school['name'])}|{normalize_text(school['city'])}"
        schools_map[key] = school
        count_main += 1
        
    print(f"Processed {count_main} records from Main dataset.")
    
    # 3. Process Stats Data (The Supplement)
    count_added = 0
    for record in stats_data:
        school = map_stats_record(record)
        if not school:
            continue
            
        key = f"{normalize_text(school['name'])}|{normalize_text(school['city'])}"
        
        # Only add if not already present
        if key not in schools_map:
            schools_map[key] = school
            count_added += 1
            
    print(f"Added {count_added} unique records from Stats dataset.")
    
    # 3.5 Manual Additions
    count_manual = 0
    for m_school in MANUAL_SCHOOLS:
        key = f"{normalize_text(m_school['name'])}|{normalize_text(m_school['city'])}"
        schools_map[key] = m_school
        count_manual += 1
            
    print(f"Added {count_manual} manual records.")
    
    # DEBUG EPITECH
    for k, v in schools_map.items():
        if "Epitech" in v["name"]:
            print(f"DEBUG MAIN: Found Epitech in keys. Cost: {v.get('cost')}, Programs: {len(v.get('programs', []))}")
    
    # 4. Final Formatting
    final_list = []
    sorted_schools = sorted(schools_map.values(), key=lambda x: x["name"])
    
    for i, school in enumerate(sorted_schools):
        final_list.append(enrich_school_data(school, i))
        
    print(f"Total Unique Schools: {len(final_list)}")
    
    # 5. Save
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(final_list, f, ensure_ascii=False, indent=4)
    print(f"Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
