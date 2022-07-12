const addMenuForm = document.querySelector("#addMenuForm");
const namaAddMenu = document.querySelector("#namaAddMenu");
const jenisAddMenu = document.querySelector("#jenisAddMenu");
const hargaAddMenu = document.querySelector("#hargaAddMenu");
const descriptionAddMenu = document.querySelector("#descriptionAddMenu");
const menuList = document.querySelector("#menuList");

const { ipcRenderer } = require("electron");
let menus = [];
//update state
let updateStatus = false;
let idMenuToUpdate = "";

//delete menu function
function deleteMenu(id) {
  const result = confirm("Are you sure you want to delete this menu?");
  if (result) {
    ipcRenderer.send("delete-menu", id);
  }
  document.location.reload(true);
  return;
}

//edit menu function
function editMenu(id) {
  updateStatus = true;
  idMenuToUpdate = id;
  const menu = menus.find((menu) => menu._id === id);
  namaAddMenu.value = menu.nama;
  jenisAddMenu.value = menu.jenis;
  hargaAddMenu.value = menu.harga;
  descriptionAddMenu.value = menu.description;
}

//render menu list
function renderMenuList(menus) {
  menuList.innerHTML = "";
  menus.map((m) => {
    menuList.innerHTML += `
      <tr style="border-top: 1px black solid">
        <td>${m.nama}</td>
        <td>${m.jenis}</td>
        <td>${m.harga}</td>
        <td>${m.description}</td>
        <td>
        <button class="btn btn-warning" onclick="editMenu('${m._id}')"><i class="bi-pencil-square"></i></button>
        <button class="btn btn-danger" onclick="deleteMenu('${m._id}')"><i class="bi-trash"></i></button>
        </td>
      </tr>
    `;
  });
}

addMenuForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const menu = {
    nama: namaAddMenu.value,
    jenis: jenisAddMenu.value,
    harga: hargaAddMenu.value,
    description: descriptionAddMenu.value,
  };
  if (!updateStatus) {
    ipcRenderer.send("new-menu", menu);
  } else {
    ipcRenderer.send("update-menu", { ...menu, idMenuToUpdate });
  }
  addMenuForm.reset();
  location.reload(true);
});

ipcRenderer.on("new-menu-created", (e, args) => {
  const newMenu = JSON.parse(args);
  menus.push(newMenu);
  renderMenuList(menus);
});

ipcRenderer.send("get-menus");

//rendering all menu list
ipcRenderer.on("get-menus", (e, args) => {
  const menusReceived = JSON.parse(args);
  menus = menusReceived;
  renderMenuList(menus);
});

//rendering after deleting menu
ipcRenderer.on("delete-menu-success", (e, args) => {
  const deletedMenu = JSON.parse(args);
  const newMenu = menus.filter((m) => {
    return m._id !== deletedMenu._id;
  });
  menus = newMenu;
  renderMenuList(menus);
});

//rendering after updating menu
ipcRenderer.on("update-menu-success", (e, args) => {
  const updatedMenu = JSON.parse(args);
  menus = menus.map((m) => {
    if (m._id === updatedMenu._id) {
      (m.nama = updatedMenu.nama),
        (m.jenis = updatedMenu.jenis),
        (m.harga = updatedMenu.harga),
        (m.description = updatedMenu.description);
    }
    return m;
  });
  renderMenuList(menus);
});
