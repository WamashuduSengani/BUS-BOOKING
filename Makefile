setup_dependencies:
	sudo npm i react-router-dom
	sudo npm i --save @fortawesome/fontawesome-svg-core
	sudo npm i --save @fortawesome/free-solid-svg-icons
	sudo npm i --save @fortawesome/free-regular-svg-icons
	sudo npm i --save @fortawesome/free-brands-svg-icons
	sudo npm i --save @fortawesome/react-fontawesome@latest
	sudo npm i --save framer-motion

run:
	npm run dev

build:
	npm run build

preview:
	npm run preview

commit:
	git add .
	gitmoji -c