"use strict";

function TriggerButton(btn, scope, row, col)
{
	btn.classList.add("active");
	scope.$emit("button:press", { row: row, col: col });
	
	setTimeout(function() {
		btn.classList.remove("active");
	}, 200);
}

angular.module("modulator.app")
.directive("buttonset", ["config", function(config) {
	return {
		restrict: "E",
    	replace: "true",
    	template: "<table></table>",
		link: function(scope, elem, attrs) {
			var rows = config.rows;
			var cols = config.cols;
			var table = elem[0];
			
			for (var row = 0; row < rows; row++) {
				var tr = table.insertRow(row);
				
				for (var col = 0; col < cols; col++) {
					(function(row, col) {
						var td = tr.insertCell(col);
						td.classList.add("button");
						
						td.addEventListener("mousedown", function(e) {
							scope.$emit("button:trigger", { row: row, col: col });
						});
					})(row, col);
				}
			}
			
			// trigger UI changes on button:trigger events
			scope.$on("button:trigger", function(evt, data) {
				console.log(data);
				var btn = table.rows[data.row].cells[data.col];
				
				btn.classList.add("active");
				scope.$emit("button:press", { row: data.row, col: data.col });
				
				setTimeout(function() {
					btn.classList.remove("active");
				}, 200);
			});
		}
	};
}]);