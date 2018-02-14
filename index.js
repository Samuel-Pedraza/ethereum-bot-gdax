var gdax = require("gdax");
var publicClient = new gdax.PublicClient();

var bankAccount = 100;
var purchased = false;
var ethHolding = 0;

function calculateSMA(data){
	var holderSMA = 0;
	var SMA = 0;

	for(var i = data.length - 1; i > data.length - 11; i--){
		holderSMA += data[i][4];
	}
	
	return SMA = holderSMA / 10;
}

function calculateEMA(data){
	var multiplier = 0.1818;	
	console.log("SMA: " +  calculateSMA(data));
	var lastEMA;
	var currentEMA;

	for(var i = data.length - 11; i > 0; i--){
		if(i == data.length - 11){
			lastEMA = calculateSMA(data);
		} else {
			currentEMA = (data[i][4] - lastEMA) * (multiplier) + lastEMA;
			lastEMA = currentEMA;
		}
	}
	return currentEMA;
}

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
				bankAccount = 0;

				console.log("bought");
				console.log("Average Price: " + (average_price - (average_price * 0.025)).toString());
				console.log("Ethereum Holding: " + ethHolding);
				console.log("Bank Account: " + bankAccount);
			}

			else if(purchased && current_price > average_price){
				money_made = ethHolding * current_price;
				bankAccount += money_made;
				purchased = false;

				console.log("sold");
				console.log("Average Price: " + (average_price - (average_price * 0.025)).toString());
				console.log("Ethereum Holding: " + ethHolding);
				console.log("Bank Account: " + bankAccount);
			}

		 	else {
		 		console.log(calculateEMA(data));
				console.log("not purchased");
				console.log("Average Price: " + (average_price - (average_price * 0.025)).toString());
				console.log("Ethereum Holding: " + ethHolding);
				console.log("Bank Account: " + bankAccount);
			}
		}
	})
}


setInterval(getEth, 5000);