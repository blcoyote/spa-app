from datetime import datetime
import glob
import time
import requests
import logging
import os
from dotenv import load_dotenv

load_dotenv()

PROBE_KEY = os.getenv("PROBE_KEY")
from model import SpaModel

base_dir = "/sys/bus/w1/devices/"
service_url = "http://192.168.0.20:7000/spa?Key={}".format(PROBE_KEY)

## air temp, sensor w. added rubber band :)
sensors = {"air": "28-3ce1d443021c", "water": "28-3ce1d44386e6"}
headers = {"Content-type": "application/json", "Accept": "application/json"}

logging.basicConfig(
    filename="logfile.txt",
    filemode="a",
    format="%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s",
    datefmt="%H:%M:%S",
    level=logging.INFO,
)

logging.info("Running temp script")


def read_temp_raw():
    f = open(device_file, "r")
    lines = f.readlines()
    f.close()
    return lines


def read_temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != "YES":
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find("t=")
    if equals_pos != -1:
        temp_string = lines[1][equals_pos + 2 :]
        temp_c = float(temp_string) / 1000.0
        return temp_c


while True:
    error = False
    errorMessage = ""
    airTemp = None
    waterTemp = None

    try:
        device_folder = glob.glob(base_dir + sensors["air"])
        device_file = device_folder[0] + "/w1_slave"
        airTemp = read_temp()
        print("Air temp:", airTemp)
    except Exception as e:
        print("Air temp: {}".format(str(e)))
        logging.error("Air temp: {}".format(str(e)))

    try:
        device_folder = glob.glob(base_dir + sensors["water"])
        device_file = device_folder[0] + "/w1_slave"
        waterTemp = read_temp()
        print("Water temp", waterTemp)
    except Exception as e:
        print("Water temp: {}".format(e))
        logging.error("Water temp: {}".format(str(e)))

    try:
        data = SpaModel(
            temp_water=waterTemp,
            temp_air=airTemp,
            error_message=errorMessage,
            timestamp=datetime.now(),
        )

        response = requests.post(
            url=service_url, headers=headers, data=data.model_dump_json()
        )

        print("Response:", response)

    except Exception as e:
        print("Error sending data to server: {}".format(str(e)))
        logging.error("Error sending data to server: {}".format(str(e)))

    print("waiting 5 minutes...")
    time.sleep(5 * 60)
