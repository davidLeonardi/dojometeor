var profile = (function(){
    return {
        resourceTags: {
            amd: function(filename, mid) {
                return /\.js$/.test(filename);
            },    

            test: function(filename, mid) {
                return /\/test\//.test(mid);
            }
        }
    };
})();