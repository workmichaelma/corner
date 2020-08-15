echo Start: init Let’s Encrypt Environment
apt-get update && apt-get install wget -y
rm -rf /var/cache/apk/*;
wget https://letsencrypt.org/certs/fakelerootx1.pem;
mv fakelerootx1.pem /etc/ssl/certs;
update-ca-certificates --fresh;
echo Done: init Let’s Encrypt Environment

npm run dev;