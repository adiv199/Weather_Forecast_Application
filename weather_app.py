import time
import requests
import requests_cache

from logging import FileHandler, WARNING
from flask import Flask, render_template, request, jsonify

file_handler = FileHandler("error_log.txt")
file_handler.setLevel(WARNING)

app = Flask(__name__)
app.config.from_object('config')
app.logger.addHandler(file_handler)

requests_cache.install_cache('weather_cache', backend='sqlite', expire_after=3600)

api_key = app.config["API_KEY"]

@app.route('/', methods=['GET','POST'])
def home():
    if request.method == 'POST':
        zipcode = request.form.get('zipcode')
        temp_type = request.form.get('temp_type')
        print(zipcode)
        print(temp_type)
        url = "http://api.wunderground.com/api/{0}/forecast/q/{1}.json".format(api_key,zipcode);
        print(url)
        now = time.ctime(int(time.time()))
        response = requests.get(url)
        print ("Time: {0} / Used Cache: {1}".format(now, response.from_cache))
        all_forecast_data = response.json() 
        return jsonify(get_weather_data(all_forecast_data,temp_type))
            
    return render_template('index.html')


def get_weather_data(forecast_data,temp_type):
    if 'error' in forecast_data['response']:
        error_dict = {}
        error_type = forecast_data["response"]["error"]["type"]
        error_desc = forecast_data["response"]["error"]["description"]
        error_dict[error_type]=error_desc
        return error_dict
        
    else:
        three_day_forecast = forecast_data['forecast']['simpleforecast']['forecastday'] 
        three_day_dict = {}
        for i in range(0,4):
            if temp_type=="cel":
                high = "{0} C".format(three_day_forecast[i]['high']['celsius'])
                low = "{0} C".format(three_day_forecast[i]['low']['celsius'])
                wind = "{0} kph".format(three_day_forecast[i]['maxwind']['kph'])

            else:
                high = "{0} F".format(three_day_forecast[i]['high']['fahrenheit'])
                low = "{0} F".format(three_day_forecast[i]['low']['fahrenheit'])
                wind ="{0} mph".format(three_day_forecast[i]['maxwind']['mph'])
        
            imgurl = three_day_forecast[i]['icon_url']
            date_i = three_day_forecast[i]['date']
            the_date = "{0}-{1}-{2} {3}".format(date_i['month'],date_i['day'],date_i['year'],date_i['weekday_short'])
            all_list = list([high,low,wind,imgurl])
            three_day_dict[the_date]=all_list

        return three_day_dict    

            
if __name__ == '__main__':
    app.run(debug=True)
