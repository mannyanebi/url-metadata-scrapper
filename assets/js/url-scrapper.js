console.log('Starting url-scrapper.js');

//requiring the url-scrapper module
const scrapper = require('url-scrapper');

//the url to scrape its meta data
let url = "https://drive.google.com/file/d/1xYEnFidJYwN6oeJ61XoTlkl1vEIM3Ym5/view?usp=drivesdk";

//self invoking async function to allow the await for the scrapper function
(async function scrape() {
    try {
        let metadata = await scrapper(url);
        console.log(metadata);
    } catch (error) {
        console.error(error);
    }
})();