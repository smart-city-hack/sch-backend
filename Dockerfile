FROM node:16.9
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY tsconfig.json .eslintrc.json ./
COPY src/ src/
COPY test/ test/
RUN npm run build
CMD ["node", "dist/src/index.js"]