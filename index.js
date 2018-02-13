var gdax = require("gdax");
var publicClient = new gdax.PublicClient();

publicClient.getProductHistoricRates('ETH-USD', { granularity: 3600 }, function(error, response, data){
	if(error){
		console.log("error");
	} else {
		var retrievedData = 0;
		for(var i = 0; i < data.length; i++){
			retrievedData += data[i][4];
		}
		console.log(retrievedData);
		console.log(i);
		console.log(retrievedData / i);
	}
})

