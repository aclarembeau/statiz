# Statiz 
A simple, modular, next generation static website builder. 

## Overview 

Statiz is a simple, module static website builder that focuses on getting the job done. 
Compared to other website builders, Statiz aims to provide a simple experience for website build, serve and deploy, without 
any config or framework to learn. 

## How to install

Run the following command

```
sudo rm -rf /usr/local/bin/statiz;
sudo rm -rf /usr/local/bin/statiz-src;
sudo mkdir -p /usr/local/bin/statiz-src; 
sudo chmod 777 -R /usr/local/bin/statiz-src;
git clone git@github.com:aclarembeau/statiz.git /usr/local/bin/statiz-src; 
sudo touch "/usr/local/bin/statiz";
sudo chmod 777 -R /usr/local/bin/statiz;
echo "#\!/bin/sh\nnode /usr/local/bin/statiz-src/main.js \"\$@\"" > "/usr/local/bin/statiz";
npm --prefix /usr/local/bin/statiz-src i;  
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
