all: dependencies test

test:
	./node_modules/karma/bin/karma start
	npm test

dependencies:
	which node npm
	npm install

.PHONY: all dependencies test
