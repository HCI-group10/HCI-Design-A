deploy:
	git checkout --orphan gh-pages
	@echo "Building started..."
	npm run build
	git --work-tree dist add --all
	git --work-tree dist commit -m "gh-pages"
	@echo "Pushing to gh-pages..."
	git push origin HEAD:gh-pages --force
	rm -r dist
	git checkout -f main
	git branch -D gh-pages
	@echo "Successfully deployed, check your settings"

