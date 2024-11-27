🧩 Welcome to Quizotica 🏆

Step right up, brave challenger! Are you ready to test your wits, battle the clock, and rise to the top of the leaderboard?
Quizotica is the ultimate battleground for trivia warriors and curious minds alike. Answer questions, earn points, and prove you’re the ultimate quizmaster!

📝 Features

🎉 Dynamic Categories
The trivia universe awaits! Pick your favorite category, from science to sports, history to pop culture.

🧠 Difficulty Selector
Feeling lucky? Start easy or dive straight into hard-mode madness – you decide your path.

⏳ Race Against Time
Every second counts! A ticking timer keeps you sharp and on your toes.

🏆 Epic Leaderboard
Immortalize your name in the Hall of Fame! Save your score and show the world who’s boss.

🔄 Retry & Conquer
Didn’t win the crown this time? No worries! Retry and reclaim your glory.

🌙 Dark & Light Themes
Play your way, day or night, with seamless light and dark modes.

🕹️ How to Play

	1.	Choose Your Quest
Select your trivia category from the epic collection on the homepage.
	2.	Pick Your Challenge
Choose your difficulty – Easy, Medium, or Hard. The stakes are yours to raise!
	3.	Take the Quiz
Answer 10 exciting questions, but beware – the clock is ticking.
	4.	Claim Your Throne
View your score, save it to the leaderboard, and aim for eternal trivia glory.
	5.	Challenge Again
Not satisfied? Retry the quiz or try another category to sharpen your skills.

📦 Setup and Installation

1. Clone the Repository

Begin your journey by cloning the Quizotica code:

git clone https://github.com/nicky-mc/quiz-quest.git
cd quizotica

2. Install Dependencies

Prepare for adventure by installing the necessary packages:

npm install

3. Start Your Quest

Launch the app and start playing:

npm run dev

Open http://localhost:3000 in your browser to embark on your trivia journey!

🏗️ App Structure

The foundation of your quest:

src/
├── app/
│   ├── layout.js         # Themed layout with Navbar and Footer
│   ├── page.js           # Homepage to select categories
│   ├── quiz/[category]/  # Dynamic quiz pages by category
│   │   ├── page.js
├── components/
│   ├── Navbar.js         # Navbar with light/dark toggle
│   ├── Footer.js         # Footer for a polished finish
│   ├── Spinner.js        # Loading spinner during API fetches
│   ├── Timer.js          # Countdown timer for the quiz
│   ├── Leaderboard.js    # Displays top scores
├── pages/api/
│   ├── scores.js         # API route to save and fetch scores
├── scores.json           # Persistent JSON file for score storage
├── globals.css           # Global styles

🔧 How It Works

	1.	Homepage
Your quest begins here! The app dynamically fetches categories from the Open Trivia Database and displays them as clickable cards. You also choose your difficulty level.
	2.	Quiz Page
Each question is pulled dynamically from the API based on your chosen category and difficulty. Track your score, manage your time, and climb the leaderboard.
	3.	Leaderboard
After each quiz, save your score and name. The leaderboard ensures your achievements are etched in the annals of Quizotica history.

🧩 Features in Action

🌟 Dynamic Categories

Categories are fetched directly from the Open Trivia Database, so there’s always something new to explore.

🔄 Retry Functionality

A new chance awaits! You can retry the quiz to beat your previous score.

⏳ Timer and Feedback

Race against time and receive instant feedback for every answer – right or wrong.

🏅 Leaderboard Persistence

Scores are saved in a JSON file on the server, so your glory persists every time you visit.

🌗 Dark & Light Themes

Choose your battlefield with the toggle in the navbar.

✨ Thematic Fun

	•	Every button click feels like a roll of the dice with DaisyUI animations.
	•	The ticking timer adds just the right amount of drama to your quest.
	•	The leaderboard? A shrine to all quizmasters – where will your name appear?

🌍 Deployment

Deploy your app to Vercel to share the trivia fun with the world.
	1.	Push your code to GitHub.
	2.	Connect your repository to Vercel.
	3.	Deploy and conquer the internet with Quizotica.

🤝 Contributing

The Quizotica adventure never ends! If you have ideas for new features or enhancements:
	1.	Fork the repository.
	2.	Create a new branch.
	3.	Make your changes.
	4.	Submit a pull request.

🎉 Let the Quest Begin!

Get ready to outsmart your friends, climb the leaderboard, and claim your place as the ultimate quizmaster. What are you waiting for? Adventure awaits in Quizotica! 🧠✨
