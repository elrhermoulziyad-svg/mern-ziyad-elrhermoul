// Centralisation de l'URL du backend (Respecte la consigne de l'examen)
// Remplace 'http://localhost:3000/api' par l'URL de ton backend Vercel
const API_URL = 'https://ton-backend-xxxxx.vercel.app/api';

const itemForm = document.getElementById('itemForm');
const itemNameInput = document.getElementById('itemName');
const itemList = document.getElementById('itemList');
const messageDiv = document.getElementById('message');

// Fonction utilitaire pour afficher les messages de succès ou d'erreur
function showMessage(text, isError = false) {
    messageDiv.textContent = text;
    messageDiv.style.color = isError ? '#e74c3c' : '#2ecc71';
}

// 1. Fonction pour récupérer et afficher les éléments (GET /api/items)
async function fetchItems() {
    try {
        const response = await fetch(`${API_URL}/items`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des éléments.');
        
        const items = await response.json();
        itemList.innerHTML = '';
        
        if (items.length === 0) {
            itemList.innerHTML = '<li>Aucun élément trouvé en base de données.</li>';
            return;
        }

        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            itemList.appendChild(li);
        });
    } catch (error) {
        showMessage(error.message, true);
    }
}

// 2. Gestion de l'ajout d'un élément via le formulaire (POST /api/items)
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = itemNameInput.value.trim();

    if (!name) return;

    try {
        const response = await fetch(`${API_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de la création.');
        }

        showMessage('Élément ajouté avec succès !');
        itemNameInput.value = '';
        fetchItems(); // Actualiser la liste automatiquement
    } catch (error) {
        showMessage(error.message, true);
    }
});

// Charger la liste au démarrage de la page
fetchItems();