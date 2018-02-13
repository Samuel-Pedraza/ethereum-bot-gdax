var gdax = require("gdax");
var publicClient = new gdax.PublicClient();

publicClient.getProductHistoricRates('ETH-USD', { granularity: 3600 }, function(error, data){
	console.log(typeof(data.body))
})

