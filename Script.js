let water = 0;

const towers = {
  rainCollector: { cost: 20, wps: 1, owned: 0 },
  handDugWell: { cost: 100, wps: 5, owned: 0 },
  boreholeWell: { cost: 900, wps: 20, owned: 0 },
};

document.getElementById("clicker").addEventListener("click", () => {
  water++;
  updateDisplay();
});

function buyTower(type) {
  const tower = towers[type];
  if (water >= tower.cost) {
    water -= tower.cost;
    tower.owned++;
    // Increase cost exponentially (e.g., by 15% each time)
    tower.cost = Math.floor(tower.cost * 1.15);
    updateDisplay();
    updateShopDisplay();
  }
}

function getTotalWPS() {
  return (
    towers.rainCollector.owned * towers.rainCollector.wps +
    towers.handDugWell.owned * towers.handDugWell.wps +
    towers.boreholeWell.owned * towers.boreholeWell.wps
  );
}

function updateDisplay() {
  document.getElementById("water-display").innerText = `Water: ${Math.floor(water)}`;
  document.getElementById("wps-display").innerText = `Water/sec: ${getTotalWPS()}`;
}

function updateShopDisplay() {
  document.querySelectorAll('.shop .item').forEach((item, idx) => {
    let type;
    if (idx === 0) type = 'rainCollector';
    else if (idx === 1) type = 'handDugWell';
    else if (idx === 2) type = 'boreholeWell';
    if (type) {
      const btn = item.querySelector('button');
      btn.textContent = `Buy (${towers[type].cost} Water)`;
    }
  });
}

// Call updateShopDisplay on load
updateShopDisplay();

setInterval(() => {
  water += getTotalWPS();
  updateDisplay();
}, 1000);

function showShopTab(tab) {
  const prodTab = document.getElementById('production-tab');
  const upgTab = document.getElementById('upgrades-tab');
  const prodTable = document.getElementById('production-table');
  const upgTable = document.getElementById('upgrades-table');

  if (tab === 'production') {
    prodTab.classList.add('active');
    upgTab.classList.remove('active');
    prodTable.style.display = '';
    upgTable.style.display = 'none';
  } else {
    prodTab.classList.remove('active');
    upgTab.classList.add('active');
    prodTable.style.display = 'none';
    upgTable.style.display = '';
  }
}
