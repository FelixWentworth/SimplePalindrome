var playerScores = [];

exports.getScores = function(req, res) 
{
    // take first 5 entries, entries are sorted when entered into array
    var top = playerScores.slice(0, 5);
    res.send(top);
};

exports.submitEntry = function(req, res) 
{
    var word = req.body.word;
    
    // set word to be lower case so that character/string comparisons are consistent
    word = word.toLowerCase();
    // remove spaces to avoid entering empty characters to get most points
    word = removeSpaces(word);
    
    if (!isValid(word))
    {
        console.log("invalid palindrome - " + word);
        // return message
        res.send(word + "is not a valid palindrome");
    }
    else
    {
        // save score
        var playerScore = {name: req.body.name, word: word, points: getPoints(word)};
        addScore(playerScore);
        res.send({points: playerScore.points});    
    }
};
isValid = function(word) 
{
    var length = word.length;
    var half = Math.floor(length/2);
    var firstHalf = word.substring(0, half);
    var secondHalf = word.substring(length-half, length);

    var splitLength = firstHalf.length;
    for (var i=0; i<splitLength; i++)
    {
        if (firstHalf[i] != secondHalf[splitLength-(i+1)])
        {
            return false;
        }
    }
    return true;
};
getPoints = function(word) 
{
    return word.length;
};
removeSpaces = function(word)
{
    // remove all spaces from the string
    return word.split(" ").join("");
}
addScore = function(score)
{
    var insertIndex = playerScores.length-1; 
    var repeatEntry = false;
    for (var i=insertIndex; i>=0; i--)
    {
        if (score.points > playerScores[i].points)
        {
            insertIndex = i;
        }
        if (playerScores[i].name == score.name && playerScores[i].word == score.word)
        {
            // user has already entered the same word previously
            repeatEntry = true;
        }
    }
    if (!repeatEntry)
    {
        playerScores.splice(insertIndex, 0, score);
    }
}