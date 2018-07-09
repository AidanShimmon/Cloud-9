// Check off specific Todos by clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click", "span", function (event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

//Take input text and add it to todo list when enter is pressed
$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//text from input
		var todoText = $(this).val();
		$(this).val("");
		//put into new li
		$("ul").append("<li><span><i class='fas fa-trash'></i></span> " + todoText + "</li>");
	}
});

$("i.fas.fa-pencil-alt").click(function(){
	$("input").toggleClass("inputToggle");
});
