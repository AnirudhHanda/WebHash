let started = false;
let level = 0;
let moves = 0;

let body = document.querySelector("body");
let twoPlayer = document.querySelector("#twoPlayer");
let onePlayer = document.querySelector("#onePlayer");



let arr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
const winCombinations = [
    ["zero", "one", "two"],
    ["three", "four", "five"],
    ["six", "seven", "eight"],
    ["zero", "three", "six"],
    ["one", "four", "seven"],
    ["two", "five", "eight"],
    ["zero", "four", "eight"],
    ["two", "four", "six"],
];

let cross = document.querySelector(".cross");
let zero = document.querySelector(".zero1");

let user;
let zeroImg = "assets/zero.png";
let crossImg = "assets/cross.png";
// let randomPosIndex;

let computerMode = true;

twoPlayer.addEventListener("click", ()=>{
    computerMode = false;
})

onePlayer.addEventListener("click", ()=>{
    computerMode = true;
})

function selectChoiceCross(){
    started = true;
    user = "cross";
    cross.classList.add("opacity");
    userImg = "assets/cross.png";
    compImg = "assets/zero.png";

    zero.removeEventListener("click", selectChoiceZero);
}

function selectChoiceZero(){
    started = true;
    user = "zero";
    zero.classList.add("opacity");
    userImg = "assets/zero.png";
    compImg = "assets/cross.png";

    cross.removeEventListener("click", selectChoiceCross);
}

if(!started){
    cross.addEventListener("click", selectChoiceCross);
    zero.addEventListener("click", selectChoiceZero);
}

// if(started == true){
//     cross.removeEventListener("click", selectChoiceCross);
//     zero.removeEventListener("click", selectChoiceZero);

// }
let remainingPositions = arr.length;


function randomPos(){
        if(!started){
            return;
        }
        // console.log("arr.length: ", arr.length);
        // console.log("remainingPositions: ", remainingPositions);
        if(arr.length > 0){
            let randomPosIndex = Math.floor(Math.random() * arr.length);
            // console.log(`rand: ${rand}`);
            let select = document.querySelector(`.${arr[randomPosIndex]}`);
            // console.log("random: ", arr[randomPosIndex]);
            let img = document.createElement("img");
            img.src = compImg;
            // console.log(img);
            img.style.height = "74px";
            img.style.width = "240px";
            select.append(img);
            // console.log("Hello");
            arr.splice(randomPosIndex, 1);
            // console.log("hello2");
            remainingPositions--;
            select.removeEventListener("click", userPush);
            moves++;
            checkResult();
        }    
        else{
            started = false;
        }

}

let divs = document.querySelectorAll(".box");
// console.log(divs);
function userPush(){
    if(!started){
        return;
    }
    
    let clicked = this;
    // console.log(clicked);
    let select = clicked.getAttribute("id");

    // let elementToRemove = select;
    let indexToRemove = arr.indexOf(select);
    // console.log(elementToRemove);
    if(indexToRemove != -1){
        arr.splice(indexToRemove, 1);
    }

    let element = document.querySelector(`#${select}`);
    let img = document.createElement("img");
    // img.src = userImg;
    img.style.height = "74px";
    img.style.width = "240px";
    // console.log(img);
    // console.log(select);
    // element.append(img);
    // started = true;
    clicked.removeEventListener("click", userPush);
    // select.appendChild(img);


    cross.removeEventListener("click", selectChoiceCross);
    zero.removeEventListener("click", selectChoiceZero);

    if(computerMode){
        img.src = userImg;
        img.style.height = "74px";
        img.style.width = "240px";
        // console.log(img);
        // console.log(select);
        element.append(img);
        moves++;
        checkResult();

        setTimeout(()=>{
            smartComputerMove();
        }, 200);
    } else{
        if(user == "zero"){
            img.src = zeroImg;
            element.append(img);
            user = "cross";
        } else{
            img.src = crossImg;
            element.append(img);
            user = "zero";
        }
        moves++;
        checkResult();
    }
}

for(div1 of divs){
    // console.log(div1);
    div1.addEventListener("click", userPush);
}

// randomPos();

function checkResult(){
    if(moves >=5){
        // check for a win condition
        if(checkWin(userImg)){
            let over = document.createElement("div");
            over.classList.add("over");
            over.classList.add("container-fluid");
            if(userImg === zeroImg){
                over.innerText = "O - WON!";
            } else{
                over.innerText = "X - WON!"
            }
            setTimeout(()=>{
                body.append(over);
            }, 100);
            setTimeout(()=>{
                over.remove();
            }, 2000);

            setTimeout(()=>{
                resetGame();
            }, 400);
        }else if(checkWin(compImg)){
            console.log("Computer Wins");

            let over = document.createElement("div");
            over.classList.add("over");
            over.classList.add("container-fluid");
            if(compImg === zeroImg){
                over.innerText = "O - WON!";
            } else{
                over.innerText = "X - WON!"
            }
            setTimeout(()=>{
                body.append(over);
            }, 100);
            setTimeout(()=>{
                over.remove();
            }, 2000);

            setTimeout(()=>{
                resetGame();
            }, 400);
        } else if(moves === 9){
            console.log("Draw");

            let over = document.createElement("div");
            over.classList.add("over");
            over.classList.add("container-fluid");
            over.innerText = "DRAW";
            setTimeout(()=>{
                body.append(over);
            }, 100);
            setTimeout(()=>{
                over.remove();
            }, 2000);

            setTimeout(()=>{
                resetGame();
            }, 400);
        }
    }
}

