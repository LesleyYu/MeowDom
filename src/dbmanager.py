# from flaskblog.models import User, Post, Item
# from flaskblog import app, db, find_db
import sqlite3

connect_0 = sqlite3.connect("DB0.db")
session_0 = connect_0.cursor()
connect_1 = sqlite3.connect("DB1.db")
session_1 = connect_1.cursor()

def check_username(username):
    cur_session = find_db(username)
    cur_session.execute('select * from user where username = ?', (str(username),))
    cur_user = cur_session.fetchone()
    if cur_user:
        return True
    return False

def check_email(email):
    session_0.execute('select * from user where email = ?', (str(email),))
    email_0 = session_0.fetchone()
    session_1.execute('select * from user where email = ?', (str(email),))
    email_1 = session_1.fetchone()
    if email_0 or email_1:
        return True
    return False

def find_db(username):
    if len(username) % 2 == 0:
        return session_0
    else:
        return session_1

def connect(session):
    if session == session_0:
        return connect_0
    else:
        return connect_1

def insert_user():
    username = str(input("Please enter the username: "))
    while check_username(username):
        username = str(input("This username has been taken. Please enter another one: "))
    email = str(input("Please enter the email: "))
    while check_email(email):
        email = str(input("This email has been taken. Please enter another one: "))
    phone = int(input("Please enter the phone: "))
    address = str(input("Please enter the address: "))
    city = str(input("Please enter the city: "))
    state = str(input("Please enter the state: "))
    zipcode = int(input("Please enter the zipcode: "))
    cur_session = find_db(username)
    cur_session.execute("Insert into user (username, email, phone, address, city, state, zipcode) "
                        "values (?, ?, ?, ?, ?, ?, ?)", (username, email, phone, address, city, state, zipcode))
    connect(cur_session).commit()
    print(f"Added the user {username} successfully! ")


def insert_item(username):
    name = str(input("Please enter the item name: "))
    category = str(input("Please enter the category: "))
    original_price = float(input("Please enter the original price: "))
    selling_price = float(input("Please enter the selling price: "))
    condition = str(input("Please enter the item condition: "))
    brand = str(input("Please enter the brand of the item: "))
    cur_session = find_db(username)
    try:
        cur_session.execute(
            "Insert into item (username, name, category, original_price, selling_price, condition, brand)"
            "values (?, ?, ?, ?, ?, ?, ?)",
            (username, name, category, original_price, selling_price, condition, brand))
        connect(cur_session).commit()
        print(f"Inserted the item {name} for the user {username} successfully")
    except:
        print(f"Failed to insert the item {name} for the user {username}. Please try again!")


def insert_post(username):
    title = str(input("Please enter the title for the post: "))
    content = str(input("Please enter the content for the post: "))
    cur_session = find_db(username)
    try:
        cur_session.execute("Insert into post (username, title, content) values (?,?,?)", (username, title, content))
        connect(cur_session).commit()
        print(f"Posted successfully for the user {username}!")
    except:
        print(f"Failed to post for the use {username}. Please try again!")


def delete_item(cur_user):
    print(f"Please review the items posted by the user {cur_user} and find the id of the item that you want to delete.")
    cur_session = find_db(cur_user)
    cur_session.execute("Select * from item where username = ?", (cur_user, ))
    items = cur_session.fetchall()
    header = []
    for i in cur_session.description:
        header.append(i[0])
    print(header)
    for i in items:
        print(i)
    cur_id = int(input(f"Please enter the item id that you want to delete for {cur_user}: "))
    valid_id = cur_session.execute("Select item_id from item where username=?", (cur_user, )).fetchall()
    valid_id_list = [i[0] for i in valid_id]
    while cur_id not in valid_id_list:
        cur_id = int(input(f'Please enter a valid item id: '))
    try:
        cur_session.execute('Delete From item where item_id = ?', (cur_id,))
        connect(cur_session).commit()
        print(f'Deleted the item with item_id {cur_id} for the user {cur_user} successfully!')
    except:
        print(f"Failed to remove the item with item_id {cur_id} for the user {cur_user}. Please try again later!")


