# Tiktak — E-commerce Frontend

A monorepo containing two independent applications for the Tiktak e-commerce platform: a **customer-facing storefront** and an **admin/seller dashboard**, both consuming the same REST API (Node.js/Express, documented via the provided Postman collection).

Built as part of a course project (Stage 3-4).

> **Why two apps instead of one?** The storefront needs SEO and fast first paint (product pages indexed by search engines), which Next.js provides out of the box. The admin dashboard is an internal tool with no SEO needs, built almost entirely around CRUD tables and forms — Ant Design's ready-made components are a better fit there than hand-building the same primitives in Tailwind. Splitting them avoids forcing one framework to do a job it isn't suited for.

## Tech Stack

### Admin — `apps/admin`

| Layer                  | Technology                            |
| ---------------------- | ------------------------------------- |
| Framework              | React 18 + TypeScript                 |
| Build tool             | Vite                                  |
| UI library             | Ant Design                            |
| Client state           | Zustand                               |
| Server state / caching | React Query (`@tanstack/react-query`) |
| HTTP client            | Axios                                 |
| Routing                | React Router                          |
| Forms                  | Formik                                |

### Client — `apps/client`

| Layer                  | Technology                            |
| ---------------------- | ------------------------------------- |
| Framework              | Next.js (React 18 + TypeScript)       |
| Styling                | Tailwind CSS                          |
| Client state           | Zustand                               |
| Server state / caching | React Query (`@tanstack/react-query`) |
| HTTP client            | Axios                                 |
| Routing                | Next.js App Router                    |
| Forms                  | Formik                                |

**Monorepo tooling:** npm workspaces (`apps/*`, `packages/*`) — kept on npm rather than introducing pnpm or Turborepo, since the project didn't need the extra tooling on top of everything else that's new here.

## Features

**Client (storefront) — `apps/client`:**

- Auth: sign up, login, OTP verification
- Browse products & categories, product details
- Favorites (add / remove)
- Basket (add / view / remove items)
- Checkout & order history
- Profile management

**Admin (role: `COMMERCE`) — `apps/admin`:**

- Dashboard overview
- Product management (CRUD)
- Category management
- Campaign management (CRUD)
- Order management
- User management

Every route in the admin app is gated behind a role check (`role === 'COMMERCE'`) at the router root. The client app only gates a handful of routes (profile, orders, checkout) behind "is authenticated" — there's no role branching there, since every logged-in client user is a customer, not staff.

## Architecture

Both apps follow the same three-layer pattern for talking to the API, so a feature's data logic stays easy to find and test in isolation:

```
service (typed, calls the shared api-client)
   → hook (React Query: useQuery / useMutation — owns the queryKey and cache invalidation)
      → page / component (consumes the hook only — never calls axios directly)
```

- **`packages/api-client`** — one shared Axios instance with interceptors for the Bearer token and the `Accept-Language` header. Both apps import this instead of configuring their own.
- **`features/*/api/*.service.ts`** — thin, typed functions per endpoint (e.g. `productsService.getAll(params)`). No React Query in this layer.
- **`features/*/hooks/*.ts`** — wraps the service call in `useQuery` / `useMutation`.
- **`features/*/pages`** and **`components`** — consume the hook, render UI.

## State Management

The rule we settled on: **Zustand never stores anything that also lives on the server.**

| Store           | Holds                                        | Persisted? |
| --------------- | -------------------------------------------- | :--------: |
| `useAuthStore`  | access/refresh token, user role              |    Yes     |
| `useThemeStore` | light / dark mode                            |    Yes     |
| `useUIStore`    | sidebar/drawer open state, selected language |     No     |

Everything else — products, categories, campaigns, orders, **basket**, **favorites**, profile — is server state and goes through React Query, not Zustand:

- **Basket**: the backend already exposes add/list/remove endpoints for it, so the basket is never duplicated in Zustand or `localStorage`. UI reads from `useBasketQuery` and mutates via `useAddToBasketMutation` / `useRemoveFromBasketMutation`.
- **Favorites**: same reasoning — each product response already includes `is_favorite`, so toggling is a `useToggleFavoriteMutation` (with an optimistic update for instant feedback), not local state.
  > ⚠️ TODO: confirm the exact favorite add/remove endpoint path against the backend — it wasn't present in the current Postman collection.

## Project Structure

