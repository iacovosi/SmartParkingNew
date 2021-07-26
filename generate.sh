#!/bin/bash

# create random password
PASSWDDB="smartParking"

MAINDB="smartParking"

# If /root/.my.cnf exists then it won't ask for root password
if [ -f /root/.my.cnf ]; then

    mysql -e "CREATE DATABASE ${MAINDB} /*\!40100 DEFAULT CHARACTER SET utf8 */;"
    mysql -e "FLUSH PRIVILEGES;"	
    mysql -e "CREATE USER ${MAINDB}@localhost IDENTIFIED BY '${PASSWDDB}';"
    mysql -e "GRANT ALL PRIVILEGES ON ${MAINDB}.* TO '${MAINDB}'@'localhost';"
    mysql -e "CREATE USER ${MAINDB}@'%' IDENTIFIED BY '${PASSWDDB}';"	
	mysql -e "GRANT ALL PRIVILEGES ON ${MAINDB}.* TO '${MAINDB}'@'%';"	
    mysql -e "CREATE USER 'root'@'%' IDENTIFIED BY '${PASSWDDB}';"	
	mysql -e "GRANT ALL PRIVILEGES ON ${MAINDB}.* TO 'root'@'%' WITH GRANT OPTION;"		
    mysql -e "FLUSH PRIVILEGES;"

# If /root/.my.cnf doesn't exist then it'll ask for root password   
else
    echo "Please enter root user MySQL password!"
    read rootpasswd
    mysql -uroot -p${rootpasswd} -e "CREATE DATABASE ${MAINDB} /*\!40100 DEFAULT CHARACTER SET utf8 */;"
    mysql -uroot -p${rootpasswd} -e "FLUSH PRIVILEGES;"
    mysql -uroot -p${rootpasswd} -e "CREATE USER ${MAINDB}@localhost IDENTIFIED BY '${PASSWDDB}';"
    mysql -uroot -p${rootpasswd} -e "GRANT ALL PRIVILEGES ON ${MAINDB}.* TO '${MAINDB}'@'localhost';"
    mysql -uroot -p${rootpasswd} -e "CREATE USER ${MAINDB}@'%' IDENTIFIED BY '${PASSWDDB}';"	
	mysql -uroot -p${rootpasswd} -e "GRANT ALL PRIVILEGES ON ${MAINDB}.* TO '${MAINDB}'@'%';"	
	mysql -uroot -p${rootpasswd} -e "CREATE USER 'root'@'%' IDENTIFIED BY '${PASSWDDB}';"	
	mysql -uroot -p${rootpasswd} -e "GRANT ALL PRIVILEGES ON ${MAINDB}.* TO 'root'@'%' WITH GRANT OPTION;"		
    mysql -uroot -p${rootpasswd} -e "FLUSH PRIVILEGES;"
fi

php artisan migrate:fresh --seed

php artisan serv --host=127.0.0.1 --port=80 &
