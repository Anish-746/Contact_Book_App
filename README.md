# Contact Book - React Application

A simple and responsive contact management application built with React. This app allows users to create, read, update, delete, and search contacts. All data is persisted in the browser's **LocalStorage**, making it a complete client-side solution.

The UI is built with **Tailwind CSS** for a modern, utility-first design and **Lucide React** for clean, lightweight icons.

## Live Demo

Vercel Link : **https://contact-book-app-bay.vercel.app/**

## Features

* **Full CRUD Functionality:** Create, Read, Update, and Delete contacts.
* **Persistent Storage:** Contacts are automatically saved to and loaded from the browser's `LocalStorage`.
* **Real-time Search:** Instantly filter contacts by name, email, or phone number.
* **Modern UI/UX:**
    * Clean, card-based layout.
    * Responsive design for mobile, tablet, and desktop.
    * Smooth hover animations on contact cards.
* **Robust Modals:** A single, reusable `Modal` component handles adding, editing, and confirming deletions.
* **Toast Notifications:** Non-intrusive feedback for actions like "Contact Added" or "Contact Deleted," which automatically dismisses.
* **Form Validation:** The "Add/Edit Contact" form includes client-side validation for name, email format, and phone number.

---

## Tech Stack & Libraries

* **[React](https://reactjs.org/):** (UI Library) Used for building the component-based user interface.
* **[Tailwind CSS](https://tailwindcss.com/):** (CSS Framework) Chosen for its utility-first approach, allowing for rapid development of a custom, responsive design without writing traditional CSS.
* **[Lucide React](https://lucide.dev/):** (Icon Library) Selected for its simple, pixel-perfect, and highly customizable SVG icons.

---

## Getting Started: Setup and Local Installation

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You must have [Node.js](https://nodejs.org/) installed on your computer.

### Step-by-Step Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Anish-746/Contact_Book_App
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd Contact_Book_App
    ```

3.  **Install dependencies:**
    This command will install React, Tailwind, Lucide, and other necessary packages.
    ```sh
    npm install
    ```

4.  **Run the development server:**
    This project is set up using Vite.
    ```sh
    npm run dev
    ```

5.  **Open the app in your browser:**
    Open [http://localhost:5173](http://localhost:5173) (or the URL provided in your terminal) to view the application.

---

## Design Choices & Project Notes

A few key decisions were made during the development of this application:

* **State Management:** All application state (e.g., `contacts`, `modal`, `toast`) is managed centrally in the `App.jsx` component using React's built-in `useState` and `useEffect` hooks. For an application of this scale, this avoids the boilerplate of more complex state management libraries (like Redux or Zustand).

* **Persistence:** `localStorage` was chosen for its simplicity. It provides a quick and effective way to persist data on the client side without needing a backend database. The app loads from `localStorage` on initial render and saves the entire `contacts` array any time it's modified.

* **Unified Modal System:** Instead of multiple `isAddModalOpen`, `isEditModalOpen` states, a single state object (`modal`) is used:
    ```javascript
    const [modal, setModal] = useState({
      type: null, // 'add', 'edit', 'delete'
      payload: null // The contact object (for 'edit') or ID (for 'delete')
    });
    ```
    This makes it easy to control which modal to show and what data to pass to it, leading to cleaner and more manageable code.

* **Component Structure:** Components are split into functional categories:
    * `components/`: Core UI pieces like `Header.jsx`, `ContactList.jsx`, `SearchBar.jsx`.
    * `utils/`: Reusable, generic components like `Modal.jsx` and `Toast.jsx`.

* **Initial Data:** The `data.js` file provides a set of `initialContacts`. These are only used the very first time a user opens the app or if their `localStorage` is empty.
