OPTS=

deploy:
	@$(MAKE) build
	@$(make) push
	@$(make) up

build:
	@$(OPTS) td build

push:
	@$(OPTS) td push

up:
	@$(OPTS) td up

ps:
	@$(OPTS) td ps

.PHONY: ps up push build deploy
