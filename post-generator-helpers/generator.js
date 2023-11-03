function generateText(){
    const possibleText = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-+ ';
    const possibleTextArray = possibleText.split("");
    let generatedTextArr = [];

    for(let i = 0; i < 248; i++){
        const randomValue = Math.floor(Math.random() * possibleTextArray.length);
        generatedTextArr.push(possibleTextArray[randomValue]);
    }

    const generatedText = generatedTextArr.join("");
    return generatedText;
}

function generateAuthor(){
    const author = ['Bartholomeuw', 'Kuma', 'Antonio', 'Inoki'];
    const randomIndex = Math.floor(Math.random() * author.length);
    const randomAuthor = author[randomIndex];
    console.log(randomAuthor);
    return randomAuthor;
}

function generateTimeStamp(){
    const year = 2023;
    const date = Math.floor(Math.random() * 31);
    const month = Math.floor(Math.random()*9);
    const newDate = new Date(year,month,date);
    console.log(newDate);
    return newDate;
}

//JSON.stringify will make array and oobject into a string.
//Values can be made into a text file.
function generatePosts(){
    let arrayOfObjects = [];
    for(let i = 1; i < 100; i++){
        let obj = {
            id: i,
            timestamp: generateTimeStamp(),
            author: generateAuthor(),
            post: generateText()
        }
        arrayOfObjects.push(obj);
    }
    return JSON.stringify(arrayOfObjects);
}

export default generatePosts;

/*
CREATED DB.JSON FILE WITH THIS CODE

  function downloadTextAsFile(){
    const blob = new Blob([generatePosts()], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    return (
      <a href={url} download='social_media_posts'>click</a>
    )
  }
*/