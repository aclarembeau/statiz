# Statiz

A simple, modular, next generation static website builder.

## Overview

Statiz is a simple, module static website builder that focuses on getting the job done. Compared to other website
builders, Statiz aims to provide a simple experience for website build, serve and deploy, without any config or
framework to learn.

## How to install

Run the following command

```
sudo rm -rf /usr/local/bin/statiz;
sudo rm -rf /usr/local/bin/statiz-src;
sudo mkdir -p /usr/local/bin/statiz-src; 
sudo chmod 777 -R /usr/local/bin/statiz-src;
git clone git@github.com:aclarembeau/statiz.git /usr/local/bin/statiz-src; 
git config --global --add safe.directory /usr/local/bin/statiz-src;
sudo touch "/usr/local/bin/statiz";
sudo chmod 777 -R /usr/local/bin/statiz;
echo "#\!/bin/sh\nnode /usr/local/bin/statiz-src/index.js \"\$@\"" > "/usr/local/bin/statiz";
npm --prefix /usr/local/bin/statiz-src i;  
```

## How to use

To create a new website and see it on your browser

```
statiz new yourdirectory 
cd yourdirectory 
statiz serve
```

Then, build it on production with

```
statiz build
```

## Roadmap

- [ ] Plugins system
- [ ] Default plugin: EJS
- [ ] Default plugin: SASS
- [ ] Default plugin: IMAGES
- [ ] Explain how to create plugin

## Plugins

WIP 
