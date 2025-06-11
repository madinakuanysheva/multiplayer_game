# Multiplayer Square Game

A real-time multiplayer game where players control colored squares using W/A/S/D keys. The game features real-time synchronization through Firebase Realtime Database.

## 🎮 Play the Game

You can play the game right now by visiting: [https://multiplayer-game-55414.web.app](https://multiplayer-game-55414.web.app)

## 🎯 How to Play

1. Open the game in your browser
2. Use the following keys to control your square:
   - W: Move Up
   - A: Move Left
   - S: Move Down
   - D: Move Right
3. Each player gets a unique colored square
4. Play with friends in real-time!

## 🚀 Local Development

If you want to run the game locally:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_DATABASE_URL=your_database_url
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## 🛠️ Built With

- React
- Firebase Realtime Database
- Create React App

## 📝 License

This project is open source and available under the MIT License.
