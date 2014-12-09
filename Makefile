# http://yui.yahooapis.com/2.9.0/build/yahoo/yahoo-min.js
# https://crypto-js.googlecode.com/files/CryptoJS%20v3.1.2.zip
# core-fix.js
# ...

# (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/

all: main.min.js
main.js: index.js
	node index.js main.js

main.min.js: main.js
	uglifyjs main.js -o main.min.js
