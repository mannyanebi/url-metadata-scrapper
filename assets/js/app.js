console.log('Starting my-url-metadata.js');

//requiring the file system module
const fs = require('fs');

//requiring the url-scrapper module
const scrapper = require('url-scrapper');


//let apiUrl = "https://api.urlmeta.org/?url=";
// let desiredUrl = "https://drive.google.com/file/d/0B8g3vz8rN1CjbUR4NWV2ZTk3V2s/view?usp=drivesdk";


//getting link address from links.json file which is an array of JS objects
let links;
try {
    //reading the links.json file
    links = fs.readFileSync('../links.json', 'utf-8');
} catch (error) {
    links = [];
}

//parsing links from JSON format into JS objects
links = JSON.parse(links);

//getting the first element of the link object array which is also an ARRAY
let link = links[0].link

//taking each element of the links array and getting its meta data and then writing each to a file
link.forEach(url => {
    //url from the linkUrl element
    // let url = linkUrl;
    //requesting the meta-data from the url

    //self invoking async function to allow the await for the scrapper function
    (async function scrape() {
        try {
            let metadata = await scrapper(url);
            //printing the title property from the body object
            console.log(metadata.title);
            //creating an object of link title and the link url so each would be written to the file as pairs
                let linkMetadata = {
                    title: metadata.title,
                    link: url
                }
            
            //Converting the linkMetadata object into JSON format
            linkMetadata = JSON.stringify(linkMetadata);
            //writing each link's meta data title to a file along with its link
            try {
                fs.appendFileSync('links-metadata.json', linkMetadata+',');
            } catch (error) {
                console.log(`Something went wrong, could not write to file. \nSee Error Message:${error}`)
            }
            } catch (error) {
                console.error(error);
            }
    })();  
});    