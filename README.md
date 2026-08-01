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

- npm

### Installation

```bash
git clone <repo-url>
cd tiktak-ecommerce
npm install          # installs all workspaces at once
```

### Environment Variables

Each app has its own env file, since Vite and Next.js expose variables differently.

`apps/admin/.env`:

```
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_NAME=Tiktak Admin
```

`apps/client/.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Tiktak
```

### Running the project

```bash
npm run dev --workspace=admin       # admin dashboard
npm run dev --workspace=client      # customer storefront

npm run build --workspace=admin
npm run build --workspace=client

npm run lint --workspace=admin
npm run lint --workspace=client
```

## API Integration Notes

- All authenticated requests use a **Bearer token** (`Authorization: Bearer <token>`), attached via the interceptor in `packages/api-client`.
- Requests send an `Accept-Language` header for localized responses.
- Standard response shape from the backend:

```json
{
  "message": "Ok",
  "data": {},
  "result": true
}
```

This shape is typed once as `ApiResponse<T>` in `packages/types` and reused by every service function in both apps.

## Design Reference

- **Client**: implemented from the shared Figma file using Tailwind CSS — no component library, fully custom components under `shared/components`.
- **Admin**: uses Ant Design as its component library; where the Figma file specifies brand colors or spacing, they're applied through Ant Design's `ConfigProvider` theme tokens rather than overriding individual components.

## Contributing

This is a course project. Follow the structure and conventions described in `CLAUDE.md` when adding new features.
