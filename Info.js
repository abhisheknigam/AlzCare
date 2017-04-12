
function Getinfo()
{
	$.ajax({
    url: 'http://8805203b.ngrok.io',
    type: 'GET',
    success: function() { alert('Getinfo completed'); }
});
	
}
setInterval(Getinfo,5000);



