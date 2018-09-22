var tab = document.getElementById("mainTable");
var rows = tab.rows;

function clear() {
    for (var i = 0; i < rows.length; i++) { //遍历表格的行
        for (var j = 0; j < rows[i].cells.length; j++) {  //遍历每行的列
            rows[i].cells[j].style.backgroundColor = "white";
        }
    }
}

function check() {
    var workday = 0;
    let restdays = 0
    var week = ["No", "No", "No", "No", "No", "No", "No"];
    var mapping = new Map([[1, 'Morning'], [2, 'Middle'], [3, 'Night'], [4, 'Rest']]);
    for (let i = 1; i < rows.length; i++) { //遍历表格的行
        for (let j = 0; j < rows[i].cells.length; j++) {  //遍历每行的列
            if (rows[i].cells[j].style.backgroundColor == "gold") {
                workday++;
                week[j] = mapping.get(i);
            } else if (rows[i].cells[j].style.backgroundColor == "aquamarine") {
                restdays++;
                week[j] = mapping.get(i);
            }

        }
    }

    console.log("workday:" + workday);
    console.log("restday:" + restdays);

    if (workday > 5 || restdays > 2)
        alert("Invalid Schedule");
    else {
        $.ajax({
            type: "post",
            url: "currentuser",
            dataType: 'text',
            success: function (idata) {
                var curUser = idata;
                //curUser = "Chao";
                var map = {name: curUser, days: week};
                var map2json = JSON.stringify(map);
                // console.log(map);
                console.log(map2json);
                $.ajax({
                    type: "post",
                    url: "submitapplication",
                    contentType: "application/json; charset=utf-8",
                    data: map2json,
                    dataType: 'json',
                    success: function (data) {

                    }
                });
            }
        });
        alert("Application Confirmed!");
    }
}


$("td").click(function () {
    //var text = $(this).text();

    let col = $(this).parent().find("td").index($(this)[0]);
    let row = $(this).parent().parent().find("tr").index($(this).parent()[0]);

    // console.log (col+"-"+row);

    for (let i = 1; i < rows.length; i++) {
        if (i != row + 1) {
            rows[i].cells[col].style.backgroundColor = "white";
        }
    }

    var bg = this.style.backgroundColor;
    switch (bg) {
        case "white":
            if (row == 3)
                this.style.backgroundColor = "aquamarine";
            else
                this.style.backgroundColor = "gold";
            break;
        case "gold":
            this.style.backgroundColor = "white";
            break;
        case "aquamarine":
            this.style.backgroundColor = "white";
            break;
        default:
            if (row == 3)
                this.style.backgroundColor = "aquamarine";
            else
                this.style.backgroundColor = "gold";
    }
});

$("#applyBtn").click(function () {
    check();

});


$("#clearBtn").click(function () {
    clear();
});


String.prototype.format = function () {
    if (arguments.length == 0)
        return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};

