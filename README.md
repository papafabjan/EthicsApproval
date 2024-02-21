# 2023-ethics-g4

Project Name: Web application for Reviewing Ethics Matters

Project Description: A web application for our costumer, developed with the purpose of making the review process for the user easier and more understandable as well as making the approval process more straightforward and easy
for the administrators and reviewers. The developed app allows administrators to have much more control over the process while also leaving the ability for the admins to change parts of the process easily and clearly with the use of a simple UI. It also provides a better experience to any user of the system either a student/user or a teacher/reviewer/admin by providing a clear UI for everything that needs to be done in an ethics application
review.

Installation/Deployment processes and guidelines
Software required to run the web app:
Any browser, preferably Google Chrome
Node.js
React.js
Visual Studio Code 
PostgreSQL
Detailed steps to install/build/deploy the application from the source code:
The repository should be cloned to the desired directory. For the application to run, one needs to install the dependencies needed for both the React app and the API. Open the repository in Visual Studio Code, open two terminals, and navigate to the client directory by typing `cd ethics-g4-app` and then `cd client`, finally `npm i`, and for the API, `cd ethics-g4-app` and then `cd api`, finally `npm i`. At this stage, the app can be run, but nothing can be saved/retained which will result in crashes. To set up the database the following needs to be done:
During the installation of PostgreSQL, make sure to install pgAdmin to assist in visualization, set-up, and more. With pgAdmin installed and `psql` command being recognized in the VS Code terminal you are ready to complete the setup. First, open pgAdmin and create a new database named “ethics”. Next, open a new terminal in VS Code and run the command `psql -U postgres` and then type the password you gave during the setup process of PostgreSQL to create the root user with the following commands one by one:
CREATE USER root WITH PASSWORD 'rootpassword';
GRANT ALL PRIVILEGES ON DATABASE ethics to root;
ALTER AUTHORIZATION ON DATABASE::[ethics] TO [root];
\q
Then, use the command `psql -U root -d ethics` to log-in the database.
Now you are connected to the database. Create all the necessary tables by copying and pasting the entire SQL file in our API folder into the console where you logged in to Postgres (paste with right click). Run the app by typing `npm run dev` in both terminals (first in api and then in client). Now you can just hit ‘O’ (in the client terminal) to open the website on your browser directly.