function checkWin(playerImg){
    console.log(playerImg);
    for(const combination of winCombinations){
        try{
            const cell1 = document.getElementById(combination[0]);
            console.log(cell1.querySelector("img").getAttribute("src"));
            const cell2 = document.getElementById(combination[1]);
            console.log(cell2);
            const cell3 =document.getElementById(combination[2]);
            console.log(cell3);
            if(
                cell1 != null && cell1.querySelector("img") !== null &&
                cell2 != null && cell2.querySelector("img") !== null &&
                cell3 != null && cell3.querySelector("img") !== null
            ){
                if(
                    cell1.querySelector("img").getAttribute("src") === playerImg &&
                    cell2.querySelector("img").getAttribute("src") === playerImg &&
                    cell3.querySelector("img").getAttribute("src") === playerImg
                ){
                    console.log("match");
                    return true;
                }
            }
        }
        catch(error){
            console.log(error);
        }
       
    }
    return false;
}


function resetGame() {
    // Clear the board by removing all <img> elements from cells
    const cells = document.querySelectorAll(".box");
    cells.forEach((cell) => {
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
    });
  
    // Reset game-related variables
    started = false;
    moves = 0;
  
    // Re-enable event listeners for cells, cross, and zero elements
    cross.addEventListener("click", selectChoiceCross);
    zero.addEventListener("click", selectChoiceZero);
  
    cross.classList.remove("opacity");
    zero.classList.remove("opacity");

    for (const div1 of divs) {
      div1.addEventListener("click", userPush);
    }
  
    // Re-initialize your arrays if needed
    arr = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
    used = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"];
    remainingPositions = arr.length;
  }


// smart computer function
function smartComputerMove() {
    if(started == false){
        return;
    }
     // Check for a winning move
  for (const combination of winCombinations) {
    const [cell1Id, cell2Id, cell3Id] = combination;
    const cell1 = document.getElementById(cell1Id);
    const cell2 = document.getElementById(cell2Id);
    const cell3 = document.getElementById(cell3Id);

    const img1Src = cell1.querySelector("img")?.getAttribute("src");
    const img2Src = cell2.querySelector("img")?.getAttribute("src");
    const img3Src = cell3.querySelector("img")?.getAttribute("src");

    if (
      img1Src === compImg &&
      img2Src === compImg &&
      !img3Src // The third cell is empty
    ) {
      // Make the winning move
      makeMove(cell3);
      return;
    }

    if (
      img1Src === compImg &&
      img3Src === compImg &&
      !img2Src // The second cell is empty
    ) {
      makeMove(cell2);
      return;
    }

    if (
      img2Src === compImg &&
      img3Src === compImg &&
      !img1Src // The first cell is empty
    ) {
      makeMove(cell1);
      return;
    }
  }

  // Check for a blocking move
  for (const combination of winCombinations) {
    const [cell1Id, cell2Id, cell3Id] = combination;
    const cell1 = document.getElementById(cell1Id);
    const cell2 = document.getElementById(cell2Id);
    const cell3 = document.getElementById(cell3Id);

    const img1Src = cell1.querySelector("img")?.getAttribute("src");
    const img2Src = cell2.querySelector("img")?.getAttribute("src");
    const img3Src = cell3.querySelector("img")?.getAttribute("src");

    if (
      img1Src === userImg &&
      img2Src === userImg &&
      !img3Src // The third cell is empty
    ) {
      // Block the user's winning move
      makeMove(cell3);
      return;
    }

    if (
      img1Src === userImg &&
      img3Src === userImg &&
      !img2Src // The second cell is empty
    ) {
      makeMove(cell2);
      return;
    }

    if (
      img2Src === userImg &&
      img3Src === userImg &&
      !img1Src // The first cell is empty
    ) {
      makeMove(cell1);
      return;
    }
  }

  // If no winning or blocking move, make a random move
  randomPos();
}

let reset = document.querySelector("#reset");

reset.addEventListener("click", ()=>{
    resetGame();
});

function makeMove(cell) {
    // Make the move by placing the computer's symbol in the cell
    const img = document.createElement("img");
    img.src = compImg;
    img.style.height = "74px";
    img.style.width = "240px";
    cell.appendChild(img);
    arr.splice(arr.indexOf(cell.id), 1);
    remainingPositions--;
    cell.removeEventListener("click", userPush);
    moves++;
    checkResult();
  }