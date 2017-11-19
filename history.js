var TAB = "\t";
var NL = "\n";

window.onhashchange = function () {
    if (window.location.href.endsWith("transactions-history")) {
        addButton();
    }
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function addButton() {
    await sleep(2000);
    
    var listRegion = document.getElementsByClassName('list-region')[0];

    var div = document.createElement("div");
    var button = document.createElement("button");
    var caption = document.createTextNode("Dump transaction to console");

    button.addEventListener("click", generateDump);
    
    button.appendChild(caption);
    div.appendChild(button);
    
    listRegion.insertBefore(div, listRegion.firstChild);
}

function getElementByXpath(path, root) {
    return document.evaluate(path, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function generateDump() {
    var rows = document.getElementsByClassName('transactions-history-item-basic-info');
    
    console.log("COPY-PASTE:");

    var dump = "";
    
    for (var i = 0; i < rows.length; i++) {
        console.debug("Processing row=", i);

        var row = rows[i];

        var dateArray = row.getElementsByClassName("transactions-history-list-item_date-timestamp")[0].textContent.split(".");
        var name = row.getElementsByClassName("transactions-history-list-item_name")[0].textContent.trim();

        var descs = row.getElementsByClassName("transactions-history-list-item_description");
        var desc = descs.length ? descs[0].textContent.trim() : "";

        var amount = getElementByXpath(".//*[contains(@class, 'transactions-history-list-item_amount')]/p[last()]/text()", row).data.trim();

        if (amount[0] == "-") {
            dump += (dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0] + TAB + amount.substring(1, 20) + TAB + name + (desc ? " - " + desc : "") + NL);
        }
    }

    console.log(dump);
    prompt("Here's your dump:", dump);
}