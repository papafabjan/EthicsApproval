
# ETHICS WEB APPLICATION

This is a web application developed for our costumer, developed with the purpose of making the review process for the user easier and more understandable as well as making the approval process more straightforward and easy for the administrators and reviewers. The developed app allows administrators to have much more control over the process while also leaving the ability for the admins to change parts of the process easily and clearly with the use of a simple UI. It also provides a better experience to any user of the system either a student/user or a teacher/reviewer/admin by providing a clear UI for everything that needs to be done in an ethics application review.

## ⚙️ Installation/Deployment process 

### Software required to run the web app:
- Any browser, preferably Google Chrome
- Preferably [Visual Studio Code](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org/en/about/), [React.js](https://react.dev/learn/installation)
- [PostgreSQL](https://www.postgresql.org/download/)

*Below you will find a guided process in order to succesfully deploy the Web Application.*

---
### 👉Step 1:
- ✅ The repository should be cloned to the desired directory.

### 👉Step 2:
- ✅ For the application to run, one needs to install the dependencies needed for both the React app and the API.
		- **Open the repository in Visual Studio Code, open two terminals, and navigate to the client directory by typing `cd ethics-g4-app` and then `cd client`, finally `npm i`, and for the API, `cd ethics-g4-app` and then `cd api`, finally `npm i`.**

*>❗️ Note: At this stage, the app can be run, but nothing can be saved/retained which will result in crashes.*  **To set up the database the following needs to be done:**

### 👉Step 3:
- ✅ At the beginning, you need to write the password you provided for the postgres to access the postgres. After you finish all the other commands, write the password you gave to the user root. These are all the commands that need to be implemented in the terminal:
```bash
psql -U postgres;
CREATE DATABASE ethics;
CREATE USER root WITH PASSWORD 'rootpassword';
GRANT ALL PRIVILEGES ON DATABASE ethics to root;
ALTER AUTHORIZATION ON DATABASE::[ethics] TO [root];
USE ethics;
\q
psql -U root -d ethics
```
***Then, use the command:***
```bash
psql -U root -d ethics
```
*To log-in the database type* **the password:**
 ```bash
'rootpassword'
```
**Now you are connected to the database. Create all the necessary tables by copying and pasting the entire SQL file in our API folder into the console where you logged in to Postgres (paste with right click).** 

*Run the app by typing `npm run dev` in both terminals (first in api and then in client). Now you can just hit ‘O’ (in the client terminal) to open the website on your browser directly.*


## Support
**For any questions or support needed regarding this project feel free to contact us through our emails listed below!**

- mmandravelis@york.citycollege.eu
- pkaralis@york.citycollege.eu
- fpapa@york.citycollege.eu
- bpireva@york.citycollege.eu
- mpolyzoidis@york.citycollege.eu



##   Authors and acknowledgment

This project was made possible by the team effort between **Fabjan Papa, Panagiotis Karalis, Markos Darlas-Mandravelis, Marios Polyzoidis and Bind Pireva.**

The idea for the Ethics Web Application was introduced to us by **Mr. Dranidis and Dr. Dimopoulos.**



## License

[MIT](https://choosealicense.com/licenses/mit/)

