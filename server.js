var cronJob = require('cron').CronJob;

var job = new cronJob('00 30 11 * * 0-6', function(){
	var nodeio = require('node.io');
	var cradlescraper = require('./cradlescraper.js');
	nodeio.start(cradlescraper);
}, null, true, "Europe/Berlin");

