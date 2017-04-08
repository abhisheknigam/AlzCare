CLIENT_ID="amzn1.application-oa2-client.0771dbfd0491474698e634699782b00e"
CLIENT_SECRET="52c03e0e6aea0746f1b060116da6c171f45f27e2b8643b0dbdfc2b353d730acf"
CODE="ANfljMPETSMMNTNmOoPf"
GRANT_TYPE="authorization_code"
REDIRECT_URI="https://localhost:9745/authresponse"

curl -X POST --data "grant_type=${GRANT_TYPE}&code=${CODE}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}" https://api.amazon.com/auth/o2/token
