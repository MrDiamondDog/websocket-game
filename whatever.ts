function triangleWord(word: string) {
    // word = wow
    //  w
    // o o
    //wowow
    let result = "";

    //  w
    result += " ".repeat(word.length - 1);
    result += word[0] + "\n";

    // o o
    const sliced = word.slice(1);
    for (let i = 0; i < sliced.length - 1; i++) {
        result += " ".repeat(sliced.length - i - 1);
        result += sliced[i];
        result += " ".repeat(i * 2 + 1);
        result += sliced[i];
        result += "\n";
    }

    //wowow
    result += word.split("").reverse().join("");
    if (word.length % 2 === 0) {
        result += word[0];
    }
    result += word.slice(1);

    return result;
}

console.log(triangleWord("aplle"));
