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

(function(){
	


	window.Firefly = {

		test : function() {
			console.log("There's no place I can be, since I've found Serinity");
			console.log("And you can't take the sky from me!");
		},

		clone : function(obj){

			if(!obj || typeof obj === 'function'){
				return {}; //returning a blank object
			}
			var clone = clone || {};
			for(var i in obj){
				clone[i] = obj[i];
			}

			return clone;
		},
		//following function inherits from the parent object
		//and returns the child class. This is done via prototypal
		//inheritance
		inherit : function(parent){
			if(!parent || typeof parent !== 'object'){
				return new Error("firefly.inherit(parent): parent argument not an object")
			}

			var child = {};
			var intermdFn = function() {};
			parent.prototype = intermdFn.prototype;
			child.prototype = intermdFn.prototype;
			child.prototype.constructor = child;
			child.uber = parent.prototype;

			return child;
		},
		//following method extends the child object with the same 
		//prototype as the parent object via prototypal inheritance
		extend : function(child, parent){
			if(!parent || !child || typeof parent !== 'object' || typeof child !== 'object'){
				return new Error("firefly.extent(child,parent): incomaptible or missing objects");
			}

			var intermdFn = function() {};
			parent.prototype = intermdFn.prototype;
			child.prototype = intermdFn.prototype;
			child.prototype.constructor = child;
			child.uber = parent.prototype;
		},
		//following method creates a deep copy, of the 
		//parent object to the child object
		deepClone : function(child, parent){
		   if(!parent || !child || typeof parent !== 'object' || typeof child !== 'object'){
				return new Error("firefly.clone(child,parent): incomaptible or missing objects ");
		   }

		   for(var i in parent){
		     if(typeof parent[i] === 'object'){
		     //making sure we are copying the object attributes
		     //and not their references
		       child[i] = (parent[i].constructor === Array) ? [] : {};
		       deepCopy(child[i], parent[i]);
		     }else{
		       child[i] = parent[i];
		     }
		   }
		   return child;
		},
		//following method creates, extebnds and augments the child object 
		//from a parent object with additional properties. 
		//This is same as ECMA's Object.create except it creates a reference
		//to the superclass as 'uber'
		quickCreate : function(baseObj, newProps){
		   if(!baseObj || !newProps || typeof baseObj !== 'object' || typeof newProps !== 'object'){
				return new Error("firefly.quickCreate(baseObj,newProps: incomaptible or missing objects ");
		   }

		   var retObj;
		   function intermdFn() {};
		   intermdFn.prototype = baseObj;

		   retObj = new intermdFn();
		   //this is something Object.create doesn't do!
		   retObj.uber = baseObj;

		   for(var i in newProps){
		     retObj[i] = newProps[i];
		   }
		   return retObj;

		},
		//curry function implementation
		curry : function(Fn){

			if(!fn || typeof Fn !== 'function'){
				return new Error("firefly.curry(fn): a non function is passed as the argument")
			};
			
			if(arguments.length < 2){
		      return Fn;
		    };

		    var _method = Fn;
		    var args = Array.prototype.slice.apply(arguments, [1]);
		    return function(){
		        return _method.apply(null, args.concat(Array.prototype.slice.call(arguments)));
		    }
		},
		//lets do some ajax requests , Malcom style!
		sendRequest : function(url, type, param, success, failure, async){
			var request = new XMLHttpRequest();
    
		    if(!async){
		     async = true;
		    };

		    request.onreadystatechange = callbacks;
		    request.open(type, url, async);  
		    request.send(param);
		    callbacks();


		    function callbacks() {
		     if (request.readyState === 4) {
		        
		        if (request.status === 200) {
		         if(success && typeof(success)==='function')
		            success(request);
		        } else {
		         if(failure && typeof(failure)==='function')
		           failure(request);
		        }
		     }
		    };
		}

	};

	//invoking the object to the global scope.
	window.firefly = firefly =  Firefly;
})();
