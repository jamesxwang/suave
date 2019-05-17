FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./frontend/dist /usr/share/nginx/html/frontend
COPY ./manage/manage /usr/share/nginx/html/manage
EXPOSE 80 443