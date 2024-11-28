# Pokedex

> ## :page_with_curl: Resources

- React 18
- Node v22
- Next.js 15
- Typescript
- SOLID
- Tailwind CSS
- Styled Components
- Jest
- TDD

> ## :books: Requirements

- Git
- Node
- NPM

## :rocket: Available Scripts

In the project directory, you can run:

### `npm install`

Install the dependencies listed on `package.json` file

### `npm start`

Runs the app.\

### `npm run dev`

Starts the app in development mode using the Next.js development server.
Open http://localhost:3000/ to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

> ## :books: Considerations

In this small project, I aimed to apply as much of my knowledge as possible about frontend architecture, leveraging SOLID principles and Clean Code practices.

I chose to use Axios instead of more robust tools like React Query or native solutions such as the Nest.js API. This decision was made to better demonstrate dependency inversion.

The architecture is primarily designed to isolate all logic and framework dependencies, making it easier to replace external libraries or even the frontend framework itself, while maximizing the reusability of JS/TS code.

In a real-world scenario, I might have opted for a simpler architecture, replacing unit tests with end-to-end (e2e) tests to speed up development and deliver more value.
