# Statiz 
A simple, modular, next generation static website builder. 

## Overview 

Statiz is a simple, module static website builder that focuses on getting the job done. 
Compared to other website builders, Statiz aims to provide a simple experience for website build, serve and deploy, without 
any config or framework to learn. 

## How to install

Run the following command

```
git clone git@github.com:aclarembeau/statiz.git /usr/local/bin
echo "#!/bin/sh\nnode statiz/main.js \"$@\"" > /bin/statiz"
chmod +x /bin/statiz
```

## How to use

```
statiz build ./source           : Build your website for production
statiz serve ./source           : Serve and build your website for development
statiz deploy ./source          : Deploy your website online
statiz add-plugin PLUGIN        : Install a specific plugin
statiz remove-plugin PLUGIN     : Uninstall a specific plugin
statiz list-plugins             : List all installed plugins
statiz upgrade                  : Upgrade statiz source 
```

## Roadmap 

- [ ] Plugins system 
- [ ] Default plugin: EJS 
- [ ] Default plugin: SASS
- [ ] Default plugin: IMAGES 
- [ ] Explain how to create plugin 

## Plugins

WIP 
