PHONY: protos

protos:
	docker run --rm -v $(PWD):/repo -w /repo bufbuild/buf generate