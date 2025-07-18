.PHONY: all test deploy monitor

# Lancer les tests de performance
test:
	k6 run performance/load-test.js

# Déployer sur Kubernetes
deploy:
	kubectl apply -f backend/kubernetes/
	kubectl apply -f frontend/kubernetes/

# Déployer Prometheus et Grafana
monitor:
	kubectl apply -f backend/kubernetes/prometheus-deployment.yaml
	kubectl apply -f backend/kubernetes/grafana-deployment.yaml