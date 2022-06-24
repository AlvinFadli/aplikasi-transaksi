const transaksiList = document.querySelector("#transaksiList");
const { ipcRenderer } = require("electron");

let transaksis = [];

function deleteHistory(id) {
  const result = confirm("Are you sure you want to delete this transaction?");
  if (result) {
    ipcRenderer.send("delete-history", id);
  }
  document.location.reload(true);
  return;
}

function renderTransList(transaksis) {
  transaksiList.innerHTML = "";
  transaksis.map((t) => {
    transaksiList.innerHTML += `
        <tr style="border-top: 1px black solid">
          <td></td>
          <td>${t._id.substr(18).toUpperCase()}</td>
          <td>Rp. ${t.total}, 00</td>
          <td>${t.tanggal.slice(4, 15)}</td>
          <td>${t.tanggal.slice(16, 24)}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteHistory('${
              t._id
            }')"><i class="bi-trash"></i></button>
          </td>
        </tr>
      `;
  });
}

ipcRenderer.send("get-transaksis");

//rendering all menu list
ipcRenderer.on("get-transaksis", (e, args) => {
  const transaksisReceived = JSON.parse(args);
  transaksis = transaksisReceived;
  renderTransList(transaksis);
});

ipcRenderer.on("delete-history-success", (e, args) => {
  const deletedHistory = JSON.parse(args);
  const newHistory = transaksis.filter((m) => {
    return m._id !== deletedHistory._id;
  });
  transaksis = newHistory;
  renderMenuList(menus);
});
