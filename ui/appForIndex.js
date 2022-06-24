const menuDisplay = document.querySelector("#menuDisplay");
const menuCart = document.querySelector("#menuCart");
const totalBuy = document.querySelector("#totalBuy");
const totalForm = document.querySelector("#totalForm");
const { ipcRenderer } = require("electron");
let menus = [];
let menuClickState = false;
let i = 1;
let cartVal = [];

function renderMenuDisplay(menus) {
  menuDisplay.innerHTML = "";
  menus.map((m) => {
    menuDisplay.innerHTML += `
    <a href="javascript: addToCart('${m._id}')" class="menuItemDisplay text-center">
        <p id="namaDisplay">${m.nama}</p>
        <p id="hargaDisplay">Rp. ${m.harga},00</p>
    </a>
      `;
  });
  menuClickState = true;
}
let total = 0;

function addToCart(id) {
  const menu = menus.find((menu) => menu._id === id);
  menuCart.innerHTML += `
  <td style="font-size: 20px; padding-left: 20px; font-weight: bold">${menu.nama}</td>
  <td
  rowspan="2"
  style="text-align: right; padding-right: 15px; "
  ></td>
  <tr>
      <td style="font-size: 15px; padding-left: 20px">
        Rp. ${menu.harga},00
      </td>
    </tr>
  `;
  total += menu.harga;
  totalBuy.innerHTML = `${total}`;
}

function clearCart() {
  menuCart.innerHTML = "";
  total = 0;
  totalBuy.innerHTML = `${total}`;
}

totalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const transaksi = {
    kode: `T0${i}`,
    total: totalBuy.innerHTML,
  };
  ipcRenderer.send("new-transaksi", transaksi);
  i += 1;
  totalForm.reset();
  clearCart();
  alert("Transaksi berhasil!");
});

ipcRenderer.on("new-transaksi-created", (e, args) => {
  const newTransaksi = JSON.parse(args);
  cartVal.push(newTransaksi);
});

ipcRenderer.send("get-menus-display");

//rendering all menu list
ipcRenderer.on("get-menus-display", (e, args) => {
  const menusReceivedforDisplay = JSON.parse(args);
  menus = menusReceivedforDisplay;
  renderMenuDisplay(menus);
});
