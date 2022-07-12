const totalJual = document.querySelector("#totalJual");
const untungHariIni = document.querySelector("#untung");
const { ipcRenderer } = require("electron");
menus = [];
untung = [];
totalJualGraph1 = [];
totalJualGraph2 = [];
function dumpTotalJualGraph(totalJualGraph1) {
  totalJualGraph2 = totalJualGraph1;
  return totalJualGraph2;
}
ipcRenderer.send("get-graph-display");
//rendering all menu list
ipcRenderer.on("get-graph-display", (e, args) => {
  const totalJualGraph = args;
  console.log(totalJualGraph);
  totalJualGraph1 = totalJualGraph;
  totalJualGraph1.reverse();
  const labels = ["Minggu I", "Minggu II", "Minggu III", "Minggu IV"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Penjualan Bulan Ini",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: totalJualGraph1,
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {},
  };

  const myChart = new Chart(document.getElementById("myChart"), config);
});

function renderTotal(menus) {
  totalJual.innerHTML = `${menus}`;
  menuClickState = true;
}
function renderUntung(untung) {
  untungHariIni.innerHTML = `${untung}`;
  menuClickState = true;
}

ipcRenderer.send("get-total-display");
//rendering all menu list
ipcRenderer.on("get-total-display", (e, args) => {
  const totalReceivedforDisplay = JSON.parse(args);
  console.log(totalReceivedforDisplay);
  menus = totalReceivedforDisplay;
  renderTotal(menus);
});
ipcRenderer.send("get-untung-display");
//rendering all menu list
ipcRenderer.on("get-untung-display", (e, args) => {
  const untungReceivedforDisplay = JSON.parse(args);
  console.log(untungReceivedforDisplay);
  untung = untungReceivedforDisplay;
  renderUntung(untung);
});
