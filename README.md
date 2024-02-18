## My Personal Blog

This is the code running https://jacobpowell.dev

Before you run the blog, move the `.example` from the sample .env files and prepare them as relevant to you.

To run the blog:

Locally, for viewing:

```bash
git clone https://github.com/Scout2012/blog.git
cd blog
npm i
npm run build && npm run start
```

Locally, for development:

```bash
git clone https://github.com/Scout2012/blog.git
cd blog
npm i
npm run dev
```

Docker:

```bash
git clone https://github.com/Scout2012/blog.git
cd blog
make build-prod && make start-prod
```
