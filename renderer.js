// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var $ = require("jquery");
var dt = require("datatables.net-bs5")();
$(document).ready(function () {
  $("#tableMenuList").DataTable({
    pageLength: 9,
    lengthChange: false,
  });
});
$(document).ready(function () {
  $("#tableHistoryTrans").DataTable({
    pageLength: 10,
    lengthChange: false,
  });
});
