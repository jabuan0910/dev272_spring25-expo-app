# Dog Breed Explorer – DEV272 Assignment 5

This React Native app uses Supabase to store and retrieve dog breed information. It fetches data with React-Query and caches it locally using AsyncStorage for offline support.

A mobile app built with React Native, Supabase, and React Query for managing dog breed info. Includes offline support with AsyncStorage. Developed for DEV272 Assignment 5 (Spring 2025).

---

## ✅ Supabase Configuration and Table Setup

- Supabase project set up at [https://app.supabase.com](https://app.supabase.com).
- Created a table called `dog_breeds` with the following fields:
  - `id` (UUID, primary key)
  - `name` (text)
  - `origin` (text)
- Populated with sample entries: Labrador, Poodle, and others.

---

## ✅ How React-Query is Used

- A custom hook `useDogBreeds()` wraps `useQuery()` from `@tanstack/react-query`.
- Handles loading, error, and success states.
- Fetched data is passed to the main list UI in the Home screen.

---

## ✅ How AsyncStorage is Implemented (Extra Credit)

- On load, checks for cached data using `AsyncStorage.getItem`.
- If available, shows it immediately.
- When Supabase fetch succeeds, updates the cache with `AsyncStorage.setItem`.

---

## 🔗 GitHub Repo

> `https://github.com/jabuan0910/dev272_spring25-expo-app`
