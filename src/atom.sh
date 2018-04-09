#!/bin/bash
vagrant up
vagrant ssh --command "atom --foreground /var/www/html"
