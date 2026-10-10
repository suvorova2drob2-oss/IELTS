#!/bin/bash
set -e
TAR=/tmp/ielts-upload.tar

DIRS="/var/www/ielts /var/www/html/ielts"
# Built single-file index.html is >1 MB; source index.html files are tiny and must not be overwritten.
for f in $(find /var/www /srv /opt /home /root -name index.html -size +1000k 2>/dev/null); do
  if grep -q "IELTS Expert" "$f"; then
    DIRS="$DIRS $(dirname "$f")"
  fi
done

for d in $(echo $DIRS | tr ' ' '\n' | sort -u); do
  mkdir -p "$d"
  tar -xf "$TAR" -C "$d"
  echo "updated: $d"
done
rm -f "$TAR"

echo
echo "--- nginx (where /ielts is served from) ---"
nginx -T 2>/dev/null | grep -nE "server_name|location|root |alias|proxy_pass" | head -40
echo
echo UNPACKED-OK
