#!/usr/bin/env python
# coding: utf-8

# In[1]:


from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import ElementNotInteractableException
from selenium.webdriver.support import expected_conditions as EC
import time
import datetime
import sqlite3


# In[ ]:


from selenium.webdriver.support.wait import WebDriverWait
from selenium.common import ElementClickInterceptedException


# wrap code into function
def scrape_booking(query):


    # In[2]:


    # set up driver
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_experimental_option("detach", True)
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    driver = webdriver.Chrome(options=chrome_options)

    # input variables
    # query = "Little Nonna's"

    # connect to database
    db = sqlite3.connect("booking_data.db")
    cursor = db.cursor()


    # In[5]:


    # get restaurant name and address
    driver.get('https://www.google.com/?hl=en')
    driver.find_element(By.NAME, "q").send_keys(query, Keys.ENTER)

    time.sleep(2)

    try:
        restaurant_name = driver.find_element(By.CSS_SELECTOR, f"div[data-attrid='title']").get_attribute("innerText")
        print(restaurant_name)
    except NoSuchElementException:
        restaurant_name = driver.find_element(By.CSS_SELECTOR, f"h2[data-attrid='title']").get_attribute("innerText")
        print(restaurant_name)
    except:
        print("Could not find restaurant name")

    try:
        restaurant_address = driver.find_element(By.CSS_SELECTOR, f"div[data-attrid='kc:/location/location:address']").get_attribute("innerText")
    except NoSuchElementException:
        restaurant_address = driver.find_element(By.CSS_SELECTOR, f"h2[data-attrid='kc:/location/location:address']").get_attribute("innerText")


    restaurant_address = restaurant_address.replace("Address: ", "")
    print(restaurant_address)

    # navigate to reservation page
    try:
        reserve_button = driver.find_element(By.PARTIAL_LINK_TEXT, "RESERVE A TABLE")
    except NoSuchElementException:
        reserve_button = driver.find_element(By.PARTIAL_LINK_TEXT, "Reserve a table")
    except:
        print("No reservation button available in Google")
        exit()

    driver.execute_script("arguments[0].click();", reserve_button)


    # In[7]:


    # find all available booking dates
    time.sleep(2)

    # find button to date button to open calendar
    driver.find_element(By.CSS_SELECTOR, f"div[aria-label*=' reservation date'] div").click()
    time.sleep(3)

    # list to store all available days for booking
    all_days = []

    try:
        while True:
            # find all available dates button on the given month on calendar
            days = driver.find_elements(By.CSS_SELECTOR, f"div[aria-label*='Monday'][role='button'][aria-disabled='false'],div[aria-label*='Tuesday'][role='button'][aria-disabled='false'], div[aria-label*='Wednesday'][role='button'][aria-disabled='false'], div[aria-label*='Thursday'][role='button'][aria-disabled='false'], div[aria-label*='Friday'][role='button'][aria-disabled='false'], div[aria-label*='Saturday'][role='button'][aria-disabled='false'], div[aria-label*='Sunday'][role='button'][aria-disabled='false']")

            # break if no available dates on the month
            if len(days) == 0:
                break

            # for each of the available days on calendar
            for day in days:
                # save available days into all_days
                all_days.append(day.get_attribute("aria-label"))
                print(day.get_attribute("aria-label"))

            # move onto the next month
            driver.find_element(By.CSS_SELECTOR, f"[aria-label*='next month']").click()
            time.sleep(3)
    except:
        print("Reached end of available bookings")


    # In[8]:


    # for all days available for booking, get all booking times between 5-9PM
    # for each time, save data on whether available or not

    # 0. navigate to main booking page
    driver.get('https://www.google.com/?hl=en')
    driver.find_element(By.NAME, "q").send_keys(query, Keys.ENTER)

    time.sleep(3)

    try:
        reserve_button = driver.find_element(By.PARTIAL_LINK_TEXT, "RESERVE A TABLE")
        driver.execute_script("arguments[0].click();", reserve_button)
    except NoSuchElementException:
        reserve_button = driver.find_element(By.PARTIAL_LINK_TEXT, "Reserve a table")
        driver.execute_script("arguments[0].click();", reserve_button)
    except ElementClickInterceptedException:
        WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.PARTIAL_LINK_TEXT, "Reserve a table"))).click()
    except:
        print("No reservation button available in Google")
        driver.quit()

    time.sleep(3)

    # get scraping date and time
    scraped_date = datetime.datetime.now().strftime('%Y-%m-%d')
    scraped_time = datetime.datetime.now().strftime('%H:%M:%S')

    # go through all available booking dates
    prev_month = all_days[0].split()[1]
    rows = []
    for day in all_days:
        print(day)
        attempts = 0
        scrape_success = False
        while (attempts < 3 and not scrape_success):
            try:
                # 1. open calendar
                driver.find_element(By.CSS_SELECTOR, f"div[aria-label*=' reservation date'] div").click()

                # 2. if month changed, move onto next calendar
                curr_month = day.split()[1]
                booking_date = day.split(", ")[1]
                if prev_month != curr_month:
                    button_attempts = 0
                    button_success = False
                    while button_attempts < 3:
                        try:
                            driver.find_element(By.CSS_SELECTOR, f"[aria-label*='next month']").click()
                            button_success = True
                            break
                        except:
                            button_attempts += 1
                    if not button_success:
                        print("Could not move onto the next month")
                        prev_month = curr_month
                        break

                # 3. find day button on calendar
                success = False
                attempts = 0
                while attempts < 5:
                    try:
                        next_day = driver.find_element(By.CSS_SELECTOR, f"div[role='button'][aria-label*='{day}']")
                        next_day.click()
                        success = True
                        time.sleep(3)
                        break
                    except StaleElementReferenceException as error:
                        attempts += 1
                    except NoSuchElementException as error:
                        attempts += 1
                    except ElementNotInteractableException:
                        break
                if not success:
                    print("Could not fetch booking times for this day")
                    break

                # check if there are no available bookings on this day
                # because Google displays future dates reservation times button if none available today
                try:
                    driver.find_element(By.XPATH, "//*[contains(text(), 'are no tables available')]")
                    print("There are no available booking times today")
                    if (restaurant_name, scraped_date, scraped_time, booking_date, "N/A", "None Available") not in rows:
                        rows.append((restaurant_name, scraped_date, scraped_time, booking_date, "N/A", "None Available"))
                    break
                except NoSuchElementException:
                    print("There are available booking time today")

                # 4. Get dinner booking times (5 - 9 PM)
                # click on time button
                times = ["17:00", "18:00", "19:00", "20:00", "21:00"]
                time_button_child = driver.find_element(By.CSS_SELECTOR, f"ul[role='listbox'][aria-label*='reservation time']")
                time_button_parent = time_button_child.find_element(By.XPATH, "parent::div").find_element(By.XPATH, "parent::div")

                # click hourly increment from 5 to 9PM
                for time_element in times:
                    # click on time list button
                    time_button_parent.click()

                    # click on individual times
                    element = driver.find_element(By.CSS_SELECTOR, f"li[data-value*='{time_element}']")
                    print(element.get_attribute("innerHTML"))
                    time.sleep(1)
                    driver.execute_script("arguments[0].click();", driver.find_element(By.CSS_SELECTOR, f"li[data-value*='{time_element}']"))
                    print("clicked")
                    time.sleep(1)

                    # 5. Go through available booking times
                    booking_times = driver.find_elements(By.CSS_SELECTOR,
                                                         f"div[data-is-touch-wrapper*='true']")
                    print(len(booking_times))

                    if booking_times:
                        for booking in booking_times:
                            # booking time
                            booking_time = booking.get_attribute("innerText").replace("\u202f", " ")
                            if booking_time == "Continue" or booking_time == "":
                                continue
                            print(booking.get_attribute("innerText"))
                            # booking status
                            booking_status = ""
                            booking = booking.find_element(By.TAG_NAME, "button")
                            if booking.get_attribute("disabled"):
                                booking_status = "Unavailable"
                                print("Unavailable")
                            else:
                                booking_status = "Available"
                                print("Available")
                            # append data to rows (dont add duplicates)
                            if (restaurant_name, scraped_date, scraped_time, booking_date, booking_time, booking_status) not in rows:
                                rows.append((restaurant_name, scraped_date, scraped_time, booking_date, booking_time, booking_status))
                prev_month = curr_month
                scrape_success = True
                time.sleep(2)
            except StaleElementReferenceException:
                attempts += 1
        continue


    #

    # In[3]:


    # insert data into database
    cursor.executemany(
        "INSERT INTO booking_data (restaurant_name, scraped_date, scraped_time, booking_date, booking_time, booking_status) VALUES (?, ?, ?, ?, ?, ?)", rows)

    db.commit()

    db.close()

    # close connections
    driver.quit()


    # In[ ]:


    # code to convert file into python file (type in terminal)
    # jupyter nbconvert --to python booking_scraper.ipynb