def delete_post(cur_user):
    print(f"Please review the posts of the user {cur_user} and find the id of the item that you want to delete.")
    cur_session = find_db(cur_user)
    cur_session.execute("Select * from post where username = ?", (cur_user,))
    posts = cur_session.fetchall()
    header = []
    for i in cur_session.description:
        header.append(i[0])
    print(header)
    for i in posts:
        print(i)
    cur_id = int(input(f"Please enter the post_id that you want to delete for {cur_user}: "))
    valid_id = cur_session.execute("Select post_id from post where username=?", (cur_user,)).fetchall()
    valid_id_list = [i[0] for i in valid_id]
    while cur_id not in valid_id_list:
        cur_id = int(input(f'Please enter a valid post id: '))
    try:
        cur_session.execute('Delete From post where post_id = ?', (cur_id,))
        connect(cur_session).commit()
        print(f'Deleted the post with post_id {cur_id} for the user {cur_user} successfully!')
    except:
        print(f"Failed to remove the post with post_id {cur_id} for the user {cur_user}. Please try again later!")


def delete_user(cur_user):
    confirm = str(input(f"Please enter 'Y' to confirm that you want to remove the user {cur_user} "
                        f"and all their information from the database: "))
    try:
        if confirm == 'Y':
            cur_session = find_db(cur_user)
            cur_session.execute('Delete From post where username = ?', (cur_user, ))
            cur_session.execute('Delete from item where username = ?', (cur_user, ))
            cur_session.execute('Delete From user where username = ?', (cur_user, ))
            connect(cur_session).commit()
            print(f"Removed the user {cur_user} successfully!")
    except:
        print(f"Failed to remove the user {cur_user} at this time. Please try again later!")

def update_user(username):
    session = find_db(username)
    connection = connect(session)
    #choose update content
    print("Please review the current user information: ")
    session.execute("Select * from user where username = ?", (username,))
    rows = session.fetchall()
    for row in rows:
        print(row)
    print("Which part do you want to update? 1.phone 2.address 3.city 4.state 5.zipcode")
    action = int(input('Please enter a number: '))

    #enter updated value
    if action in (1, 5):
        updated_value = int(input('Enter the updated value: '))
    else:
        updated_value = str(input('Enter the updated value: '))

    action_dic = {1: "phone", 2: "address", 3: "city", 4: "state", 5: "zipcode"}
    try:
        session.execute(f'update user set {action_dic[action]} = ? where username = ?', (updated_value,username,))
        if session.rowcount > 0:
            connection.commit()
            print('Updated successfully')
        else:
            print('No content were updated.')

    except sqlite3.Error as e:
        print(f"An error occurred: {e}") 


def update_item(username):
    session = find_db(username)
    connection = connect(session)
    print(f"Please review the items of the user {username} and find the id of the item that you want to update.")
    session.execute("Select * from item where username = ?", (username,))
    rows = session.fetchall()
    for row in rows:
        print(row)

    item_id = int(input("Please enter the item_id that you want to update: "))
    print("Which content do you want to update: 1.name 2.category 3.original price "
          "4.selling price 5.condition 6.brand'")
    action = int(input("Please enter a number: "))

    if action in (3, 4):
        updated_value = float(input('Enter the updated value: '))
    else:
        updated_value = str(input('Enter the updated value: '))

    action_dic = {1: "name", 2: "category", 3: "original_price", 4: "selling_price", 5: "condition", 6: "brand"}

    try:
        session.execute(f'update item set {action_dic[action]} = ? where username = ? and item_id = ?',
                        (updated_value, username, item_id))
        if session.rowcount > 0:
                connection.commit()
                print('Updated successfully')
        else:
            print('No content were updated.')

    except sqlite3.Error as e:
     print(f"An error occurred: {e}") 
    


def update_post(username):
    session = find_db(username)
    connection = connect(session)
    print(f"Please review the posts of the user {username} and find the id of the post that you want to update.")
    session.execute("Select * from post where username = ?", (username,))
    rows = session.fetchall()
    for row in rows:
        print(row)

    post_id = int(input("Please enter the post_id that you want to update: "))

    print("Which content do you want to update? 1.title 2.content")
    action =int(input('Please enter a number: '))

    #enter updated value
    #print('Enter the updated value:')

    updated_value = str(input('Enter the updated value: '))
  
    action_dic = { 1:"title",2:"content"}

    try:
        session.execute(f'update post set {action_dic[action]} = ? where username = ? and post_id = ?',
                        (updated_value, username, post_id))
        if session.rowcount > 0:
                connection.commit()
                print('Updated successfully')
        else:
            print('No content were updated.')

    except sqlite3.Error as e:
     print(f"An error occurred: {e}") 


