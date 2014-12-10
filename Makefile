.PHONY: main.js main.min.js all
all: main.min.js


main.js:
	node index.js main.js

main.min.js: main.js
	uglifyjs main.js -o main.min.js


test-cov: istanbul

istanbul:
	istanbul cover ./node_modules/mocha/bin/_mocha -- -R spec test  --recursive

coveralls:
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js


