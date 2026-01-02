const players = [
  { name: "Sunil Maniar", category: "A", base: 400000 },
  { name: "Rohit Shah", category: "A", base: 350000 },
  { name: "Amit Patel", category: "B", base: 250000 },
  { name: "Kunal Mehta", category: "B", base: 200000 }
];

let currentIndex = 0;
let history = [];

function loadPlayer() {
  const p = players[currentIndex];

  document.getElementById("playerName").innerText = p.name;
  document.getElementById("playerCategory").innerText = p.category;
  document.getElementById("basePrice").innerText =
    "₹ " + p.base.toLocaleString("en-IN");

  document.getElementById("teamSelect").value = "";
  document.getElementById("bidAmount").value = "";
  document.getElementById("statusMsg").innerText = "Status: READY";
}

function sellPlayer() {
  const team = document.getElementById("teamSelect").value;
  const bid = document.getElementById("bidAmount").value;

  if (!team || !bid) {
    alert("Please select team and enter bid amount");
    return;
  }

  history.push(currentIndex);

  document.getElementById("statusMsg").innerText =
    `SOLD to ${team} for ₹ ${Number(bid).toLocaleString("en-IN")}`;

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

  currentIndex = history.pop();
  loadPlayer();

  document.getElementById("statusMsg").innerText =
    "Last sale undone";
}

window.onload = loadPlayer;
