var cheerio = require('cheerio');

var html = '<div class=\"build-wrapper\"><a href=\"http://leagueoflegends.wikia.com/wiki/Nashor&#39;s Tooth\" rel=\"nofollow\" target=\"_blank\"><img src=\"//ddragon.leagueoflegends.com/cdn/8.4.1/img/item/3115.png\" class=\"possible-build tsm-tooltip\" data-id=\"3115\" data-type=\"items\"/></a>'    

var $ = cheerio.load(html);
                            var count = 0;
                          
                            //console.log(html);
                            $('div.build-wrapper').find('a').each(function(i, element){
                              console.log("i:", i);
                              console.log("element: ", $(element).attr('a'));
                              var a = $(this).attr("href");
                              console.log(a);
                              //var lastIndex = a.lastIndexOf("/");
                              //a = a.substr(lastIndex + 1, a.length);
                              //a = a.replace("&#39;", "'");
                              //a = a.replace("Rating ", "");
                              if (count < 6){
                                
                                //console.log(a);
                                //build.add(a);
                                count++;
                                //ratings[count++] += a;
                                
                              }
                            });