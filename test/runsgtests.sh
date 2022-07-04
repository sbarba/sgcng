#!/bin/zsh

/Applications/MAMP/bin/stop.sh
/Applications/MAMP/bin/start.sh
node_modules/.bin/cypress run --browser chrome --spec cypress/e2e/
/Applications/MAMP/bin/stop.sh
