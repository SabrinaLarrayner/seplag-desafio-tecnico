## Autor
Desenvolvido por **Sabrina Vigilato**

- GitHub: [@sabrinaLarrayner](https://github.com/SabrinaLarrayner)
- E-mail: solucoesslon@gmail.com
- LinkedIn: [https://www.linkedin.com/in/sabrina-vigilato-366059238/)

# Projeto: Pessoas Desaparecidas

Este projeto tem como objetivo simular a **listagem** e o **envio de informações** sobre pessoas desaparecidas, utilizando uma interface moderna e responsiva.
 **Funcionalidades**
 - Listagem de pessoas desaparecidas
 - Filtros por nome, idade, sexo e status
 - Página de detalhes com mais informações
 - Modal para adicionar informações adicionais com validações
 - Upload de imagem como anexo
 - Layout responsivo com Tailwind
 - Paginação e estatísticas integradas

##  Tecnologias Utilizadas

- [Nuxt 3](https://nuxt.com/) com [Vue 3](https://vuejs.org/) – Framework fullstack para Vue.js
- [Tailwind CSS](https://tailwindcss.com/) – Utilizado para a estilização dos componentes de forma utilitária
- [Element Plus](https://element-plus.org/) – Biblioteca de componentes UI para Vue 3

 *Print da listagem*
![image](https://github.com/user-attachments/assets/5f7ed867-5d67-4c40-a562-21214f17f8d1)
![image](https://github.com/user-attachments/assets/c00ef552-91a4-4c5c-813d-b2a83df5b2db)

 *Print Detalhes*
 ![image](https://github.com/user-attachments/assets/6a31e499-e6de-4221-9483-8e2aa9e80cd5)

  *Print Modal*
![image](https://github.com/user-attachments/assets/1ffa7b0c-eaad-4f9f-844b-26f4764582ee)


##  Fazer o build com docker
```bash
docker compose up --build

##  Instalação

Clone o repositório e instale as dependências:

```bash
# Usando Yarn
yarn install

# ou usando NPM
npm install

# Usando Yarn
yarn dev

# ou
yarn run dev

# ou usando NPM
npm run dev

#rodar via docker
docker compose up --build
