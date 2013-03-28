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


/****************************************************************************
This is an interface for implementing a ViewController  object.
This object will return an abstrct object that can be implemented 
depending on the requirements. The rule of thumb being that any controller
actio n will take in the view name and undergo the following 4 steps in that 
order (a) pre-processing (b) loading the view (c) initializing the view and 
(d) post proicessing
******************************************************************************/

var ViewController = function() {
    var _viewName;

    var _preProcess = function(viewName){
        console.log("_preProcess");
    };

    var _loadView = function(viewName){
        console.log("_loadView");
    };

    var _initView = function(viewName){
        console.log("_initView");
    };

    var _postProcess = function(viewName){
        console.log("_postProcess");
    };

    return { //just gave my method a closure!

      Process : function(viewName){
        _viewName = viewName;

        _preProcess(_viewName);
        _initView(_viewName);
        _loadView(_viewName);
        _postProcess(_viewName);

      },

      definePreProcess : function(fn) {
        _preProcess = fn;
      },

      defineLoadView : function(fn) {
        _loadView = fn;
      },

      defineInitView : function(fn) {
        _initView = fn;
      },

      definePostProcess : function(fn) {
        _postProcess = fn;
      }

    };

 };

/******************* TEST CODE: Example on how to use it **************************

    var viewName = "test-view";
    
    var myViewController = ViewController(); //just gave it a closure!

    //providing the interface methods my own myViewController specific implementation

    myViewController.definePreProcess(function(){
      console.log("inside myViewController preProcess");
    });

     myViewController.defineLoadView(function(){
      console.log("inside myViewController loadView");
    });

      myViewController.defineInitView(function(){
      console.log("inside myViewController initView");
    });

       myViewController.definePostProcess(function(){
      console.log("inside myViewController postProcess");
    });

    //calling the Process method and passing the viewName

    myViewController.Process(viewName);

  ***********************************************************************************/
