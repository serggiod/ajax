var ajax = new XMLHttpRequest();
    ajax.schema  = new Object();
    ajax.request = ()=>{

        ajax.open(ajax.schema.method,ajax.schema.url);

        if(ajax.schema.headers){
            for(key in ajax.schema.headers){
                ajax.setRequestHeader(key,ajax.schema.headers[key]);
            }
        }
        
        ajax.onreadystatechange = ()=>{
            if(ajax.readyState===4 && ajax.status===200){
                let header = ajax.getResponseHeader('Content-Type');
                let response = null;
                    if(header.indexOf('json')>=1) response = JSON.parse(ajax.responseText);
                    else response = ajax.responseText;
                    ajax.schema.callback(response);                
            }
        };

        if(ajax.schema.method==='POST'||ajax.schema.method==='PUT'){
           if(ajax.schema.body) ajax.send(ajax.schema.body);
            else ajax.send(null);
        } else ajax.send(null);

    };
    ajax.header = (headers)=>{
        if(typeof(headers)==='object') ajax.schema.headers=headers;
        return ajax;
    };
    ajax.body = (body)=>{
        if(typeof(body)==='object') ajax.schema.body=JSON.stringify(body);
        return ajax;
    };
    ajax.params  = (params)=>{
        let url = null;
            if(typeof(params)==='object') for(x in params) url += '&' + x + '=' + params[x];
            ajax.schema.url = url;
            return ajax;
    };
    ajax.get = (url,callback)=>{
        if(ajax.schema.url){
            if(url.indexof('?')>=1) ajax.schema.url = encodeURI(url + ajax.schema.url); 
            else ajax.schema.url = encodeURI(url + '?' + ajax.schema.url);}
        else ajax.schema.url = encodeURI(url);
        ajax.schema.method = 'GET';
        ajax.schema.callback = callback;
        ajax.request();
    };
    ajax.post       = (url,callback)=>{
        if(ajax.schema.url){
            if(url.indexof('?')>=1) ajax.schema.url = encodeURI(url + ajax.schema.url); 
            else ajax.schema.url = encodeURI(url + '?' + ajax.schema.url);}
        else ajax.schema.url = encodeURI(url);
        ajax.schema.method = 'POST';
        ajax.schema.callback = callback;
        ajax.request();
    };
    ajax.put        = (url,callback)=>{
        if(ajax.schema.url){
            if(url.indexof('?')>=1) ajax.schema.url = encodeURI(url + ajax.schema.url); 
            else ajax.schema.url = encodeURI(url + '?' + ajax.schema.url);}
        else ajax.schema.url = encodeURI(url);
        ajax.schema.method = 'PUT';
        ajax.schema.callback = callback;
    };
    ajax.delete     = (url,callback)=>{
        if(ajax.schema.url){
            if(url.indexof('?')>=1) ajax.schema.url = encodeURI(url + ajax.schema.url); 
            else ajax.schema.url = encodeURI(url + '?' + ajax.schema.url);}
        else ajax.schema.url = encodeURI(url);
        ajax.schema.method = 'DELETE';
        ajax.schema.callback = callback;
        ajax.request();
    };
    module.exports = ajax;