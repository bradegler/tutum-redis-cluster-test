OPTS=

web:
	@$(MAKE) --no-print-directory -C lib/web

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

deps:
	@$(MAKE) deps util config --no-print-directory -C lib/web -B

ansible:
	@ansible-playbook -i bin/ansible/inventories/production bin/ansible/playbooks/production.yml

.PHONY: deploy web