```
tiktak/
├── apps/
│   ├── admin/
│   │   └── src/
│   │       ├── app/
│   │       │   ├── App.tsx
│   │       │   ├── router.tsx                 # includes the role guard at the root
│   │       │   └── providers.tsx               # QueryClientProvider, Ant Design ConfigProvider
│   │       │
│   │       ├── assets/
│   │       │   ├── images/
│   │       │   └── icons/
│   │       │
│   │       ├── features/
│   │       │   ├── dashboard/
│   │       │   │   ├── api/dashboard.service.ts
│   │       │   │   ├── hooks/useDashboard.ts
│   │       │   │   └── pages/Dashboard.tsx
│   │       │   ├── products/
│   │       │   │   ├── api/products.service.ts
│   │       │   │   ├── hooks/useProducts.ts     # useProductsQuery, useCreateProductMutation...
│   │       │   │   ├── components/
│   │       │   │   │   ├── ProductTable/
│   │       │   │   │   │   ├── ProductTable.tsx
│   │       │   │   │   │   └── index.tsx
│   │       │   │   │   └── ProductFormModal/
│   │       │   │   │       ├── ProductFormModal.tsx
│   │       │   │   │       └── index.tsx
│   │       │   │   └── pages/ProductsPage.tsx
│   │       │   ├── categories/                  (same shape)
│   │       │   ├── campaigns/                   (same shape)
│   │       │   ├── orders/                      (same shape)
│   │       │   ├── users/                       (same shape)
│   │       │   └── auth/
│   │       │       ├── api/auth.service.ts
│   │       │       ├── hooks/useAuth.ts
│   │       │       └── pages/LoginPage.tsx
│   │       │
│   │       ├── shared/
│   │       │   ├── lib/queryClient.ts
│   │       │   ├── store/
│   │       │   │   ├── useAuthStore.ts
│   │       │   │   ├── useThemeStore.ts
│   │       │   │   └── useUIStore.ts
│   │       │   ├── components/
│   │       │   │   ├── PageHeader/
│   │       │   │   │   ├── PageHeader.tsx
│   │       │   │   │   └── index.tsx
│   │       │   │   └── ConfirmModal/
│   │       │   │       ├── ConfirmModal.tsx
│   │       │   │       └── index.tsx
│   │       │   ├── layouts/
│   │       │   │   ├── DashboardLayout/
│   │       │   │   │   ├── DashboardLayout.tsx
│   │       │   │   │   └── index.tsx
│   │       │   │   └── Sidebar/
│   │       │   │       ├── Sidebar.tsx
│   │       │   │       └── index.tsx
│   │       │   ├── hooks/
│   │       │   │   ├── useAdminGuard.ts          # role === 'COMMERCE' check
│   │       │   │   ├── usePagination.ts
│   │       │   │   ├── useDebounce.ts
│   │       │   │   └── useMediaQuery.ts
│   │       │   └── utils/
│   │       │       ├── formatPrice.ts
│   │       │       └── formatDate.ts
│   │       │
│   │       ├── config/env.ts                    # typed wrapper around import.meta.env
│   │       └── main.tsx
│   │
│   └── client/
│       ├── app/
│       │   ├── (shop)/
│       │   │   ├── page.tsx
│       │   │   ├── products/
│       │   │   │   ├── page.tsx
│       │   │   │   └── [id]/page.tsx
│       │   │   ├── basket/page.tsx
│       │   │   ├── checkout/page.tsx
│       │   │   ├── favorites/page.tsx
│       │   │   └── layout.tsx
│       │   │
│       │   ├── (auth)/
│       │   │   ├── login/page.tsx
│       │   │   ├── register/page.tsx
│       │   │   ├── verify-otp/page.tsx
│       │   │   └── layout.tsx
│       │   │
│       │   ├── profile/
│       │   │   ├── page.tsx
│       │   │   └── orders/page.tsx
│       │   │
│       │   ├── layout.tsx
│       │   ├── providers.tsx
│       │   └── globals.css
│       │
│       ├── features/
│       │   ├── products/
│       │   │   ├── api/products.service.ts
│       │   │   ├── hooks/useProducts.ts
│       │   │   ├── components/
│       │   │   │   ├── ProductCard/
│       │   │   │   │   ├── ProductCard.tsx
│       │   │   │   │   └── index.tsx
│       │   │   │   ├── ProductGrid/
│       │   │   │   │   ├── ProductGrid.tsx
│       │   │   │   │   └── index.tsx
│       │   │   │   └── ProductDetail/
│       │   │   │       ├── ProductDetail.tsx
│       │   │   │       └── index.tsx
│       │   │   └── pages/
│       │   │       ├── ProductsPage.tsx
│       │   │       └── ProductDetailPage.tsx
│       │   ├── basket/                          (same shape)
│       │   ├── favorites/                       # useFavoritesQuery, useToggleFavoriteMutation
│       │   ├── checkout/                        (same shape)
│       │   ├── orders/                          (same shape)
│       │   ├── profile/                         (same shape)
│       │   └── auth/
│       │       ├── api/auth.service.ts
│       │       ├── hooks/useAuth.ts
│       │       └── pages/
│       │           ├── LoginPage.tsx
│       │           ├── RegisterPage.tsx
│       │           └── VerifyOtpPage.tsx
│       │
│       ├── shared/
│       │   ├── lib/queryClient.ts
│       │   ├── store/
│       │   │   ├── useAuthStore.ts
│       │   │   ├── useThemeStore.ts
│       │   │   └── useUIStore.ts
│       │   ├── components/
│       │   │   ├── Header/
│       │   │   │   ├── Header.tsx
│       │   │   │   └── index.tsx
│       │   │   ├── Footer/
│       │   │   │   ├── Footer.tsx
│       │   │   │   └── index.tsx
│       │   │   └── Button/
│       │   │       ├── Button.tsx
│       │   │       └── index.tsx
│       │   ├── hooks/
│       │   │   ├── useDebounce.ts
│       │   │   └── useMediaQuery.ts
│       │   └── utils/
│       │
│       ├── public/
│       └── config/env.ts
│
├── packages/
│   ├── types/
│   │   └── index.ts                            # ApiResponse<T>, Product, Category, Order, Basket, Campaign, User
│   ├── api-client/
│   │   └── index.ts                            # shared axios instance + interceptors
│   └── constants/
│       └── index.ts                            # endpoint path strings, PaymentType, OrderStatus, Role
│
├── package.json                                # root — npm workspaces
└── tsconfig.base.json
```

## Getting Started

### Prerequisites

- Node.js (LTS)
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
