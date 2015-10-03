angular.module("modulator.app")
.directive("buttonset", function() {
	return {
		restrict: "E",
    	replace: "true",
    	template: "<table></table>",
		link: function(scope, elem, attrs) {
			var rows = parseInt(attrs.rows);
			var cols = parseInt(attrs.cols);
			var table = elem[0];
			
			for (var row = 0; row < rows; row++) {
				var tr = table.insertRow(row);
				
				for (var col = 0; col < cols; col++) {
					(function(row, col) {
						var td = tr.insertCell(col);
						td.classList.add("button");	
						
						td.addEventListener("mousedown", function(e) {
							e.target.classList.add("active");
							scope.$emit("button:press", [{ row: row, col: col }]);
							
							setTimeout(function() {
								e.target.classList.remove("active");
							}, 200);
						});
					})(row, col);
				}
			}
		}
	};
});