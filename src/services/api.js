const API_BASE_URL = "http://localhost:8000/api/v1";

export const apiService = {
    /**
     * Fetch schools with optional filters
     * @param {Object} filters - { query, city, type, level, alternance }
     */
    getSchools: async (filters = {}) => {
        try {
            // Build query string
            const params = new URLSearchParams();
            if (filters.query) params.append("q", filters.query);

            // Helper to append array or single value
            const appendFilter = (key, value) => {
                if (Array.isArray(value)) {
                    value.forEach(v => params.append(key, v));
                } else if (value !== undefined && value !== null) {
                    params.append(key, value);
                }
            };

            if (filters.city) appendFilter("city", filters.city);
            if (filters.type) appendFilter("type", filters.type);
            if (filters.level) appendFilter("level", filters.level);
            if (filters.domain) appendFilter("domain", filters.domain);
            if (filters.alternance !== undefined && filters.alternance !== null) params.append("alternance", filters.alternance);

            const response = await fetch(`${API_BASE_URL}/schools?${params.toString()}`);
            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error fetching schools:", error);
            return [];
        }
    },

    getFacets: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/facets`);
            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error fetching facets:", error);
            // Fallback to default data if API fails (e.g. endpoint not ready)
            return {
                cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux", "Nantes"],
                types: ["École d'ingénieur", "École de commerce", "Université", "Grande École"],
                levels: ["Bac", "Bac+2", "Bac+3", "Bac+5", "Master", "Licence"],
                domains: ["Informatique", "Commercial", "Ingénierie", "Design", "Marketing"]
            };
        }
    },

    getCareers: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/careers`);
            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error fetching careers:", error);
            return [];
        }
    },

    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/stats`);
            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error fetching stats:", error);
            return null;
        }
    },

    /**
     * Send a message to the chatbot
     * @param {string} message 
     * @param {Array} history - Optional conversation history
     */
    sendChatMessage: async (message, history = []) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message, history }),
            });

            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            console.error("Error sending chat message:", error);
            return { response: "Désolé, je ne peux pas me connecter au serveur pour le moment." };
        }
    }
};
