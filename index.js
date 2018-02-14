var gdax = require("gdax");
var publicClient = new gdax.PublicClient();

var bankAccount = 100;
var purchased = false;
var ethHolding = 0;
var purchasedAtEMA = 0;
var buys = 0;
var sells = 0;

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

			if(current_price < (calculateEMA(data)) && !purchased && bankAccount > 0){
				ethHolding = bankAccount / current_price;
				purchased = true;
				bankAccount = 0;
				purchasedAtEMA = calculateEMA(data);
				buys += 1;

				console.log("bought");
				console.log("EMA: " + calculateEMA(data))
				console.log("Current Price: " + current_price);
				console.log("Ethereum Holding: " + ethHolding);
				console.log("Bank Account: " + bankAccount);
				console.log("Buys: " + buy);
				console.log("");

			}

			else if(purchased && (current_price > purchasedAtEMA) || (current_price === (purchasedAtEMA - (purchasedAtEMA * 0.015)))){
				money_made = ethHolding * current_price;
				bankAccount += money_made;
				purchased = false;
				ethHolding = 0;
				purchasedAtEMA = 0;
				sell +=1;

				console.log("sold");
				console.log("EMA: " + calculateEMA(data))
				console.log("Current Price: " + current_price);
				console.log("Ethereum Holding: " + ethHolding);
				console.log("Bank Account: " + bankAccount);
				console.log("Sells: " + sell);
				console.log("");
			}

		 	else {
				console.log("not purchased");
				console.log("EMA: " + calculateEMA(data))
				console.log("Current Price: " + current_price);
				console.log("Ethereum Holding: " + ethHolding);
				console.log("Bank Account: " + bankAccount);
				
				if( purchasedAtEMA > 0){
					console.log("purchasedAtEMA: " + purchasedAtEMA);
				}

				console.log("");
			}
		}
	})
}


setInterval(getEth, 5000);

//track number of trades
//track return on trades w vs l
//track hold time of trade
//track average hold time

//keep track of high
//buy only when EMA - (ema * 0.01) >= current price
