.PHONY: build-dev
build-dev:
	docker compose -f docker/dev/docker-compose.yml build

.PHONY: start-dev
start-dev:
	docker compose -f docker/dev/docker-compose.yml up -d

.PHONY: stop-dev
stop-dev:
	docker compose -f docker/dev/docker-compose.yml down

.PHONY: build-prod
build-prod:
	docker compose -f docker/prod/docker-compose.yml build

.PHONY: start-prod
start-prod:
	docker compose -f docker/prod/docker-compose.yml up -d

.PHONY: stop-prod
stop-prod:
	docker compose -f docker/prod/docker-compose.yml down