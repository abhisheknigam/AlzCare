REFRESH=`cat refresh.dat`
CLIENT_ID="amzn1.application-oa2-client.0771dbfd0491474698e634699782b00e"
CLIENT_SECRET="52c03e0e6aea0746f1b060116da6c171f45f27e2b8643b0dbdfc2b353d730acf"
GRANT_TYPE="refresh_token"
REDIRECT_URI="https://localhost:9745/authresponse"

curl -X POST --data "grant_type=${GRANT_TYPE}&refresh_token=${REFRESH}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}" https://api.amazon.com/auth/o2/token | tee refresh_token.log | python -c "import sys,json;t1=open('token.dat','w');t2=open('refresh.dat','w');x=sys.stdin.readline(); t1.write(json.loads(x)['access_token']);t2.write(json.loads(x)['refresh_token']);"
