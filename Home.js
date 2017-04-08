

function Getname()
{
	var name;
	document.getElementById("name").innerHTML = "name.value";//get name from user
	
}function Getinfo(response){
  var results = response.results;
  var i = 0;
  var rows = results.map(function(item){
     i++;
    return createRow();
  });
  rows.forEach(function(row){
    document.getElementById("alist").appendChild(row);
  });
}



