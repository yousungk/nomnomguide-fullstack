# NOMNOMGUIDE - the offical booking helper for NYC and Philadelphia restaurants

Finding great restaurants in a new city can be challenging, and securing a reservation can be even harder. Created by a foodie for fellow foodies, NomNomGuide offers booking statistics on a curated list of highly rated restaurants that will help you determine the best day to book a reservation for maximal chance of securing a table.

For each restaurant, NomNomGuide calculates
- average daily number of bookings
- monthly booking counts
- on average, how many days in advance people make reservations
- days of week on which most bookings are made

Booking data is scraped on a daily basis from Google Reservations, using Python Selenium.

## Running the Project Locally

### How to run application
1. Navigate to the `website` folder:
   ```bash
   cd website
   ```
2. Install all required modules:
   ```bash
   npm install
   ```
3. Start the application
   ```bash
   npm run dev
   ```

## Application Features
- List of recommended restaurants in NYC and Philadelphia
- Booking statistics and trends on restaurants

## Architecture
- Data hosted on Vercel PostgreSQL
- Backend: Next.js
- Frontend: React.js
- Data scraping: Python Selenium
- Data analysis: SQL, Python

## Website Sample
<img width="1408" alt="Screen Shot 2024-06-22 at 9 34 32 PM" src="https://github.com/yousungk/nomnomguide-fullstack/assets/139073954/050e58b1-9319-40f0-827e-bea0615b1577">
<img width="1404" alt="Screen Shot 2024-06-22 at 9 34 45 PM" src="https://github.com/yousungk/nomnomguide-fullstack/assets/139073954/bf47b8dd-26f0-4abb-a5a4-77217cd184ca">
<img width="1411" alt="Screen Shot 2024-06-22 at 9 34 56 PM" src="https://github.com/yousungk/nomnomguide-fullstack/assets/139073954/3004aa41-0958-48ee-8443-b2199dd4eb1e">
<img width="1406" alt="Screen Shot 2024-06-22 at 9 35 04 PM" src="https://github.com/yousungk/nomnomguide-fullstack/assets/139073954/c2dc7b64-b4d6-4001-9d2f-2283b62fa713">


