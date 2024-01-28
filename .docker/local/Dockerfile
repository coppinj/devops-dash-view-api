FROM node:20

RUN npm i -g @nestjs/cli

WORKDIR /api

RUN apt update && apt install git vim acl -y

RUN chown -R node:node /api
RUN chmod -R g+s /api
#setfacl -Rdm o::rwx /fend

USER node
EXPOSE 3000

RUN echo "alias ll='ls -alh'" > ~/.bashrc

CMD yarn \
    && yarn run start:debug --preserveWatchOutput
