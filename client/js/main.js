var scanjsModule = angular.module('scanjs', ['ui.bootstrap']);
var panels;

angular.element(document).ready(function() {
  //makes navbar shows/hides elements with the 'panel' class
  panels=document.getElementsByClassName("panel");
  document.querySelector("#header").addEventListener("click", function(evt){
    var active=evt.target.id.split('-')[0]+"-wrapper";
    Array.prototype.forEach.call(panels,function(panel){
      panel.classList.toggle("hidden",panel.id!=active);
    });
    if(active=='experiment-wrapper'){
      //fixes bug where codemirror is blank until you click it
      var experimentCtrlScope = angular.element(document.getElementById("experiment-wrapper")).scope();
      experimentCtrlScope.codeMirror.refresh();
    }
  });

  //Hack since angular doesn't support file inputs yet :(
  var jsInput = document.getElementById("scan-file-input");
  var fileHandler = angular.element(jsInput).scope().handleFileUpload;
  jsInput.addEventListener("change", function(evt) {
    fileHandler(this.files);
  });

  // loading codeMirror requires the textArea
  var scanCtrlScope = angular.element(document.getElementById("scan-wrapper")).scope();
  scanCtrlScope.codeMirror = new CodeMirror(document.getElementById('codeMirrorDiv'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'mdn-like',
    value: "",
    readOnly:true,
    tabsize: 2,
    styleActiveLine: true
  });

  var experimentCtrlScope = angular.element(document.getElementById("experiment-wrapper")).scope();
  experimentCtrlScope.codeMirror = new CodeMirror(document.getElementById('experiment-mirror'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'mdn-like',
    value: "a.innerHTML = somethingFromUser",
    tabsize: 2,
    styleActiveLine: true
  });



});
