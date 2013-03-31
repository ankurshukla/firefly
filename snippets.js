/***************************************************************************************************************
The MIT License

Copyright (C) 2013 Ankur Shukla
ankurshukla16@gmail.com
https://github.com/ankurshukla


Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
****************************************************************************************************************/


  //Singleton
  //since there are no classes in javascript, every object is technically a singleton
  //if you don't inherit from it or copy from it.
  var single = {};
  //Singleton Implementations
  //Declaring as a Global Object,,,,you are being judged!
  
  
  var Logger = function() {
    //global_log is/will be defined in GLOBAL scope here
    if(typeof global_log === 'undefined'){
      global_log = this;
    }
    return global_log;
  };
  
  
  //the below 'fix' solves the GLOABL variable problem but
  //the log_instance is publicly available and thus can be 
  
  //tampered with.
  function Logger() {
    if(typeof Logger.log_instance === 'undefined'){
      Logger.log_instance = this;
    }
  
  
    return Logger.log_instance;
   };
  
  
  //the correct way to do it to give it a closure!


  function logFactory() {
    var log_instance; //private instance
    var _initLog = function() { //private init method
      log_instance = 'initialized';
      console.log("logger initialized!")
    }
    return {
      getLog : function(){ //the 'privileged' method 
        if(typeof log_instance === 'undefined'){
          _initLog();
        }
        return log_instance;
      }
    };
  }
  
  
  //using the Logger singleton
  var logger = logFactory();//did i just gave LogFactory a closure?
  //create an instance of the logger
  var a = logger.getLog();
  //do some work
  //get another instance of the logger
  var b = logger.getLog();
  
  
  //check if the two logger instances are same?
  console.log(a === b); //true


  //Module pattern
  //all variables and functions declared (and executed) inside an anon function 
  // lives and the closure provides state and privacy to the variables and functions.
  //Sometimes we just don't want to use a GLOBAL variable but also want to declare our 
  //own. In such cases the Module pattern comes into play. 
  //The module pattern helps creating a global variable (or parent scoped variable)
  //by defining an anon function having 'privileged' members that are returned via
  //anon function's immediate execution i.e. providing it a closure.    
  
  //single global variable MODULE
  var MODULE = (function(){
    //private variable
    var _private = 'private value';
    var _method = function(){
      console.log('inside the private method')
    };
  
  
    //object litral that has the priviliged
    //members for the MODULE function. A similar anonymous
    //function could have been returned too
    var retObject = {
      priviligedMethod : function(){
        _method();
      },
      priviligedAttr : _private
    };


    //returning the object
    return retObject;
  
  })(); //giving the anon function a closure
          //so that MODULE get the retObject assigned
          //which has all the previliged members.
  
  
  //the global variable MODULE here has access to the privileged functions
  
  MODULE.priviligedMethod();
  console.log(MODULE.priviligedAttr);
  
  
  
  //now if you wish to extend the MODULE variable
  //somehwere else, in a different part of the code
  //which coule be same or different file, it can be done
  //via 'augmenting' the module pattern


  MODULE = (function(global_var){
    global_var.anotherMethod = function(){
      console.log("augmented the MODULE with anotherMethod");
    }
  
    return global_var;
  
  })(MODULE);// passing the 'old' MODULE method to the new MODULE.
  
  
  console.log(MODULE);
  
  //running the new MODULE
  //now will have the previliged methods
  // + the new public method
      
  MODULE.priviligedMethod();
  console.log(MODULE.priviligedAttr);
  MODULE.anotherMethod();
