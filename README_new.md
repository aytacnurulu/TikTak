# Tiktak Admin

Bu proje, Tiktak admin panelinin tek bir Vite + React projesi olarak çalıştırılabilir hâlini temsil eder. Yalnızca admin tarafı odaklıdır; ekstra client/monorepo yapısı kaldırılmıştır.

## Tech Stack

- React 19 + TypeScript
- Vite
- Ant Design
- Zustand
- React Query
- Axios
- React Router
- Formik

## Project Structure

```text
tiktak/
├── public/
├── src/
│   ├── app/
│   ├── assets/
│   ├── features/
│   │   ├── auth/
│   │   ├── campaigns/
│   │   ├── categories/
│   │   ├── orders/
│   │   ├── products/
│   │   └── users/
│   ├── shared/
│   └── main.tsx
├── packages/
│   ├── api-client/
│   ├── constants/
│   └── types/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Run

```bash
npm install
npm run dev
```
