function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

if(window.location.href.endsWith("investmentfunds")){
  document.onreadystatechange = function () {
    console.log('state: ' + document.readyState);

    if (document.readyState === "complete") {
      sleep(2000).then(() => {
        var rows = document.getElementsByClassName('investment-properties');
        console.log("Rows:", rows.length);

        for (i = 0; i < rows.length; i++) {
          var row = rows[i];
            var actualSpan = row.querySelectorAll("ul li.investment-actual span")[0];
            var rateSpan = row.querySelectorAll("ul li.investment-rate span")[0];

            var actual = actualSpan['innerText'].substring(0, actualSpan['innerText'].length-5).replace(/,/, ".").replace(/\s/g, "");
            var rate = rateSpan['innerText'].substring(0, rateSpan['innerText'].length-5).replace(/,/, ".").replace(/\s/g, "");

            var perc = Number(100 * rate / (actual - rate)).toFixed(2);

            console.log("Actual:", actual, "rate:", rate, "perc:" , perc, "%");

            var spanVal = rateSpan['innerText'];
            rateSpan['innerText'] = spanVal.substring(0, spanVal.length - 1) + " (" + perc + " %)"
        }

      });
    }
  }
}
