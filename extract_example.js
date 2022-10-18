import fetch from "node-fetch";
import cheerio from "cheerio";


// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// URL for data
const URL = "https://www.amazon.com/Nike-Sportswear-T-Shirt-Shirt-Classic/dp/B07FKF9F13/ref=asc_df_B07FKF9F13/?tag=hyprod-20&linkCode=df0&hvadid=346802058703&hvpos=&hvnetw=g&hvrand=2780772733570724711&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9028280&hvtargid=pla-657460318987&psc=1&tag=&ref=&adgrpid=72569780769&hvpone=&hvptwo=&hvadid=346802058703&hvpos=&hvnetw=g&hvrand=2780772733570724711&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9028280&hvtargid=pla-657460318987";

// start of the program
const getMaterialsList = async () => {


   // parsing the data
   var prodInfo = null;
   var $ = null;
   var matsInfo = null;
   while (prodInfo == null || prodInfo.html() == null || matsInfo == null || matsInfo.html() == null)
   {
      const siteRawData = await getRawData(URL);
      //console.log(siteRawData)
      $ = cheerio.load(siteRawData);
      prodInfo = await $('.a-section.a-spacing-none');
      matsInfo = $("li:first",'.a-unordered-list.a-vertical.a-spacing-mini');
   }


   const brandName = prodInfo.children('a').slice(0,1).text()
   const prodName = prodInfo.children('a').slice(1,2).text();
   const output = [brandName, prodName, matsInfo.text()];
   console.log(output[0]," ", output[1], " ", output[2]);
   return output;
}

// invoking the main function
getMaterialsList();