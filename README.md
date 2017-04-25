# Weather_Forecast_Application
This is a simple web application that uses the wunderground API to return a 3-day forecast

REQUIREMENTS:<br>
1) I built this app using <a href="https://www.python.org/downloads/release/python-352/">Python 3.5.2</a> However, any Python 3.0 distribution below 3.6 should work well<br>
2) Required python libraries: flask, requests_cache, requests. After install python, run the following commands on command prompt to install these libraries.<br>
```
pip install Flask
pip install requests
pip install requests_cache
```
<br>
<p>
Steps to use this application:<br>
1) Sign Up for <a href="https://www.wunderground.com/weather/api/d/docs">the wunderground API</a> and generate an API key. <br>
2) Download this repository as a zip or clone this repository. Modify the config.py to include your API key generated above.<br>
3) Navigate to the unzipped project directory in your command prompt and run the weather_app.py file using the following command:<br>
```
python weather_app.py
```
4) Launch the web application in your browser. The default URL is "localhost:5000" <br>
5) Enter the zipcode of any place to see the three day forecast <br>
</p>
