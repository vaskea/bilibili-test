Example Postman 

POST http://localhost:3000/encrypt
Body:
{ "foo": 321, "bar": 514, "baz": 11111 }

Response:
"bar=514&baz=11111&foo=321&wts=1741117669&w_rid=6acd17608830215a964dfa4995e07e30"
