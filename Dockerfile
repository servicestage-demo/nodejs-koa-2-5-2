FROM node:8
COPY . .
CMD ["node", "./bin/www"]
