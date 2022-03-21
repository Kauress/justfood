/*---------------------------------------- Custom JS for API Call & Validation  -------------------------------------------------------- */
//Note: Define global variable which will be used to store the API Base URL & API Response/Results
let configApiUrl = 'https://api.spoonacular.com/recipes/complexSearch?';
//API response data is stored as an array
let totalData = [];
//input text from the user
let inputText;
//div where the search results will be displayed
let resultDiv = document.getElementById('results-div');





//Note: Call 'Search Recipe' API here. If we get a valid API response then store this response in globalvariable & if the API response is blank/null then it  will call 'No record found' display method
function search()// this function is called by clicking on DOM search button 
{
    if(document.getElementById('txtSearch').value !== "")// if the input is not an empty string
    inputText = document.getElementById('txtSearch').value;//assign user input to the global inputText variable
    /*The API we will be using is Spoonacular: https://spoonacular.com/food-api 
    This API will allow you to search its food database by cuisine, ingredient, nutrients, 
    it will give you random recipes and much more.
    */
   //We need to get an API key from Spoonacular in order to query the API
let APIKey = 'apiKey=e5fb540e1a04465694e69238aa9bc3a2';
//construct search URL: https://spoonacular.com/food-api/docs#Search-Recipes-Complex
let fetchURL = configApiUrl + APIKey + "&query=" + inputText
// use fetchAPI
/*
You are calling the Fetch API and passing in the URL to the JSONPlaceholder API. 
Then a response is received. However, the response you get is not JSON, but an object with a series of methods that
 can be used depending on what you want to do with the information. 
 To convert the object returned into JSON, use the json() method.

so fetch data from the URL and then in response an Object is returned which has to be converted to JSON
*/

    fetch(fetchURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
       // console.log(data);
        /*
     data is an object with results property wich is an array of objects:
     {
     id: 650789
image: "https://spoonacular.com/recipeImages/650789-312x231.jpg"
imageType: "jpg"
title: "Mango Guacamole"
     }

        */
        if(data.results.length > 0)
        {
           //document.body.innerHTML = JSON.stringify(data);
        //console.log(Object.keys(data));// Object.keys(data) will get to us the all the keys in the data array it converts the object to an array of keys
         totalData = data.results;//  the results key is an array of objects
         console.log(data)
          // totalData = JSON.stringify(data)
           buildDOM(); //Note: Call this method to genarte dynamic row/box data one by one from the API response whatever we got
        } // end of if
        else
        {
            resultDiv.innerHTML = 'Sorry no such FOOD! Invent it!';
        }
    });
}

//Generate dynamic row/box data one ny one for Recipe list
function buildDOM()
{
    resultDiv.innerHTML= '';
	for (let i = 0; i < totalData.length; i++)

	{
        let img = document.createElement("img");
        let div = document.createElement("div");
        div.setAttribute("class", "col-sm-3")
		div.innerHTML += '<img class="img-fluid" src="'+totalData[i].image+'">';
        div.innerHTML +='<h4> <a href="javascript:void(0);" onclick="fnGoToSourceURL('+ totalData[i].id+');">' + totalData[i].title + '</a>' + '</h4>';
        console.log(totalData[i].id)
        resultDiv.appendChild(div)

	}

}
/*
function fnGoToSourceURL(recipeID)
{
    fetch(configApiUrl + 'recipes/' + recipeID + '/information?apiKey=8492a6d48e6e480d87cf4cff5614e331')
    .then(responseRow => {
        return responseRow.json();       
    })
    .then((dataRow) => {
        window.open(dataRow.sourceUrl, '_blank').focus();
    });
}

