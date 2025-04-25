# Use a imagem oficial do Node.js
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Faz o build da aplicação
RUN npm run build

# Expõe a porta
EXPOSE 3000

# Inicia a aplicação compilada
CMD ["node", "dist/main"]
