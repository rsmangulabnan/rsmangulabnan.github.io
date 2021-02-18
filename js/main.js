document.getElementById('order-container').appendChild(orderGrid());
    
function showExamOutput() {
    var oldStr = document.getElementById("orderInput").value;
    var str = document.getElementById("orderInput").value;

    var res = str.replace(/{/g, "<");
    var res2 = res.replace(/}/g, ">");
    var res3user = res2.replace(/\\/g, "/");

    if (window.DOMParser) {
      // code for modern browsers
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(res3user,"text/xml");
    } else {
      // code for old IE browsers
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(res3user);
    } 

    document.getElementById("order-message").textContent  = "Order Received! Order #" + xmlDoc.getElementsByTagName('order')[0].getAttribute('number');

    var txt, pizzaType, toppings, toppingsItems, toppingsLoc;

    pizzas = xmlDoc.getElementsByTagName('pizza');
    for (pizzaNum = 0; pizzaNum < pizzas.length; pizzaNum++) {
        txt = "";

        populateDiv("pizza-number-"+pizzaNum, pizzas[pizzaNum].getAttribute('number'));

        pizzaType = pizzas[pizzaNum].getElementsByTagName('type')[0].childNodes[0].nodeValue;

        txt += "<h3>" + pizzaType  + "</h3><br>";
        txt += pizzas[pizzaNum].getElementsByTagName('crust')[0].childNodes[0].nodeValue  + "</br>";
        txt += pizzas[pizzaNum].getElementsByTagName('size')[0].childNodes[0].nodeValue  + "</br>";

        populateDiv("pizza-info-"+pizzaNum, txt);

        toppings = pizzas[pizzaNum].getElementsByTagName('toppings');


        if(pizzaType=="custom" && toppings.length>0){
            $("#pizza-toppings-" + pizzaNum).show();
            $("#pizza-wholetoppings-" + pizzaNum).show();
            $("#pizza-half1toppings-" + pizzaNum).show();
            $("#pizza-half2toppings-" + pizzaNum).show();

            populateDiv("pizza-toppings-"+pizzaNum, "<h4>TOPPINGS</h4>");
            for(var t=0; t<toppings.length; t++){
                toppingsItems = toppings[t].getElementsByTagName('item');
                var txt2 = "";

                for(var u=0; u<toppingsItems.length; u++){
                    txt2 +=  toppingsItems[u].childNodes[0].nodeValue + "</br>";
                }

                toppingsLoc = toppings[t].getAttribute('area');

                switch(toppingsLoc) {
                      case "0":
                        txt = "<b>TOPPINGS WHOLE: </b></br>" + txt2;
                        populateDiv("pizza-wholetoppings-" + pizzaNum, txt);
                        break;
                      case "1":
                        txt = "<b>TOPPINGS FIRST-HALF: </b></br>"  + txt2;
                        populateDiv("pizza-half1toppings-" + pizzaNum,txt);
                        break;
                      case "2":
                        txt = "<b>TOPPINGS SECOND-HALF: </b></br>"  + txt2;
                        populateDiv("pizza-half2toppings-" + pizzaNum,txt);
                        break;
                      default:
                        txt = "Error on Toppings </br>";
                    }

            }
        }else{
            $("#pizza-toppings-" + pizzaNum).hide();
            $("#pizza-wholetoppings-" + pizzaNum).hide();
            $("#pizza-half1toppings-" + pizzaNum).hide();
            $("#pizza-half2toppings-" + pizzaNum).hide();

        }

        $("#pizza-" + pizzaNum).show();

    }

    $("#inputPage").hide();
    $("#outputPage").show();
}
        
    
function orderGrid() {
    var container = document.createElement('div');
    container.className = "grid-orders";

    for (var i = 0; i < 24; i++) {

        var row = document.createElement('div');
        row.className = "pizza-card";
        row.id = "pizza-" + i;
        container.appendChild(row);
        row.style="display:none";

        var pizNum = document.createElement('div');
        pizNum.className = "num";
        pizNum.id = "pizza-number-" + i;
        row.appendChild(pizNum);

        var pizHeader = document.createElement('div');
        pizHeader.className = "head";
        pizHeader.id = "pizza-info-" + i;
        row.appendChild(pizHeader);

        var pizToppText = document.createElement('div');
        pizToppText.className = "topp";
        pizToppText.id = "pizza-toppings-" + i;
        row.appendChild(pizToppText);

        var wholeToppings = document.createElement('div');
        wholeToppings.className = "topp0";
        wholeToppings.id = "pizza-wholetoppings-" + i;
        row.appendChild(wholeToppings);

        var half1Toppings = document.createElement('div');
        half1Toppings.className = "topp1";
        half1Toppings.id = "pizza-half1toppings-" + i;
        row.appendChild(half1Toppings);

        var half2Toppings = document.createElement('div');
        half2Toppings.className = "topp2";
        half2Toppings.id = "pizza-half2toppings-" + i;
        row.appendChild(half2Toppings);
    }

    return container;
}   
        
function populateDiv(divID, txtContent){
    document.getElementById(divID).innerHTML = txtContent;    
}