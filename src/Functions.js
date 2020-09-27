import {NetInfo,AsyncStorage,Alert,ToastAndroid} from 'react-native';
var AppDesc=require("./../app.json");

const axios = require('axios');

class Functions {
	localStorage=AsyncStorage;
	async getJSONFromURL(url,data,callback) //Internal API
	{		
		console.log(url,data);
		var requestInfo={
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(data),
		  timeout:0
		};

		try {

			var response;
			setTimeout(()=>{
				if(response==undefined)
				{callback("Error",null);}
			}, 5000);

			response = await fetch(url,requestInfo);
			var responseJson = await response.json();
			

			if(responseJson.Error!==undefined)
			{callback(responseJson.Error,null);}
			else{callback(null,responseJson);}
		} 
		catch (error) {
			console.log(error);
			callback("Error",null);
		}
	}
    async getDataFromStorage(name,callback)
    {
    	try {
    		callback(null,JSON.parse(await this.localStorage.getItem(name)));
		} 
		catch ({ error }) {
			callback(error,null);
		}
    }
    async getHTMLFromURL(url,callback)  //Exnternal API
	{
		// NetInfo.isConnected.fetch().then(isConnected => {
		//   console.log('First, is ' + (isConnected ? 'online' : 'offline'));
		// });
		axios.get(url).
		then(function (response) {
			callback(null,response.data);
		})
		.catch(function (error) {
			console.log("Error getHTMLFromURL", error);
		});	
	}
	async streamDataUser(){
		
	}
    setDataToStorage(name,data)
    {this.localStorage.setItem(name, JSON.stringify(data));}
}
export default Functions;