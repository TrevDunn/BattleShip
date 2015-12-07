'use strict';
// Client-Side Logic, Models, Ajax, jQuery; possibly Angular??

let socket = io();
let myUser;
let myId;
let token;


/////////////////////
// Event Listeners //
/////////////////////

$(function() {
	// navigate to sign-up page
	$('#signuplink').click((event) => {
   	   event.preventDefault();
      $('.user-login').hide();
      $('.user-signup').show();
    });

	//
	$('#signup-submit').click((event) => {
  		signup();
    });

  	$('#signup-password').keypress(function(event) {
  		if(event.keyCode === 13) {
  			signup();
  		}
  	});

    $('#loginlink').click((event) => {
  		event.preventDefault();
      $('.user-signup').hide();
      $('.user-login').show();
    });

    // login user using token
    $('#login-submit').click((event) => {
  		login();
    });

  	// allow user to press "enter" to login
  	$('#login-password').keypress(function(event) {
  		if(event.keyCode === 13) {
  			login();
  		}
  	});

    // Message entered
    $('#message').keypress(function(event) {
      if(event.keyCode === 13) {
        enterMessage();
      }
    });

    $('#msg-submit').click((event) => {
      event.preventDefault();

  		enterMessage();
    });

    // $('#start-round').click((event) => {
    //   event.preventDefault();
	//
    //   $.ajax({
    //     url: 'https://localhost:3000/startRound'
    //   });
    // });
})


////////////////////////
// Controle Functions //
////////////////////////

let getCurrentUser = function(allUsers, currentUserId) {
  for(let i = 0, j = allUsers.length; i < j; i++) {
    if(allUsers[i]['id'] === currentUserId) {
      return allUsers[i];
    }
  }
}


let login = function() {
	event.preventDefault();

	let username = $("#login-username").val();
	let password = $("#login-password").val();
	let userData = {
		username: username,
		password: password
	}

	myUser = username;
	myId = socket.id;
	socket.emit('add user', username);

	$.ajax({
		url: "/user/auth",
		method: "POST",
		data: userData

	}).done((user) => {
		localStorage.setItem('userToken', user.token);
		$('.container').show();
		$('.user-login').hide();
	});
}

let signup = function() {
	let username = $("#signup-username").val();
	let password = $("#signup-password").val();
	let userData = {
		username: username,
		password: password,
		wins: 0
	}
	console.log('hit: signup function');
	$.ajax({
		url: "/user/signup",
		method: "POST",
		data: userData
	}).done(() => {
			$('.user-signup').hide();
			$('.user-login').show();
	});
}

let buildOcean = function(){

	//creates the div game-board
	var tempBoard = document.createElement('div');
	tempBoard.className = 'game-board';
	tempBoard.id = 'guess-board';
	document.querySelector('div#container').appendChild(tempBoard);

	//creates 'latitude' rows to contain individual square spaces
	for (var i = 0; i < oceanBoardArray.length; i++) {
		var tempRow = document.createElement('div');
		tempRow.classList.add('latitude');
		tempRow.id = ('row' + i)  //Look up classList() use on MDN: Can we pass a variable (i) here? YES
		tempBoard.appendChild(tempRow);

		//Using nested for functions to create Square divs within each appended row
		for (var j = 0; j < oceanBoardArray[i].length; j++) {
			var tempSquares = document.createElement('div');
			tempSquares.id = 'empty';
			tempSquares.classList.add('square-space');
			tempSquares.setAttribute('x-lat', i);
			tempSquares.setAttribute('y-lon', j);
			tempSquares.innerHTML = oceanBoardArray[i][j];
			tempSquares.addEventListener('click', (function(){

				//turns divs to buttons
				if ((this.id === 'empty') && (computerBoard[parseInt(this.getAttribute('y-lon'))][parseInt(this.getAttribute('x-lat'))] != '&nbsp')) {
					this.id = 'hit';
					this.innerHTML = 'X';
					var coordinates = computerBoard[parseInt(this.getAttribute('y-lon'))][parseInt(this.getAttribute('x-lat'))]
					switch (coordinates) {
						case 'A':
							compCordsA[0]++;
							break;
						case 'B':
							compCordsB[0]++;
							break;
						case 'C':
							compCordsC[0]++;
							break;
						case 'D':
							compCordsD[0]++;
							break;
						case 'F':
							compCordsF[0]++;
							break;
						default:
							console.log('Something went wrong.')
					};
					GameModule.hitCheck();
					GameModule.winState();
				} else if (this.id === 'empty') {
					countdown--;
					tempTimer.innerHTML = (':' + countdown);
					this.id = 'miss';
					this.innerHTML = '•';
					GameModule.loseState();
				};

			}));
	};
}
}
