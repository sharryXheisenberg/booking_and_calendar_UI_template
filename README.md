# **BookingAgent**
A modern React-based application for managing and scheduling appointments with ease. Built with Vite, Tailwind CSS, and Redux Toolkit, this app offers robust functionalities with a better user interface.

## 🚀 Live Project
Check out the live version of the app here: [BookingAgent](https://booking-and-calendar-ui-template.vercel.app/)  
Explore the features and experience the seamless interface directly in your browser!

## **Features**
- **Vite**: Ultra-fast development and build tooling.
- **React**: Latest version for building modern UI components.
- **Tailwind CSS**: Utility-first CSS framework for building custom designs without leaving your HTML.
- **ESLint**: A pluggable linter tool for ensuring code quality.

## **Functionalities**
1. **Create**: Add and schedule new appointments.
2. **View**:Display upcoming and completed appointments in a clean and organized calendar view.
3. **Delete**: Remove unwanted appointments with a simple action.
4. **Filter**: Sort appointments by view (Week/Month), service type, and status (Confirmed, Pending, Cancelled).
5. **Manage Status**: Track appointment statuses and update them accordingly.

## **Installation**

### **Step 1: Create a Vite project**
 Install Vite globally (if not already installed):
```bash
npm create vite@latest
```
### **Step 2: Install Tailwind CSS**
1. Install Tailwind CSS and its dependencies:
 ``` bash
npm install -D tailwindcss postcss autoprefixer
 ```
2. Initialize Tailwind configuration:
 ``` bash
 npx tailwindcss init
 ```
3. Update the tailwind.config.js file with the following content to specify which files Tailwind should scan:
  ``` bash
  /** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
 4. Add the following lines to your src/index.css (or src/main.css if you’re using that):
``` bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
# **Scripts**
### **Step 4: Install Required Packages**
1. Install the project dependencies:
``` bash
npm install
```
2. Start the development server with the following command:
``` bash
npm run dev
```
  Open the app in your browser at http://localhost:5173.

3. Build the Project for Production
``` bash
npm run build
```
4. Preview Production Build
``` bash
npm run preview
```
5. Lint the Code
``` bash
npm run lint
```

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any queries or suggestions, feel free to reach out via [GitHub Issues](https://github.com/sharryXheisenberg/booking_and_calendar_UI_template/issues).

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
