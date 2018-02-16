var request = require('request');
var cheerio = require('cheerio');

/*var search = require('youtube-search');
 
var opts = {
  maxResults: 10,
  key: 'AIzaSyCXzsVCNuy1XSf26xynQHJwrQ8V0stEUoM'
};
 
search('rocket league', opts, function(err, results) {
  if(err) return console.log(err);
 
  console.dir(results);
});*/

/*var $ = jQuery = require('jquery')(window);
var http = require('http');
var name = "finessegreg";
*/

/*http.get('http://rltracker.pro/profiles/' + name + "/steam", function(response) {
	console.log(response);
})*/
//var testobj = [3213,123,123];
var RS_URL = 'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=';
var data = "1231,3213,123\n" + "142,13,321\n"+ "1421,135,3231\n"+ "142451,13673,32321";

var details = [/* 
        {'Rank': 0},
        {'Level': 0},
        {'XP': 0}
    */];
    /*var stats = [
        {'Overall': {}},
        {'Attack': {}},
        {'Defense': {}},
        {'Strength': {}}/*,
        {'Hitpoints': details},
        {'Ranged': details},        
        {'Prayer': details},
        {'Magic': details},
        {'Cooking': details},
        {'Woodcutting': details},
        {'Fletching': details},
        {'Fishing': details},
        {'Firemaking': details},
        {'Crafting': details},
        {'Smithing': details},
        {'Mining': details},
        {'Herblore': details},        
        {'Agility': details},
        {'Thieving': details},
        {'Slayer': details},
        {'Farming': details},
        {'Runecraft': details},
        {'Hunter': details},
        {'Construction': details}*/
    //];
var statNames = ['Overall','Attack','Defense','Strength'];
var allStats = [];
//console.log(stats);
request(RS_URL + username, function (error, response, html) {
      //console.log("in request");
      //console.log(error);
      //console.log 
      //if (!error && response.statusCode == 200) {
        
        var prettyHtml = data.split("\n");
        
        for (var i = 0; i < 4; i++){
            var stat = prettyHtml[i].split(',');
            var details2 = Object.assign({}, details);
            if(stat.length == 3){
            	details2['Rank'] = stat[0];
            	details2['Level'] = stat[1];
            	details2['XP'] = stat[2];
        	}
            allStats[statNames[i]] = details2;
        }
        
      //}
      //console.log(allStats);
    //});

console.log(printStats(allStats));

function printStats(allStats){
	var msg = "";
	for (stat in allStats){
		console.log(stat);
		msg += stat + "\n"
		console.log(allStats[stat]);
		msg += "\tRank: " + allStats[stat]['Rank'];
		msg += allStats[stat]['Level'];
		msg += "\tLevel: " + allStats[stat]['Level'];
		msg += allStats[stat]['XP'];
		msg += "\tRank: " + allStats[stat]['XP'];
		msg += "\n";
		
	}
	return msg;
}


/*var prettyHtml = data.split("\n");

for (var i = 0; i < prettyHtml.length; i++){
    var stat = prettyHtml[i].split(',');
    
    //console.log("stat",stat);
    //console.log("stats[i]",stats[i]);
    //console.log("stats[i].value[j]",stats[i].Rank);
    var details = [ 
        {'Rank': 0},
        {'Level': 0},
        {'XP': 0}
    ];
    if(stat.length == 3){
        /*stats[i]["Rank"] = stat[0]; 
        stats[i]["Level"] = stat[1]; 
        stats[i]["XP"] = stat[2];
        */
        /*details["Rank"] = stat[0]; 
        details["Level"] = stat[1]; 
        details["XP"] = stat[2];
        stats[i] += stat[2];
    }
    else{	
        stats[i] += stat[stat.length];
    }
    console.log(stats[i]);
    
}
console.log(stats);*/