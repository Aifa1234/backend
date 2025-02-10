 

---

# *Node.js Backend with MongoDB Atlas*  

This is a Node.js-based backend using *MongoDB Atlas* for database storage. It provides authentication and train-related APIs. The project follows a modular structure with index.js as the entry point.  

## *Features*  
- User authentication (Signup & Login)  
- Train-related operations (/api/train, /api/add)  
- Role-based access control  
- MongoDB Atlas integration  

## *Technologies Used*  
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JWT Authentication  

## *Project Structure*  

📂 project-root  
 ┣ 📂 config             # Configuration files (DB, environment variables)  
 ┣ 📂 models             # Mongoose models (User, Profile, Train, etc.)  
 ┣ 📂 routes             # API route handlers  
 ┣ 📂 controllers        # Business logic for APIs  
 ┣ 📂 middlewares        # Authentication & validation middleware  
 ┣ 📂 utils              # Helper functions  
 ┣ 📜 index.js           # Entry point of the application  
 ┣ 📜 .env               # Environment variables  
 ┣ 📜 package.json       # Project dependencies  
 ┗ 📜 README.md          # Project documentation  


## *Installation & Setup*  

1. *Clone the repository:*  
   sh
   git clone <repository_url>
   cd project-root
   

2. *Install dependencies:*  
   sh
   npm install
   

3. *Configure MongoDB Atlas:*  
   - Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
   - Set up a cluster and get the *MongoDB connection URI*  

4. **Create a .env file** and add:  
   env
   PORT=5000
MONGO_URI=mongodb+srv://aifasaleem1:Aifa!23@cluster0.bpggu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_secret_key
RAPIDAPI_KEY=a5c51c1a2cmsh6bfb9c28c0108aep1a72eejsne5c00626f32d

   

5. *Start the server:*  
   sh
   npm start
   

## *API Endpoints*  

### *Authentication Routes*  
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | /api/auth/signup  | User registration   |
| POST   | /api/auth/login   | User login          |

### *Train Routes*  
| Method | Endpoint        | Description                        |
|--------|----------------|------------------------------------|
| GET    | /api/train   | Get all train data                |
| POST   | /api/add     | Add new train information         |

## *Running the Project*  
- *Development Mode:*  
  sh
  npm run dev
  
- *Production Mode:*  
  sh
  npm start
  


