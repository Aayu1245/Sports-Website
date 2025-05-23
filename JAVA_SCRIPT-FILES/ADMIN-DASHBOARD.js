let editingIndex = -1;
let countteam1 = 1;
let countteam2 = 1;

// --- DASHBOARD FUNCTIONALITY ---
const matchForm = document.getElementById("match-form");
const logoutButton = document.getElementById("logout");



/* --- Create a New Player Field Function --- */
function createPlayerField1() {
  const div = document.createElement("div");
  div.className = "player-field";
  const sport = document.getElementById("sport").value;
  let html = `<input type="text" class="player-name" placeholder="Player Name" required id=Player-${count1} />`;

  //add them on top of the below if statement
  if (sport === "Cricket") {
    html += `
                 <select class="player-role" id= "Role${count1}" required>
                    <option value="">Select Role</option>
                    <option value="Right Hand Batsman">Right Hand Batsman</option>
                    <option value="Left Hand Batsman">Left Hand Batsman</option>
                    <option value="Wicketkeeper">Wicketkeeper</option>
                    <option value="Bowler">Bowler</option>
                 </select>`;
  } else if (sport === "Football") {
    html += `<select class="player-role" id= "Role${count1}" required>
                    <option value="">Select Role</option>
                    <option value="Striker">Striker</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                 </select>`;

  } else if (sport === "Kabbadi") {
    html += `<select class="player-role" id= "Role${count1}" required>
                    <option value="">Select Role</option>
                    <option value="Raider">Raider</option>
                    <option value="Defender">Defender</option>
                 </select>`;
  } else {
    // Fallback if other sports are added later.
    html += `<input type="text" class="player-role" placeholder="Player Role" required />`;
  }
  html += `<button type="button" class="remove-player" id= "Remove${count1}">Remove</button>`;
  div.innerHTML = html;
  return div;
}

function createPlayerField2() {
  const div = document.createElement("div");
  div.className = "player-field";
  sport = document.getElementById("sport").value;
  let html = `<input type="text" class="player-name" placeholder="Player Name" required id=Player-${count2} />`;

  //add them on top of the below if statement
  if (sport === "Cricket") {
    html += `
                 <select class="player-role" id= "Role${count2}" required>
                    <option value="">Select Role</option>
                    <option value="Right Hand Batsman">Right Hand Batsman</option>
                    <option value="Left Hand Batsman">Left Hand Batsman</option>
                    <option value="Wicketkeeper">Wicketkeeper</option>
                    <option value="Bowler">Bowler</option>
                 </select>`;
  } else if (sport === "Football") {
    html += `<select class="player-role" id= "Role${count2}" required>
                    <option value="">Select Role</option>
                    <option value="Striker">Striker</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                 </select>`;

  } else if (sport === "Kabbadi") {
    html += `<select class="player-role" id= "Role${count2}" required>
                    <option value="">Select Role</option>
                    <option value="Raider">Raider</option>
                    <option value="Defender">Defender</option>
                 </select>`;
  } else {
    // Fallback if other sports are added later.
    html += `<input type="text" class="player-role" placeholder="Player Role" required />`;
  }
  html += `<button type="button" class="remove-player" id= "Remove${count2}">Remove</button>`;
  div.innerHTML = html;
  return div;
}

// Add dynamic player fields for Team 1 and Team 2
document
  .getElementById("add-team1-player")
  .addEventListener("click", function () {
    const team1Container = document.getElementById("team1-players");
    team1Container.appendChild(createPlayerField1());
    count1++;
  });

document
  .getElementById("add-team2-player")
  .addEventListener("click", function () {
    const team2Container = document.getElementById("team2-players");
    team2Container.appendChild(createPlayerField2());
    count2++;
  });

// Remove player field (using event delegation)
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("remove-player")) {
    e.target.parentElement.remove();
  }
});

// When sport selection changes, clear the existing dynamic player fields.
document.getElementById("sport").addEventListener("change", function () {
  document
    .getElementById("team1-players")
    .querySelectorAll(".player-field")
    .forEach((el) => el.remove());
    count1 = 1;
  document
    .getElementById("team2-players")
    .querySelectorAll(".player-field")
    .forEach((el) => el.remove());
    count2 = 1;
});

