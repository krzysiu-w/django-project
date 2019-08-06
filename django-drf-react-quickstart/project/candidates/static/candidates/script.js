let jo = document.getElementById('data').value;
let candidates = JSON.parse(jo);
let table = document.getElementById('list');




for (let i = 0; i < candidates.length; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);
    for (x in candidates[i]) {
        if (x != 'skills') {

            var td = document.createElement("td");
            td.innerHTML = candidates[i][x];
            tr.appendChild(td);
        }
    }
}