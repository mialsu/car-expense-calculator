# Yearly/Monthly car running expense calculator

This app uses Finnish car tax categories to calculate running expenses of a vehicle based on submitted form parameters (CO2 emissions, registration year etc.). Backend is made with Django and frontend with React.

## Usage

- Requires React and Python
- Activate Python virtual environment in project directory.
- pip install -r requirements.txt
- cd backend
- python manage.py makemigrations
- python manage.py migrate
- load data to database with next commands in backend directory:
    - python manage.py loadcsv data/mass-tax.csv
    - python manage.py loadcsv data/nedc-tax.csv
    - python manage.py loadcsv data/wltp-tax.csv
    - python manage.py makemigrations
    - python manage.py migrate
- start django server with python manage.py runserver
- open new terminal window in project directory
- cd front end -> npm start to start frontend

