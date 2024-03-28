install:
	npm ci

build:
	rm -rf ./frontend/build
	npm run build

develop: 
	make start-server & make start-frontend

start-server:
	npx start-server

start-frontend:
	make -C frontend start

start: start-server
