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

/*var data = "1231,3213,123\n" + "142,13,321\n"+ "1421,135,3231\n"+ "1421,133,3221";

var details = [ 
        {'Rank': 0},
        {'Level': 0},
        {'XP': 0}
    ];
    var stats = [
        'Overall: ',
        'Attack: ',
        'Defense: ',
        'Strength: '/*,
        'Hitpoints: ' ,
        'Ranged: ' ,        
        'Prayer: ' ,
        'Magic: ' ,
        'Cooking: ' ,
        'Woodcutting: ' ,
        'Fletching: ' ,
        'Fishing: ' ,
        'Firemaking: ' ,
        'Crafting: ' ,
        'Smithing: ' ,
        'Mining: ' ,
        'Herblore: ' ,        
        'Agility: ' ,
        'Thieving: ' ,
        'Slayer: ' ,
        'Farming: ' ,
        'Runecraft: ' ,
        'Hunter: ' ,
        'Construction: ' 
    ];

var prettyHtml = data.split("\n");

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
    }var combinedArgs = args.join(" ");
    console.log(stats[i]);
    
}
console.log(stats);*/