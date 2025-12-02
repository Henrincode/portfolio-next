# Meu Portfólio Fullstack

Portfólio pessoal desenvolvido com Next.js – showcase dos meus projetos, 
habilidades e jornada como desenvolvedor fullstack em ascensão. Aqui você encontra meus trabalhos em React, Supabase, SQL e mais, com links para código e demos ao vivo.

## Instalando o NEXTJS

```bash
npx create-next-app@latest . --yes
```

Usei . ao invés do app-name para instalar na raiz do projeto

## Rodar o NEXTJS

```bash
npm run dev
```

## Limpando dados de instalação padrão do NEXTjs

### Arquivos para serem apagados

```bash
📂 app
    📄 favicon.ico
📂 public
    📄 file.svg
    📄 globe.svg
    📄 next.svg
    📄 vercel.svg
    📄 window.svg
```

### Arquivos para serem limpos:

`app/layout.tsx` deve fucar assim:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Henrique Marques",
  description: "Dev Fullstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-800 flex flex-row h-dvh justify-center items-center">
        {children}
      </body>
    </html>
  );
}
```

`app/page.tsx` deve ficar assim:

```tsx
export default function Home() {
  return (
    <>
    <h1 className="text-gray-800 text-center text-9xl bg-amber-300 p-20 rounded-4xl select-none hover:bg-amber-500 duration-300 animate-pulse">Olá Mundo!</h1>
    </>
  );
}
```

`app/globals.css` deve ficar assim:

```tsx
@import "tailwindcss";
```