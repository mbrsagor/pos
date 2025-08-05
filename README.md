# POS = Point of sales
> The web application is simple Point of sales and inventory management system web-app.
 #### Features:
 Configuration:
 -  Inventory Categories
 -  Inventory Sub Category
 -  Inventory Tag
 
 Inventory Information:
 - Inventory name 
 - Inventory short description  
 - Inventory full description  
 - Inventory category selection  
 - Inventory picture 
 - Inventory current stock
 - Inventory purchase price
 - Inventory sales price
 - Inventory promotional price
 
 POS:
 - Product Sales
 - List of sale records
 - Invoice 

## Setup & dependencies

- Python 3.8.5
- Django 3.1.2
- Postgres 12.5

The steps below guide you through installation on macOS. The process for Linux should be quite similar. While it's also possible to develop on Windows, those steps aren't covered here. If you've previously worked with Django on Windows, you should be able to get set up without much trouble.


### Create Database

Create the database by running the following commands in a psql shell. If you're using
Postgres.app, click the Postgres.app icon in your toolbar and select "Open psql".

```
create database "inventory";
create user "macair";
ALTER ROLE "inventory" WITH PASSWORD 'inventory';
ALTER USER macair CREATEDB;
CREATE EXTENSION postgis;
```


### Setup Django Server (Mac)

We're using Python instead of python2.x. If you don't have Python installed,
install [Homebrew](http://brew.sh), then…

```
brew install python3.8
```

Assuming you've cloned the repository, open Terminal and `cd ~/your/path/to/inventory`.

Create a Python virtual environment:

```bash
virtualenv venv --python=python3.8
```

Activate it:

```bash
source env/bin/activate
```

Install the Python dependencies, which include Django and other libraries.

```
pip3 install -r requirements.txt
```


## Run server locally

```
./manage.py migrate
./manage.py runserver
```

###### If PSQL error raise please follow the command:
```pip install psycopg2-binary```
