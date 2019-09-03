var myInstance = (function() {
    var privateVar = "";

    function privateMethod() {}

    return {
        // public interface
        publicMethod1: function() {
            // all private members are accesible here
        },
        publicMethod2: function() {}
    };
})();

export { myInstance };
