## DnD SIIT Insight Camp 2025

This is a [Next.js](https://nextjs.org) project with drizzle ORM.

This is a webapp game interface for viewing character stats, equipments, statuses, items, skills.

Players can participate in boss fight controlled by staff.

It also supports dashboard for staff to fully customize items and give/remove items, statuses, or skills to players.

## Dependencies

This project uses PostgreSQL database driver for data access. (If you want to use a database of your choice, you will have to change the underlying drizzle schema)

Specifically, the project uses Supabase (no supabase client, just connection string) since it also provides a bucket for images. Do not forget to change the allow images remote patterns in `next.config.ts`.

This project also uses NextAuth.js with Google OAuth is also required for authentication and staff/player authorization. (You can add / remove auth methods)

Setup the `AUTH_SECRET` with the following command:

```bash
npx auth secret
```

## Getting Started

Setup the database:

```bash
npm run db:push
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Some assets are provide in the /public directory but item assets must be added to the storage. (considering adding a seed script)
