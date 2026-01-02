const players = [
  { name: "Sunil Maniar", category: "A", base: 400000 },
  { name: "Rohit Shah", category: "A", base: 350000 },
  { name: "Amit Patel", category: "B", base: 250000 },
  { name: "Kunal Mehta", category: "B", base: 200000 }
];

let currentIndex = 0;
let history = [];

const wallets = {
  "Team Phoenix": 2000000,
  "Seven Storms": 2000000,
  "Team Legends": 2000000,
  "Beeduus United": 2000000,
  "Bhoomi Stars": 2000000
};

function formatMoney(v) {
  return "₹ " + v.toLocaleString("en-IN");
}

function loadPlayer() {
  const p = players[currentIndex];
  document.getElementById("playerName").innerText = p.name;
  document.getElementById("playerCategory").innerText = p.category;
  document.getElementById("basePrice").innerText = formatMoney(p.base);
  document.getElementById("teamSelect").value = "";
  document.getElementById("bidAmount").value = "";
  document.getElementById("statusMsg").innerText = "Status: READY";
  renderWallets();
}

function renderWallets() {
  let html = "";
  for (let t in wallets) {
    html += `<p><b>${t}</b>: ${formatMoney(wallets[t])}</p>`;
  }
  document.getElementById("wallets").innerHTML = html;
}

function renderHistory() {
  const tbody = document.querySelector("#historyTable tbody");
  tbody.innerHTML = "";
  history.forEach(h => {
    const row = `
      <tr>
        <td>${h.player}</td>
        <td>${h.category}</td>
        <td>${h.team}</td>
        <td>${formatMoney(h.bid)}</td>
      </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}

function sellPlayer() {
  const team = document.getElementById("teamSelect").value;
  const bid = Number(document.getElementById("bidAmount").value);
  if (!team || !bid) {
    alert("Select team & enter bid");
    return;
  }
  if (wallets[team] < bid) {
    alert("Insufficient wallet balance");
    return;
  }

  const p = players[currentIndex];

  wallets[team] -= bid;

  history.push({
    player: p.name,
    category: p.category,
    team: team,
    bid: bid,
    playerIndex: currentIndex
  });

  document.getElementById("statusMsg").innerText =
    `SOLD to ${team} for ${formatMoney(bid)}`;

  renderHistory();

  currentIndex++;
  if (currentIndex < players.length) {
    setTimeout(loadPlayer, 800);
  } else {
    document.getElementById("statusMsg").innerText =
      "Auction Completed 🎉";
  }
}

function undoSale() {
  if (history.length === 0) {
    alert("Nothing to undo");
    return;
  }

  const last = history.pop();
  wallets[last.team] += last.bid;
  currentIndex = last.playerIndex;

  renderHistory();
  loadPlayer();

  document.getElementById("statusMsg").innerText =
    "Last sale undone";
}

window.onload = loadPlayer;
