var request = require('request');
var cheerio = require('cheerio');

var RS_URL = 'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=scoobr';
/*var html = "1231,3213,123\n" + "142,13,321\n"+ "1421,135,3231\n"+ "142451,13673,32321\n" + "1231,3213,123\n" + "142,13,321\n"+ "1421,135,3231\n"+ "142451,13673,32321\n" +
"1231,3213,123\n" + "142,13,321\n"+ "1421,135,3231\n"+ "142451,13673,32321\n" + "1231,3213,123\n" + "142,13,321\n"+ "1421,135,3231\n"+ "142451,13673,32321\n" +
"1231,3213,123\n" + "142,13,321\n"+ "1421,135,3231\n"+ "142451,13673,32321\n" + "1231,3213,123\n" + "142,13,321\n"+ "1421,135,3231\n"+ "142451,13673,32321";
*/
/*var details = [/* 
        {'Rank': 0},
        {'Level': 0},
        {'XP': 0}
    ];*/
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
        'Construction': details}*/
    //];
var statNames = [
    'Overall',
    'Attack',
    'Defense',
    'Strength',
    'Hitpoints',
    'Ranged',        
    'Prayer',
    'Magic',
    'Cooking',
    'Woodcutting',
    'Fletching',
    'Fishing',
    'Firemaking',
    'Crafting',
    'Smithing',
    'Mining',
    'Herblore',        
    'Agility',
    'Thieving',
    'Slayer',
    'Farming',
    'Runecraft',
    'Hunter',
    'Construction'
];
var allStats = [];

request(RS_URL, function (error, response, html) {
    console.log("in request");
    console.log(error); 
    if (!error && response.statusCode == 200) {
        
        var prettyHtml = html.split("\n");
        console.log(prettyHtml);
        for (var i = 0; i < statNames.length; i++){
            var stat = prettyHtml[i].split(',');
            var details2 = Object.assign({}, details);
            if(stat.length == 3){
            	details2['Rank'] = stat[0];
            	details2['Level'] = stat[1];
            	details2['XP'] = stat[2];
        	}
            allStats[statNames[i]] = details2;
        }
        
    }
    
    console.log(allStats);
});

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
