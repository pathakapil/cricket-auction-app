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

function formatMoney(amount) {
  return "₹ " + amount.toLocaleString("en-IN");
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
  for (let team in wallets) {
    html += `<p><b>${team}</b>: ${formatMoney(wallets[team])}</p>`;
  }
  document.getElementById("wallets").innerHTML = html;
}

function sellPlayer() {
  const team = document.getElementById("teamSelect").value;
  const bid = Number(document.getElementById("bidAmount").value);

  if (!team || !bid) {
    alert("Please select team and enter bid amount");
    return;
  }

  if (wallets[team] < bid) {
    alert("Insufficient wallet balance!");
    return;
  }

  history.push({
    playerIndex: currentIndex,
    team: team,
    bid: bid
  });

  wallets[team] -= bid;

  document.getElementById("statusMsg").innerText =
    `SOLD to ${team} for ${formatMoney(bid)}`;

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
  currentIndex = last.playerIndex;
  wallets[last.team] += last.bid;

  loadPlayer();

  document.getElementById("statusMsg").innerText =
    "Last sale undone";
}

window.onload = loadPlayer;
