var cheerio = require("cheerio");
var request = require("request");

// First, tell the console what scraping.js is doing
console.log("\n******************************************\n" +
            "Grabbing the toy name, \n" +
            "image source URL, manufacturer name\n" +
            "and MSRP." +
            "\n******************************************\n");

// Make request to grab the HTML from ttpm crafts activity toys website section
request("https://ttpm.com/c/4/arts-crafts-activity-toys/", function(error, response, html) {

  // Load the HTML into cheerio
  var $ = cheerio.load(html);

  // Make an empty array for saving our scraped info
  var results = [];

  // With cheerio, look at each div with the class name "item- container"
  $(".item-container").each(function(i, element) {

    /* Cheerio's find method will "find" the first matching child element in a parent.
     *    We start at the current element, then "find" its first child product-image.
     *    Then, we "find" the lone child img-tag in that product-image.
     *    Then, .attr grabs the imgs src value.
     *    Visit the website and inspect the DOM if there's any confusion
    */
   var title = $(element).find(".product_image").find("img").attr("title");
    var imgLink = $(element).find(".product_image").find("img").attr("src").split(",")[0].split(" ")[0];
    var manufacturer = $(element).find("p.manufacturer_name").find("em").text();
    var msrp = $(element).find("span.product_msrp").text();
    // Push the results into the array
    results.push({ 
      title:title,
      link: imgLink,
    manufacturer: manufacturer,
    msrp: msrp
 });
  });

  // After looping through each element found, log the results to the console
  console.log(results);
});
