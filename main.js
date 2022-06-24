// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const Menu = require("./models/Menu");
const Transaksi = require("./models/Transaksi");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("new-menu", async (e, args) => {
  const newMenu = new Menu(args);
  const menuSaved = await newMenu.save();
  console.log(menuSaved);
  e.reply("new-menu-created", JSON.stringify(menuSaved));
});

ipcMain.on("get-menus", async (e, args) => {
  const menus = await Menu.find();
  e.reply("get-menus", JSON.stringify(menus));
});
ipcMain.on("get-transaksis", async (e, args) => {
  const transaksis = await Transaksi.find();
  e.reply("get-transaksis", JSON.stringify(transaksis));
});

ipcMain.on("get-menus-display", async (e, args) => {
  const menusForDisplay = await Menu.find();
  e.reply("get-menus-display", JSON.stringify(menusForDisplay));
});

//deleting menu from menu list
ipcMain.on("delete-menu", async (e, args) => {
  const menuDeleted = await Menu.findByIdAndDelete(args);
  e.reply("delete-menu-success", JSON.stringify(menuDeleted));
});
ipcMain.on("delete-history", async (e, args) => {
  const historyDeleted = await Transaksi.findByIdAndDelete(args);
  e.reply("delete-history-success", JSON.stringify(historyDeleted));
});

//updating menu from menu list
ipcMain.on("update-menu", async (e, args) => {
  const updatedMenu = await Menu.findByIdAndUpdate(
    args.idMenuToUpdate,
    {
      nama: args.nama,
      jenis: args.jenis,
      harga: args.harga,
      description: args.description,
    },
    { new: true }
  );
  e.reply("update-menu-success", JSON.stringify(updatedMenu));
});

ipcMain.on("new-transaksi", async (e, args) => {
  const newTrans = new Transaksi(args);
  const transaksiSaved = await newTrans.save();
  console.log(transaksiSaved);
  e.reply("new-transaksi-created", JSON.stringify(transaksiSaved));
});