// Function to load and display matches from localStorage
function loadMatches() {
  const container = document.getElementById("matches-container");
  const matches = JSON.parse(localStorage.getItem("matches")) || [];
  container.innerHTML = "";
  matches.forEach((match, index) => {
    const div = document.createElement("div");
    div.className = "match-card";
    div.innerHTML = `
          <h3>${match.sport} Match</h3>
          <p><strong>Team 1:</strong> ${match.team1Name}</p>
          <p><strong>Team 2:</strong> ${match.team2Name}</p>
          <div class="players-info">
            <h4>Team 1 Players</h4>
            ${match.team1Players
              .map((p) => {
                if (match.sport === "Cricket") {
                  return `<p>${p.name} | Role: ${p.role}</p>`; // Balls: ${p.balls} | Score: ${p.total} | neded inside it
                } else if (match.sport === "Football") {
                  return `<p>${p.name} | Role: ${p.role}</p>`;
                } else if (match.sport === "Kabbadi") {
                  return `<p>${p.name} | Role: ${p.role}</p>`;
                } else {
                  return `<p>${p.name} | Role: ${p.role}</p>`;
                }
              })
              .join("")}
            <h4>Team 2 Players</h4>
            ${match.team2Players
              .map((p) => {
                if (match.sport === "Cricket") {
                  return `<p>${p.name} | Role: ${p.role}</p>`; // Balls: ${p.balls} | Score: ${p.total} | neded inside it
                } else if (match.sport === "Football") {
                  return `<p>${p.name} | Role: ${p.role}</p>`;
                } else if (match.sport === "Kabbadi") {
                  return `<p>${p.name} | Role: ${p.role}</p>`;
                } else {
                  return `<p>${p.name} | Role: ${p.role}</p>`;
                }
              })
              .join("")}
          </div>
          <button data-index="${index}" class="edit-match">Edit</button>
          <button data-index="${index}" class="delete-match">Delete</button>
        `;
    container.appendChild(div);
  });
}

// Load matches on page load
loadMatches();

// Handle new match form submission (and updating if editing)
matchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const sport = document.getElementById("sport").value;
  const team1Name = document.getElementById("team1-name").value;
  const team2Name = document.getElementById("team2-name").value;

  // Gather Team 1 player information
  const team1Players = Array.from(
    document.querySelectorAll("#team1-players .player-field")
  ).map((field) => {
    const player = { name: field.querySelector(".player-name").value };

    player.role = field.querySelector(".player-role").value;
    return player;
  });

  // Gather Team 2 player information
  const team2Players = Array.from(
    document.querySelectorAll("#team2-players .player-field")
  ).map((field) => {
    const player = { name: field.querySelector(".player-name").value };

    player.role = field.querySelector(".player-role").value;
    return player;
  });

  async function senddata(sports,Teamname,Players){
    const dat = await fetch('http://localhost:8000/ADMIN-DASHBOARD.js', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sport: sports,
        teamname: Teamname,
        players: Players,
      })
    });
  }

  await senddata(sport,team1Name,team1Players);
  await senddata(sport,team2Name,team2Players);

  const newMatch = {
    sport,
    team1Name,
    team1Players,
    team2Name,
    team2Players,
  };

  let matches = JSON.parse(localStorage.getItem("matches")) || [];
  if (editingIndex === -1) {
    // New match addition
    matches.push(newMatch);
  } else {
    // Update the existing match
    matches[editingIndex] = newMatch;
    editingIndex = -1;
    // Reset the submit button label back to default
    matchForm.querySelector("button[type=submit]").textContent =
      "Add Match Data";
  }
  localStorage.setItem("matches", JSON.stringify(matches));

  // Reset the form and clear dynamically added players
  matchForm.reset();
  document
    .getElementById("team1-players")
    .querySelectorAll(".player-field")
    .forEach((field) => field.remove());
  document
    .getElementById("team2-players")
    .querySelectorAll(".player-field")
    .forEach((field) => field.remove());

  loadMatches();
});

// Event delegation for Edit and Delete buttons on match cards
document
  .getElementById("matches-container")
  .addEventListener("click", function (e) {
    const index = e.target.getAttribute("data-index");
    let matches = JSON.parse(localStorage.getItem("matches")) || [];
    // Delete functionality
    if (e.target.classList.contains("delete-match")) {
      matches.splice(index, 1);
      localStorage.setItem("matches", JSON.stringify(matches));
      loadMatches();
    }
    // Edit functionality
    else if (e.target.classList.contains("edit-match")) {
      const match = matches[index];
      editingIndex = index;
      document.getElementById("sport").value = match.sport;
      document.getElementById("team1-name").value = match.team1Name;
      document.getElementById("team2-name").value = match.team2Name;

      // Clear existing player rows so we can repopulate them.
      const team1Container = document.getElementById("team1-players");
      const team2Container = document.getElementById("team2-players");
      team1Container
        .querySelectorAll(".player-field")
        .forEach((el) => el.remove());
      team2Container
        .querySelectorAll(".player-field")
        .forEach((el) => el.remove());

      // For Team 1 players, re-create the player fields and populate values.
      match.team1Players.forEach((p) => {
        const field = createPlayerField();
        field.querySelector(".player-name").value = p.name;

        field.querySelector(".player-role").value = p.role;
        team1Container.appendChild(field);
      });

      // For Team 2 players:
      match.team2Players.forEach((p) => {
        const field = createPlayerField();
        field.querySelector(".player-name").value = p.name;

        field.querySelector(".player-role").value = p.role;
        team2Container.appendChild(field);
      });

      // Change the submit button text to indicate edit mode.
      matchForm.querySelector("button[type=submit]").textContent =
        "Update Match Data";
    }
  });

// --- LOGOUT FUNCTIONALITY ---
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "ADMIN-LOGIN-PAGE.html";
  });
}

