var gdax = require("gdax");
var publicClient = new gdax.PublicClient();

var bankAccount = 100;
var purchased = false;
var ethHolding = 0;

function getEth(){

	publicClient.getProductHistoricRates('ETH-USD', { granularity: 60 }, function(error, response, data){
		if(error){
			console.log("error");
		} else {
			var retrievedData = 0;
			for(var i = 0; i < data.length; i++){
				retrievedData += data[i][4];
			}
			var average_price = retrievedData / i;
			var current_price = data[0][4];
			if(current_price < average_price - (average_price * 0.025) && !purchased && bankAccount > 0){
				ethHolding = bankAccount / current_price;
				purchased = true;
				console.log("bought");
				console.log("Current Price:" + current_price);
				console.log("Average Price: " + (average_price - (average_price * 0.025)).toString());
				console.log("Ethereum Holding: " + ethHolding);
				console.log("Bank Account: " + bankAccount);
			}
			else if(purchased && current_price > average_price){
				money_made = ethHolding * current_price;
				bankAccount += money_made;
				purchased = false;
				console.log("sold");
				console.log("Current Price:" + current_price);
				console.log("Average Price: " + (average_price - (average_price * 0.025)).toString());
				console.log("Ethereum Holding: " + ethHolding);
				console.log("Bank Account: " + bankAccount);
			}
		 	else {
				console.log("not purchased");
				console.log("Current Price:" + current_price);
				console.log("Average Price: " + (average_price - (average_price * 0.025)).toString());
				console.log("Ethereum Holding: " + ethHolding);
				console.log("Bank Account: " + bankAccount);
			}
		}
	})
}

setInterval(getEth, 5000);