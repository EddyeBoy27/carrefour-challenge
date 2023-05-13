CREATE DATABASE cashflow;
\c cashflow

CREATE TABLE public.user (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO public.user (name, email, password)
VALUES ('Sr Fulano', 'fulano@example.com', '$2b$10$gXF.9piozcU7r6kDa0FAQevb4Vqoy7/bnKcR1gRuDEw8CFzIa0sze');
