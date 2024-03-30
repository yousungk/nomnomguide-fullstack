#!/Library/Frameworks/Python.framework/Versions/3.12/bin/python3

from booking_scraper import scrape_booking
import sqlite3
import logging
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
filename = os.path.join(dir_path, 'booking_scraper.log')

# Create logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

file_handler = logging.FileHandler(filename)
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)

# Connect to database and get list of all restaurants
db = sqlite3.connect("booking_data.db")
cursor = db.cursor()
cursor.execute("SELECT DISTINCT restaurant_name FROM restaurants")
restaurants = cursor.fetchall()
db.close()

# Loop through restaurants and scrape booking data
if __name__ == '__main__':
    for rest in restaurants:
        scrape_booking(rest)
    logger.info('Scraping complete')








