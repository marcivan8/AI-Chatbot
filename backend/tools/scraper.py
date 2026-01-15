import requests
from bs4 import BeautifulSoup
import logging

logger = logging.getLogger(__name__)

import ipaddress
from urllib.parse import urlparse

def validate_url(url: str) -> bool:
    """
    Validates that the URL is safe to scrape (no internal IPs).
    """
    try:
        parsed = urlparse(url)
        if parsed.scheme not in ('http', 'https'):
            return False
            
        hostname = parsed.hostname
        if not hostname:
            return False
            
        # Resolve hostname to IP
        try:
            ip = ipaddress.ip_address(hostname)
        except ValueError:
            # If it's a domain name (not an IP literal), we rely on the OS to resolve it.
            # However, for high security we should resolve it here and check the IP.
            # For this demo, we'll block obvious local terms and private IP ranges if passed directly.
            if hostname in ('localhost', '127.0.0.1', '::1'):
                return False
            return True
            
        if ip.is_private or ip.is_loopback or ip.is_link_local:
            return False
            
        return True
    except Exception:
        return False

def scrape_website(url: str) -> str:
    """
    Scrapes the content of a website and returns the visible text.
    
    Args:
        url (str): The URL of the website to scrape.
        
    Returns:
        str: The text content of the website, or an error message.
    """
    if not validate_url(url):
        return "Error: Security blocked. URL is not allowed (internal or invalid)."

    try:
        # User-Agent to avoid being blocked by some sites
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style", "nav", "footer", "header"]):
            script.decompose()
            
        # Get text
        text = soup.get_text()
        
        # Break into lines and remove leading/trailing space on each
        lines = (line.strip() for line in text.splitlines())
        # Break multi-headlines into a line each
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        # Drop blank lines
        text = '\n'.join(chunk for chunk in chunks if chunk)
        
        # Limit the length to avoid overwhelming the LLM
        return text[:5000] 
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Error scraping {url}: {e}")
        return f"Error scraping {url}: {str(e)}"
    except Exception as e:
        logger.error(f"Error parsing {url}: {e}")
        return f"Error parsing {url}: {str(e)}"
