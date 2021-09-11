
const getQueryParams = (params) => {
    var vars = (window.location.hash.split('?')[1]).split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == params){
          return pair[1]
        }
    }
    return(false);
}

export {
    getQueryParams
}

