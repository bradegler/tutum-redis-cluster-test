web:
	@$(MAKE) --no-print-directory -C lib/web

deploy:
	@td up

deps:
	@$(MAKE) deps util config --no-print-directory -C lib/web -B

.PHONY: deploy web
