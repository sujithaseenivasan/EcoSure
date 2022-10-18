const databaseMaterials = new Map();
databaseMaterials.set('cotton', 5);
databaseMaterials.set('nylon', 6);
databaseMaterials.set('polyester', 7);
databaseMaterials.set('linen', 5);


const dataScrapedMaterials = ["100%", "cotton"];

var sustainabilityIndex = 0;

function findIndex(dataScrapedMaterials) {
    for(let i = 1; i < dataScrapedMaterials.length; i+=2) {
        for(const key of databaseMaterials.keys()) {
            if(key.toLowerCase()===dataScrapedMaterials[i]) {
                let percent = "" + dataScrapedMaterials[i-1];
                sustainabilityIndex += databaseMaterials.get(key)*(percent.substring(0, percent.length - 1)/100);
            }
        }

    }
    return Math.round(sustainabilityIndex);
}

var finalSustainabilityIndex = findIndex(dataScrapedMaterials);
chrome.runtime.sendMessage({
    'productName': "Men's Nike Sportswear Club T-Shirt",
    'susIndex': finalSustainabilityIndex,
    'infoLink': 'https://about.nike.com/en/impact',
});
console.log(finalSustainabilityIndex);
