# Imagem Base
FROM node:18.16.0-alpine

# Diretório de trabalho no contêiner
WORKDIR /app

# Arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Dependências
RUN npm install

# Instalar o NestJS globalmente
RUN npm install -g @nestjs/cli

# Copiar o restante dos arquivos para o diretório de trabalho
COPY . .

# Executar o processo de compilação
RUN npm run build

# Defina o ambiente de execução para produção
ENV NODE_ENV=production

# Exponha a porta do servidor (certifique-se de que corresponda à porta usada pelo seu aplicativo)
EXPOSE 3000

# Inicie o servidor
CMD ["node", "dist/main"]
