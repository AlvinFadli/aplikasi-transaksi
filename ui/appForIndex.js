const makananDisplay = document.querySelector("#makananDisplay");
const minumanDisplay = document.querySelector("#minumanDisplay");
const menuCart = document.querySelector("#menuCart");
const totalBuy = document.querySelector("#totalBuy");
const totalForm = document.querySelector("#totalForm");
const { ipcRenderer } = require("electron");
let makanans = [];
let minumans = [];
let makananClickState = false;
let minumanClickState = false;

let i = 1;
let cartVal = [];

function renderMinumanDisplay(minumans) {
  minumanDisplay.innerHTML = "";
  minumans.map((m) => {
    minumanDisplay.innerHTML += `
    <a href="javascript: addToCart('${m._id}')" class="menuItemDisplay menuItemLink text-center">
        <p id="namaDisplay">${m.nama}</p>
        <p id="hargaDisplay">Rp. ${m.harga},00</p>
    </a>
      `;
  });
  minumanClickState = true;
}
function renderMakananDisplay(makanans) {
  makananDisplay.innerHTML = "";
  makanans.map((m) => {
    makananDisplay.innerHTML += `
    <a href="javascript: addToCart('${m._id}')" class="menuItemDisplay menuItemLink text-center">
        <p id="namaDisplay">${m.nama}</p>
        <p id="hargaDisplay">Rp. ${m.harga},00</p>
    </a>
      `;
  });
  makananClickState = true;
}

let total = 0;

function addToCart(id) {
  const menus = makanans.concat(minumans);
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
  console.log("clicked");
  totalBuy.innerHTML = `  ${total}`;
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

ipcRenderer.send("get-makanan-display");

//rendering all menu list
ipcRenderer.on("get-makanan-display", (e, args) => {
  const menusReceivedforDisplay = JSON.parse(args);
  makanans = menusReceivedforDisplay;
  renderMakananDisplay(makanans);
});

ipcRenderer.send("get-minuman-display");

ipcRenderer.on("get-minuman-display", (e, args) => {
  const menusReceivedforDisplay = JSON.parse(args);
  minumans = menusReceivedforDisplay;
  renderMinumanDisplay(minumans);
});
