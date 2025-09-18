PHONY: protos

protos:
	docker run --rm -v $(PWD):/repo -w /repo bufbuild/buf generate

release:
	rm -rf dist && yarn install && yarn build && npm publish