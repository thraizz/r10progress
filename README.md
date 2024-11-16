# R10Progress

Welcome to the **R10Progress** app – your go-to solution for tracking and visualizing your golf shot progress using the Garmin Approach R10 Radar!

Golf enthusiasts, improve your game by importing your shot data, storing it securely in Firebase, and analyzing your performance with intuitive and interactive charts. R10Progress makes it easy to see where you're shining and where you could use a bit more practice.

The live version of the app is available at [https://app.r10progress.com](https://app.r10progress.com/login).

## Features

- **Data Import**: Easily import your golf shot data in CSV format directly into the app.
- **Data Visualization**: Utilize powerful charts created with Vega to visualize your progress and performance trends over time.
- **Interactive Tables**: View detailed shot data in a searchable and sortable table powered by ag-Grid.
- **Goals**(WIP): Set and work on shot metric goals 
## How to Use

1. **Capture your shot data** during your practice rounds.
2. **Export your data** to a CSV file from the Garmin Golf App.
3. **Open R10Progress** and press the Upload button section.
4. **Upload your CSV file** – Your data will be processed and stored securely in Firebase.
5. **Head to the dashboard** to view your shots visualized through interactive charts and grids.
6. **Analyze your performance** and make informed decisions about your practice routines to enhance your skills.

## Getting Started

To get started with R10Progress, you need to follow these simple setup steps:

1. Clone the repository to your local machine.
   ```
   git clone https://github.com/thraizz/R10Progress.git
   ```
2. Navigate to the repository directory.
   ```
   cd R10Progress
   ```
3. Install all the required dependencies.
   ```
   bun install
   ```
4. Start the app in development mode, using the local emulators.
   ```
   bun run dev:local
   ```
5. Start the firebase emulator, which has a default user with `local@example.com` and `Test123!` as password and some shots already in the account.
   ```
   bun run emulate
   ```
6. Open your browser and navigate to `http://localhost:5173`.

The app should now be running locally, and you're ready to import your data and see your golf shot progress come to life!

## Contributing

We appreciate your interest in contributing to R10Progress! If you have suggestions or improvements, please feel free to fork the repo and submit a pull request.

## Support

If you encounter any issues or require assistance, please file an issue on the GitHub repository, and we'll get back to you promptly.
If you want to support my development of this, feel free to [buy me a coffee](https://buymeacoffee.com/aronschueler)

## License

This project is licensed under the [GNU LGPLv3](https://opensource.org/license/lgpl-3-0/) license.

## Disclaimer

R10Progress is not affiliated with Garmin Ltd. or its subsidiaries. Garmin is a registered trademark of Garmin Ltd.
