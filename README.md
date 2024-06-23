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
