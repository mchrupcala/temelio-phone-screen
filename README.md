# Temelio Phone Screen

## Instructions

Follow these steps to set up and run the Node.js application on your local machine:

#### 1️⃣ Clone the Repository

```sh
git clone https://github.com/mchrupcala/temelio-phone-screen.git
cd temelio-api
```

#### 2️⃣ Install Dependencies & Start the Server

```sh
npm install
npm run start
```

#### 3️⃣ API Endpoints

The application runs on **http://localhost:3000**. Here are the key API endpoints:

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| `POST` | `/nonprofits`        | Create a new nonprofit            |
| `GET`  | `/nonprofits`        | Get all nonprofits                |
| `GET`  | `/nonprofits/:email` | Get a specific nonprofit by email |
| `POST` | `/emails`            | Send a bulk templated email       |
| `GET`  | `/emails`            | Retrieve all sent emails          |

## ✨ Features

- Users can create nonprofits and their metadata (name, address, and email)
- Users can customize an email & bulk-send to a list of nonprofits with a templated message (i.e. "Sending money to nonprofit { name } at address { address }"). Templated fields will populate with the correct data.
- Users can retrieve all the emails that have been sent to nonprofits.
