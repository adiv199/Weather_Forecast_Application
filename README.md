# Weather_Forecast_Application
This is a simple web application that uses the wunderground API to return a 3-day forecast

<b>REQUIREMENTS:</b><br>
1) I built this app using <a href="https://www.python.org/downloads/release/python-352/">Python 3.5.2.</a> However, any Python 3.0 distribution below 3.6 should work well.<br>
2) Required python libraries: flask, requests_cache, requests. After installing python, run the following commands on command prompt to install these libraries.<br>
```
pip install Flask
pip install requests
pip install requests_cache
```
<br>
3) Any web browser and an active internet connection

<b>STEPS TO USE THIS APPLICATION:</b><br>
1) Sign Up for <a href="https://www.wunderground.com/weather/api/d/docs">the wunderground API</a> and generate an API key. Please note that this application will throw an error saying "This key does not exist" if the API key is not provided <br>
2) Download this repository as a zip or clone this repository. Modify the config.py file to include your API key generated in Step 1.<br>
3) Navigate to the unzipped project directory in your command prompt and run the weather_app.py file using the following command:<br>
```
python weather_app.py
```
4) Launch the web application in your browser if the above command runs successfully and shows the following in your command prompt:
 <i>* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit).</i> <br>
 The default URL is "http://localhost:5000" <br>
5) Enter the zipcode of any place to see the three day forecast. <br>

