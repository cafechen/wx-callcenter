TESTS = test/*_test.js
REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@$(MAKE) test REPORTER=dot
	@$(MAKE) test MOCHA_OPTS='--require blanket' REPORTER=html-cov > coverage.html

.PHONY: test