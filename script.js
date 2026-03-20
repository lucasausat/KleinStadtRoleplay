// Die Adresse deines Bots (Lokal zum testen: localhost, später deine Server-IP)
const API_URL = "http://localhost:5000/verify-code"; 

const overlay = document.getElementById('maintenance-overlay');

// Prüfen ob wir schon eingeloggt sind (Session bleibt im Browser)
if (localStorage.getItem('dev_access') === 'true') {
    overlay.style.display = 'none';
}

window.addEventListener('keydown', async (e) => {
    if (e.key.toLowerCase() === 'l') {
        const inputCode = prompt("Gib deinen Discord Login-Code ein:");
        
        if (!inputCode) return;

        try {
            // Anfrage an den Bot senden
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: inputCode.toUpperCase() })
            });

            const result = await response.json();

            if (result.success) {
                localStorage.setItem('dev_access', 'true');
                overlay.style.display = 'none';
                alert("✅ Code korrekt! Entwickler-Modus aktiviert.");
            } else {
                alert("❌ Ungültiger oder abgelaufener Code!");
            }
        } catch (error) {
            alert("❌ Verbindung zum Bot fehlgeschlagen! Ist der Bot online?");
        }
    }
});
