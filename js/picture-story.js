$(document).ready(function(){
	$("#home-image").click(function(){
        $("#about-head").text("Home");
		$("#about-text").html("Saratoga is home to a racetrack and the site of a critical Revolutionary War battle. Personally, I'm more interested in the nearby orchards, driving to Taco Bell at 2 A.M. for some Baja Blast, going downtown to play firsbee in the park, or kayaking in the summer. I think Saratoga is a fantastic town to grow up in, and I still try to visit home whenever I can.");
	});
	$("#china-image").click(function(){
        $("#about-head").text("China");
		$("#about-text").html("For a few years now I've wanted to study Mandarin, learn something so incredibly different from English or any other western language. So last summer when I was given the opportunity to travel to Kunming, China and study for a half semester at Yunnan University I jumped on it! While I started formal Mandarin studies the year before, I was not at all prepared for the demands of total immersion. That being said, apart from once trying to order milk tea from a dumpling shop... I did reasonably okay! Spending mornings in class and afternoons exploring the city with local language partners it really was an unforgettable experience.");
    });
	$("#gmo-image").click(function(){
        $("#about-head").text("Work");
		$("#about-text").html("For my first six-month co-op I knew I wanted to do something a little different than straight Computer Science. I wanted to work in an industry that applied the methods I was taught but built off of them. So I accepted a position at GMO, an asset management company as part of the Data Governance team. I use mostly SQL and a Data management platform in my day-to-day. What I <i>really</i> want to do is continue adding automation to the Data Governance workflow, so far its all been in-platform but I look forward to learning about API connectivity in creating external scripts to do some of the more menial data science work.");
    });
	$("#hobby-image").click(function(){
        $("#about-head").text("Hobbies");
		$("#about-text").html("When I'm not working or otherwise coding I like to do any number of things: whether it be meeting up with a friend to play some videogames, getting together with high school buddies for some <a href='http://tappedout.net/users/Nero64/mtg-decks/'><i>Magic: The Gathering</i></a>, going on an <a href='http://chevstravels.blogspot.com/'>adventure</a>, or just spending an afternoon reading a book. I feel it's important to find a balance.");
    });
	$("#italy-image").click(function(){
        $("#about-head").text("Italy");
		$("#about-text").html("One of the things I love to do most is travel: be it just a road trip with friends or spending a summer studying abroad I try to take every opportunity I can. After Freshman year, I joined a Northeastern program that spent a month exploring Italy. Focusing on science and technological developments after the Roman Empire, we spent a lot of the time learning about the Rennaissance and the many revolutions of the time period. Be it the expansive influence of Da Vinci or the economics of coffee, there was always something new to learn. I really do hope to get back some day.");
    });
	$("#school-image").click(function(){
        $("#about-head").text("Northeastern University");
		$("#about-text").html("Located in the heart of Boston, Northeastern has given me many of the tools I need to pursue a career in tech. From tutoring Fundamentals of Computer Science to building a <a href='http://nufiji.com/'>website</a> from scratch with my fraternity, nothing has seemed impossible.");
    });
    $("#coding-image").click(function(){
        $("#about-head").text("Programming Languages");
        $("#about-text").html("Over the past few years I've come into contact with a lot of different languages, each with their own subtle differences. Some of the ones I feel most comfortable using are (click on the language names to see examples):<ul><li><a href='https://github.com/oakreid/Commander-Damage-Tracker'>Java</a></li><li><a href='https://github.com/chevEldrid/chevEldrid.github.io'>HTML and CSS</a></li><li><a href='https://github.com/chevEldrid/chevEldrid.github.io/tree/master/js'>JavaScript</a></li></ul>");
    });
});