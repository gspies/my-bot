var link = "http://leagueoflegends.wikia.com/wiki/Nashor&#39;s Tooth";
var lastIndex = link.lastIndexOf("/");
link = link.substr(lastIndex + 1, link.length);
link = link.replace("&#39;", "'");
console.log(link);