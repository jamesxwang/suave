FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./frontend/dist /usr/share/nginx/html/frontend
COPY ./manage/dist /usr/share/nginx/html/admin
EXPOSE 80 443