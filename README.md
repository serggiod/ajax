# ajax
Simple library for ajax request.

REFERENCE:

ajax = require('./ajax');

ajax.get(url,callback);
ajax.post(url,callback);
ajax.put(url,callback);
ajax.delete(url,callback);

url = String;
callback = function(response)

ESPECIAL:
ajax.header(json).body(json).params(json).get(url,callback);

json = {'key':'value'};


