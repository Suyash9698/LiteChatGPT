# LiteChatGPT: A MERN Stack Chat Application

## Features

### 1. Login Page
- Serve as the entry point for users.
- Authenticate users with email and password inputs.
- Unique email IDs stored in MongoDB.
- Role selection (User or Admin) during registration.
- Email validation to ensure uniqueness.
- Redirect to Chat Area upon successful login.

### 2. Register Page
- Sign up for new users.
- Collect user information: Name, Role, Email, Password.
- Role selection required during registration.
- Unique email validation against existing entries.
- Data stored in MongoDB.
- Access granted to login upon successful registration.

### 3. Chat Area
- Interact with the chatbot.
- Save chat history in the database.
- Logout option available.
- Clear entire chat history.
- Dropdown menu for accessing questions.
- Question-answer interaction with the chatbot.
- Access previous questions and answers.

### 4. Admin Page
- Exclusive access for administrators.

## How to Run

To run LiteChatGPT on your local machine using Visual Studio Code (VS Code), follow these steps:

1. **Clone the Repository**: 
   - Open VS Code.
   - Go to the View menu and select Terminal to open the integrated terminal.
   - Clone the LiteChatGPT repository using the following command:
     ```
     git clone https://github.com/your-username/LiteChatGPT.git
     ```
   - Navigate to the project directory:
     ```
     cd LiteChatGPT
     ```

2. **Install Dependencies**:
   - Run the following command to install the necessary dependencies:
     ```
     npm install
     ```

3. **Start the Application**:
   - After installing dependencies, start the application using the following command:
     ```
     npm start
     ```

4. **Access the Application**:
   - Once the server is running, open a web browser and navigate to http://localhost:3000 to access the LiteChatGPT application.

5. **Usage**:
   - Register for an account if you are a new user.
   - Log in with your credentials.
   - Access the chat area to interact with the chatbot.
   - Admins can access the admin page to manage questions and update their profiles.

