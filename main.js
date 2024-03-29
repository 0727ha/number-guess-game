//랜덤번호 지정
//유저가 번호를 입력한다. 그리고go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.
//랜덤 번호가 <유저번호 면 down
//랜덤 번호가 >유저번호 면 up
//rest버튼을 누르면 게임이 리셋된다
//5번의 기회를 다 쓰면 게임이 끝난다.(더이상 추측 불가, 버튼이 disable)
//유저가 1-100 범위 밖에 숫자를 입력하면 알려준다.기회를 차감하지 않는다
//유저가 이미 입력한 숫자를 또 입력하면 알려준다.이때 기회를 차감하지 않는다

let computerNum = 0
let playButton = document.getElementById("playButton");//html의 코드를 갖고 온것임
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];
let randomButton = document.getElementById("randomButton");


playButton.addEventListener("click", play);//click자리에 mouse등의 다양한 이벤트를 적용할 수 있음,play를 변수처럼 넘김
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () { userInput.value = ""; });


function pickRandomNum() {
	computerNum = Math.floor(Math.random() * 100) + 1;
	console.log("정답", computerNum);
}
function play() {
	let userValue = userInput.value;
	if (userValue < 1 || userValue > 100) {
		resultArea.textContent = "1과 100사이의 숫자를 입력해 주세요!";
		return;
	}
	if (history.includes(userValue)) {
		resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요!";
		return;
	}
	chances--;
	chanceArea.textContent = `남은기회 : ${chances}번`;
	console.log("chance", chances);
	if (userValue < computerNum) {
		resultArea.textContent = "UP !!!";
	} else if (userValue > computerNum) {
		resultArea.textContent = "DOWN !!";
	} else {
		resultArea.textContent = "정답입니다 ~~";
		gameOver = true;
	}

	history.push(userValue)//history라는 배열에 저장
	console.log(history);
	if (chances < 1) {
		gameOver = true;
	}
	if (gameOver == true) {
		playButton.disabled = true;
	}
}


function reset() {
	//userinput창이 깨끗하게 정리되고
	userInput.value = "";
	//새로운 번호가 생성되고
	pickRandomNum()

	resultArea.textContent = "결과값이 여기 나옵니다";
}
pickRandomNum();
// input 상자의 기본값을 설정하는 함수
function setInputPlaceholder() {
	userInput.placeholder = '여기에 숫자를 입력하세요~';
}

// 페이지 로드 시 호출하여 기본값 설정
setInputPlaceholder();


