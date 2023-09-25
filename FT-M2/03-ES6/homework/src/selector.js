var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) resultSet.push(startEl);

  for (const child of startEl.children){
    const result = traverseDomAndCollectElements(matchFunc, child);
    resultSet = [...resultSet, ...result];
  }

  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if(selector[0] === "#") return "id";
  else if(selector[0] === ".") return "class";
  else if(selector.includes(".")) return "tag.class";

  else return  "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector); 
  var matchFunction;

  if (selectorType === "id") {
    matchFunction = (element) => {
      if(`#${element.id}` === selector) return true;
        return false;
    }
  } else if (selectorType === "class") {
      matchFunction = (element) => {
        for( const _class of element.classList){
          if( '.'+_class === selector) return true;
        }
        return false;
      }
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
      const [tag, className] = selector.split(".");

      return matchFunctionMaker(tag)(element) && matchFunctionMaker(`.${className}`)(element);
    }
  } else if (selectorType === "tag") {
    matchFunction = (element) => {
      if(element.tagName.toLowerCase() === selector) return true;
        return false;
    }
  }  
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  
  return elements;
};
