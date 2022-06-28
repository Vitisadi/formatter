// File Input
let editor;

document.getElementById('input-file')
  .addEventListener('change', getFile)

function getFile(event) {
	const input = event.target
  if ('files' in input && input.files.length > 0) {
    fromEditor();
    let extension = getFileExtention(input.files[0])
    extensionToLanguage(extension)
	  placeFileContent(
      document.getElementById('code'),
      input.files[0])
  }
}

function placeFileContent(target, file) {
	readFileContent(file).then(content => {
  	target.value = content
    toEditor()
  }).catch(error => console.log(error))
}

function readFileContent(file) {
	const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result)
    reader.onerror = error => reject(error)
    reader.readAsText(file)
  })
}

function getFileExtention(file){
  var name = file.name
  var extensions = name.split(".")
  return extensions[extensions.length - 1] //return last one
}

function extensionToLanguage(extension){ //changes language mode to match selected file format
  var selector = document.getElementById("language")

  switch(extension){
    case "pde": 
      selector.value = "java"
      break;
    case "py": 
      selector.value = "python"
      break;
    case "js": 
      selector.value = "javascript"
      break;
    case "html": 
      selector.value = "html"
      break;
    case "css": 
      selector.value = "css"
      break;
    case "cs": 
      selector.value = "csharp"
      break;
    case "xml": 
      selector.value = "xml"
      break;
    case "sql": 
      selector.value = "sql"
      break;
  }
}

//Formatter

let defaultLanguage = document.getElementById("language").value
setLanguage(defaultLanguage);

//Converts from editor to text area
function fromEditor(){
  if(editor){
    editor.toTextArea();
  }
}

//Converts from text area to editor
function toEditor(){
  var language = document.getElementById("language").value
  setLanguage(language);
}

function languageChange(){
  fromEditor()
  toEditor()
}

function setLanguage(language){
  var parserFile;
  var styleSheet;

  switch(language) {
      case "java":
        parserFile = ["../formatters/java/js/tokenizejava.js","../formatters/java/js/parsejava.js"]
        styleSheet = "formatters/java/css/javacolors.css"
        break;
      case "python":
        editor = CodeMirror.fromTextArea('code', {
            height: "650px",
            parserfile: ["../formatters/python/js/parsepython.js"],
            stylesheet: "formatters/python/css/pythoncolors.css",
            path: "js/",
            tabMode : "shift",
            textWrapping: false,
            indentUnit: 4,
            parserConfig: {'pythonVersion': 2, 'strictErrors': true},
        });
        return; //special case as needs additional info
      case "javascript":
        parserFile = ["../formatters/javascript/js/tokenizejavascript.js","../formatters/javascript/js/parsejavascript.js"]
        styleSheet = "formatters/javascript/css/jscolors.css"
        break;
      case "xml":
        parserFile = ["../formatters/xml/js/parsexml.js"]
        styleSheet = "formatters/xml/css/xmlcolors.css"
        break;
      case "css":
        parserFile = ["../formatters/css/js/parsecss.js"]
        styleSheet = "formatters/css/css/csscolors.css"
        break;
      case "html":
        editor = CodeMirror.fromTextArea('code', {
          height: "650px",
          parserfile: ["../formatters/html/js/parsehtmlmixed.js", "../formatters/html/js/parsexml.js"],
          stylesheet: "formatters/html/css/xmlcolors.css",
          path: "js/",
          tabMode : "shift",
          textWrapping: false,
          indentUnit: 4,
          enableEditMode: true,
          useHTMLKludges: false
      });
      return; //special case as needs additional info
      case "sql":
          parserFile = ["../formatters/sql/js/parsesql.js"]
          styleSheet = "formatters/sql/css/sqlcolors.css"
        break;
      case "csharp":
        parserFile = ["../formatters/csharp/js/tokenizecsharp.js","../formatters/csharp/js/parsecsharp.js"]
        styleSheet = "formatters/csharp/css/csharpcolors.css"
        break;
      default:
        alert("Error occured in selecting " + language)
    }

    editor = CodeMirror.fromTextArea('code', {
      height: "650px",
      parserfile: parserFile,
      stylesheet: styleSheet,
      path: "js/",
      tabMode : "shift",
      textWrapping: false,
      indentUnit: 4,
      enableEditMode: true,
    });
}

