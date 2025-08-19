Backend (Node + Express + TypeScript + Prisma)

Steps to run locally (connecting to Aurora MySQL or any MySQL-compatible DB):

1. Install dependencies
   cd backend
   npm install

2. Make a copy of .env.example:
   cp .env.example .env
   - Edit .env and set DATABASE_URL to your Aurora MySQL connection string:
     mysql://username:password@host:3306/database

3. Generate Prisma client:
   npx prisma generate

4. Create initial migration & apply (requires DB reachable):
   npx prisma migrate dev --name init

   If you do not want to run migrations against an existing DB, you can use:
   npx prisma db push

5. Start dev server:
   npm run dev

API endpoints:
- GET /api/todos
- GET /api/todos/:id
- POST /api/todos
- PUT /api/todos/:id
- DELETE /api/todos/:id

Validation uses Zod. Prisma schema is in prisma/schema.prisma
