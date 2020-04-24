//jshint esversion:6

var selectedRow = null;

function onFormSubmit() {

    var formData = readFormData();
    if (selectedRow == null)
      insertNewRecord(formData);
    else
      updateRecord(formData);
    resetForm();

}

function readFormData() {
  var formData = {};
  formData["Name"] = document.getElementById("Name").value;
  formData["Email"] = document.getElementById("Email").value;
  formData["Date"] = document.getElementById("Date").value;
  formData["Medicine"] = document.getElementById("Medicine").value;
  formData["Country"] = document.getElementById("Country").value;
  return formData;
}
function agecalcy(dob){

  var year = Number(dob.substr(0, 4));
  var month = Number(dob.substr(5, 2)) - 1;
  var day = Number(dob.substr(7, 2));
  var today = new Date();
  var age = today.getFullYear() - year;
  if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
  age--;
}
return age;
}

function insertNewRecord(data) {
  var table = document.getElementById("orderList").getElementsByTagName('tbody')[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.Name;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.Email;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = agecalcy(data.Date);
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.Medicine;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = data.Country;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById("Name").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("Date").value = "";
  document.getElementById("Medicine").value = "";
  document.getElementById("Country").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("Name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("Email").value = selectedRow.cells[1].innerHTML;
  document.getElementById("Date").value = selectedRow.cells[2].innerHTML;
  document.getElementById("Medicine").value = selectedRow.cells[3].innerHTML;
  document.getElementById("Country").value = selectedRow.cells[4].innerHTML;
}

function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.empCode;
  selectedRow.cells[2].innerHTML = formData.Date;
  selectedRow.cells[3].innerHTML = formData.Medicine;
  selectedRow.cells[4].innerHTML = formData.Country;
}

function onDelete(td) {
  if (confirm('Are you sure to delete this record ?')) {
    row = td.parentElement.parentElement;
    document.getElementById("orderList").deleteRow(row.rowIndex);
    resetForm();
  }
}
//
// function validate() {
//   isValid = true;
//   if (document.getElementById("Name").value == "") {
//     isValid = false;
//     document.getElementById("fullNameValidationError").classList.remove("hide");
//   } else {
//     isValid = true;
//     if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
//       document.getElementById("fullNameValidationError").classList.add("hide");
//   }
//   return isValid;
// }
