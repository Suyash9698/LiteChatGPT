# LiteChatGPT
chatgpt using mern stack
# Features
Login Page

The Login Page serves as the entry point for users.
It includes email and password inputs for authentication.
User authentication is connected to MongoDB, where each email ID should be unique.
Users can choose their role (User or Admin) during registration.
The system checks if the provided email already exists in the database before allowing login.
Successful login redirects users to the Chat Area.
Register Page
The Register Page allows users to sign up.
It collects user information, including:
Name
Role (User or Admin)
Email
Password
Users must select their role during registration.
Email addresses are validated to be unique against existing entries in the database.
Similar to the Login Page, registration data is stored in MongoDB.
After successful registration, users can log in.
Chat Area
The Chat Area is where users interact with the chatbot.
Key features in this area include:
Chat History: All chat interactions are saved in the database for future reference.
Logout Option: Users can log out.
Clear Conversation: Users can erase the entire chat history.
Dropdown Menu for Questions: Questions are fetched from the database and displayed in a dropdown menu.
Question-Answer Interaction: Selecting a question from the dropdown menu displays the chatbot's answer.
History Button: Users can access previously asked questions and answers in a new page or popup window.
Admin Page
The Admin Page is exclusively for administrators.
Admins have the following capabilities:
Manage Questions: Admins can add new questions to the database, edit existing questions, or update their answers.
Profile Page: In the navigation bar, admins can change their user details, such as name and email.
Usage
To use Chat GPT Lite:

Register for an account if you are a new user.
Log in with your credentials.
Access the chat area to interact with the chatbot.
Admins can access the admin page to manage questions and update their profiles.


