# TV-TIME-TENNA-BOT

A Discord bot featuring Mr. (Ant) Tenna from Deltarune Chapter 3, bringing the charismatic (and slightly desperate) TV host to your server with interactive dialogue, scheduled events, and fun mini-games.

![Node.js](https://img.shields.io/badge/node.js-22.14.0-brightgreen)
![Discord.js](https://img.shields.io/badge/discord.js-14.21.0-blue)

> [!IMPORTANT]
> This bot was created for a private friend server and is not available for public use. Feel free to use the code as inspiration for your own character-driven Discord bot!

## Features

### Slash Commands

- **`/quiz`**
  - Trivia questions with multiple choice answers
  - Earn points for correct answers
  - Buttons disable after answering

- **`/balance`**
  - Check your current point balance

- **`/quote`**
  - Random quotes from Tenna in Chapter 3 of Deltarune

- **`/introduction`**
  - Introduce yourself to Tenna so he can track your nickname, pronouns, and/or birthday

- **`/schedule <type> <day> <time> <timezone>`**
  - Quickly create simple Discord server events
  - Supports multiple timezones (US, UK, Spain, Newfoundland)
  - Event types: Art Party, Gaming Session, Watch Party

### Interactive Dialogue

Talk to Mr. Tenna by @mentioning him or replying to his messages! Some topics he can respond to are:
- Greetings and farewells
- Compliments
- Questions about himself
- Mentions of other Deltarune characters
- Insults

His responses are powered by a rule-based dialogue system with pattern matching—no LLM required.

### Scheduled Posts

- **I Love TV Check**: Daily randomized posts asking if you love TV, with point rewards for correct responses
- **Birthday Announcements**: Automatic birthday shoutouts for server members who opt in

## Technical Highlights

### Architecture

- Rule-based dialogue system with intent detection
- Centralized trigger patterns and response pools
- Timezone-aware event scheduling using Luxon
- Typing indicators for natural conversation feel
- Channel restrictions for focused bot interactions

### Design

This bot prioritizes character authenticity and server fun:

- **In Character**: All responses try to match Mr. Tenna's personality; upbeat, attention-seeking, and insecure
- **Reactive**: Pattern matching keeps responses predictable and on-brand
- **Lightweight**: No external AI APIs, everything runs locally
- **Configurable**: Easy to expand dialogue triggers and responses

## License

This project is for portfolio demonstration purposes and personal use. Not intended for public bot hosting.

## Acknowledgments

- Mr. (Ant) Tenna and Deltarune are created by Toby Fox
- Bot icon credit: [saichew-site on Tumblr](https://www.tumblr.com/saichew-site)
- Trivia sourced from [The Trivia API](https://the-trivia-api.com/)