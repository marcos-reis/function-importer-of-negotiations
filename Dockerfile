FROM node AS builder
WORKDIR /app
COPY package.json tsconfig.json tsconfig-build.json /app/
RUN npm install
COPY src/ /app/src/
RUN ls -ltra
RUN npm run clean
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:latest
COPY --from=builder /app/dist ${LAMBDA_TASK_ROOT}/dist
COPY --from=builder /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules
CMD [ "dist/main/app.lambdaHandler" ]



# Install the function's dependencies using file requirements.txt
# from your project folder.
#COPY package.json  .
#RUN npm install
#CMD [ "lambda_function.handler" ] 