def view():
    session_0.execute("select * from user")
    rows = session_0.fetchall()
    print('All users in DATABASE0:')
    for row in rows:
        print(row)

    session_0.execute("select * from post")
    rows = session_0.fetchall()
    print('All posts in DATABASE1:')
    for row in rows:
        print(row)
    
    session_0.execute("select * from item")
    rows = session_0.fetchall()
    print('All items in DATABASE0:')
    for row in rows:
        print(row)
    
    session_1.execute("select * from user")
    rows = session_1.fetchall()
    print('All users in DATABASE1:')
    for row in rows:
        print(row)

    session_1.execute("select * from post")
    rows = session_1.fetchall()
    print('All posts in DATABASE0:')
    for row in rows:
        print(row)
    
    session_1.execute("select * from item")
    rows = session_1.fetchall()
    print('All items in DATABASE1:')
    for row in rows:
        print(row)
    


def insert():
    while True:
        print("Which table do you want to insert into? 1.user, 2. post, 3.item, 4.quit")
        insert_table = int(input("Please enter a number or quit: "))
        while insert_table not in [1, 2, 3, 4]:
            insert_table = int(input("Please enter a valid number (1.user, 2. post, 3.item, 4.quit): "))
        if insert_table == 1:
            insert_user()
        elif insert_table == 2:
            username = str(input("Please enter the username that you want to insert the post for: "))
            if not check_username(username):
                print("Please create an account for this user first!")
            else:
                insert_post(username)
        elif insert_table == 3:
            username = str(input("Please enter the username that we want to insert the item for: "))
            if not check_username(username):
                print("Please create an account for this user first!")
            else:
                insert_item(username)
        else:
            break
    pass


def delete():
    cur_user = str(input("Please enter the username that you want to delete for: "))
    while not check_username(cur_user):
        cur_user = str(input("We cannot find this user in the database. Please find another one: "))
    while True:
        print("Which cammand do you wan to execute?")
        print("1. Remove the user and all of their infomation from the database.")
        print("2. Delete a post for this user.")
        print("3. Delete an item for this user.")
        print("4. Quit")
        cur_action = int(input("Please enter the number of execution: "))
        while cur_action not in [1, 2, 3, 4]:
            cur_action = int(input("Please enter a valid number of execution: "))
        if cur_action == 1:
            delete_user(cur_user)
        elif cur_action == 2:
            delete_post(cur_user)
        elif cur_action == 3:
            delete_item(cur_user)
        else:
            break
    pass


def update():
    cur_user = str(input("Please enter the username that you want to update for: "))
    cur_session = find_db(cur_user)
    while not check_username(cur_user):
        cur_user = str(input("We cannot find this user in the database. Please find another one: "))
    print("Which table you want to update? 1. user 2. post, 3. item, 4.Quit")

    while True:
        cur_action = int(input("Please enter the table you want to update(1. user 2. post, 3. item, 4.Quit): "))
        while cur_action not in [1, 2, 3, 4]:
            cur_action = int(input("Please enter a valid number for the table: "))
        if cur_action == 1:
            update_user(cur_user)
        elif cur_action == 2:
            update_post(cur_user)
        elif cur_action == 3:
            update_item(cur_user)
        else:
            break
 


print("Welcome to Meowdom database management system! ")
while True:
    print("Which command do you want to execute? 1. View 2. Insert, 3. Delete, 4. Update, 5.Quit")
    action = int(input("Please enter the number of the command that you want to execute: "))
    if int(action) not in [1, 2, 3, 4, 5]:
        print("Please enter a valid number: ")
    elif action == 1:
        view()
    elif action == 2:
        insert()
    elif action == 3:
        delete()
    elif action == 4:
        update()
    else:  # action == 5
        break
