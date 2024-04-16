import sqlite3
import os
import pandas as pd

df_from_excel = pd.read_excel('extended_items01.xlsx')

# Convert the DataFrame to a list of tuples, omitting the index column
items = [tuple(x) for x in df_from_excel.to_numpy()]

# Preview the first 10 tuples to ensure correctness

# Define the path for the new SQLite file
sqlite_file = '//Users/shengkexin_personal/Desktop/project_0413/flask_blog0413/items_database.db'

# Remove the SQLite file if it already exists
if os.path.isfile(sqlite_file):
    os.remove(sqlite_file)

# Connect to the SQLite database
conn = sqlite3.connect(sqlite_file)
cursor = conn.cursor()

# Create the 'item' table in the SQLite database
item_table_creation_query = """
CREATE TABLE "item" (
    "item_id"	INTEGER,
    "username"	VARCHAR(200),
    "name"	VARCHAR(200) NOT NULL,
    "category"	VARCHAR(200) NOT NULL,
    "original_price"	REAL NOT NULL,
    "selling_price"	REAL NOT NULL,
    "condition"	VARCHAR(200) NOT NULL,
    "brand"	VARCHAR(200) NOT NULL,
    PRIMARY KEY("item_id" AUTOINCREMENT)
);
"""
cursor.execute(item_table_creation_query)

# Create a 'user' table to satisfy the foreign key constraint (Simplified)
user_table_creation_query = """
CREATE TABLE "user" (
    "username"	VARCHAR(200) PRIMARY KEY
);
"""
cursor.execute(user_table_creation_query)

# Define 10 items with odd length usernames to insert into the database
# items = [
#     (None, 'Alice', 'iPhone 12', 'Smartphone', 699.0, 599.0, 'new', 'apple'),
#     (None, 'Bob', 'Pixel 5', 'Smartphone', 699.0, 599.0, 'used', 'google'),
#     (None, 'Charlie', 'Galaxy S21', 'Smartphone', 799.0, 699.0, 'new', 'samsung'),
#     (None, 'Dave', 'OnePlus 9', 'Smartphone', 729.0, 629.0, 'used', 'oneplus'),
#     (None, 'Eve', 'XPS 13', 'Laptop', 999.0, 899.0, 'new', 'dell'),
#     (None, 'Frank', 'Surface Pro', 'Tablet', 899.0, 799.0, 'used', 'microsoft'),
#     (None, 'Grace', 'Macbook Pro', 'Laptop', 1299.0, 1199.0, 'new', 'apple'),
#     (None, 'Heidi', 'ThinkPad X1', 'Laptop', 13992.0, 1299.0, 'used', 'lenovo'),
#     (None, 'Ivy', 'Envy 15', 'Laptop', 1099.0, 993.0, 'new', 'hp'),
#     (None, 'Justin', 'Spectre x360', 'Laptop', 1488.0, 1399.0, 'used', 'hp')
# ]

# Adjusting usernames to have odd lengths
for i, item in enumerate(items):
    username = item[1]
    # If the username length is even, add an 'a' to make it odd
    if len(username) % 2 == 0:
        username += 'a'
    # Replace the item with the new username
    items[i] = (item[0], username) + item[2:]

# Insert the users and items into their respective tables
for item in items:
    # Insert user first to satisfy foreign key constraint
    cursor.execute("INSERT INTO user (username) VALUES (?)", (item[1],))
    # Insert item
    cursor.execute("INSERT INTO item (item_id, username, name, category, original_price, selling_price, condition, brand) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", item)

# Committing the changes and closing the connection
conn.commit()
conn.close()

# Return the path to the SQLite file
sqlite_file
