#!/bin/sh

# Replace variables in the config template
envsubst < /etc/pgbouncer/pgbouncer.template.ini > /etc/pgbouncer/pgbouncer.ini

# Start PgBouncer directly
exec pgbouncer /etc/pgbouncer/pgbouncer.ini
