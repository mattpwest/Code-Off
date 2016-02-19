"use strict";

var fs = require('fs');
var path = require('path');

// Read input
var filename = 'code_off-1.in';
var content = fs.readFileSync(filename, 'ascii');
var contentLines = inputToLines(content);
var lineNo = 0;
var numWords = contentLines[lineNo++];

//console.log('Num lines: ', numLines);

// List of all words
var words = [];
for (let i = 0; i < numWords; i++) {
	let word = contentLines[lineNo++];
	words.push(word.replace(/[\r]/g, ''));
}

// Are they palindromes
var palindrome = [];
for (let i = 0; i < numWords; i++) {
	palindrome.push(words[i] === words[i].split('').reverse().join(''));
}

// Compute scores
var scores = [];
var scoresMap = {};
for (let i = 0; i < numWords; i++) {
	let score = calcWordScore(words[i]);
	scores.push(score);

	if (scoresMap[score] === undefined) {
		scoresMap[score] = [i];
	} else {
		scoresMap[score].push(i);
	}
}

// Debug Output
// for (let i = 0; i < numWords; i++) {
// 	console.log(words[i], ', ', palindrome[i], ', ', scoresMap[scores[i]].length);
// }

// Final output
var outputContent = '';
for (let i = 0; i < numWords; i++) {
	outputContent += words[i] + '\n';
	outputContent += palindrome[i] + '\n';

	let wordsWithScore = scoresMap[scores[i]];
	if (wordsWithScore.length > 1) {
		for (let j = 0; j < wordsWithScore.length; j++) {
			var otherWord = words[wordsWithScore[j]];
			if (otherWord !== words[i]) {
				outputContent += otherWord + '\n';
			}
		}
	}
}

fs.writeFileSync('code_off-1.out', outputContent);

function inputToLines(content) {
	var result = [];
	var line = 0;
	var i = 0;
	while (i < content.length) {
	    var j = content.indexOf('\n', i);
	    if (j == -1) {
	    	j = content.length;
	    }

	    result[line++] = content.substr(i, j - i);
	    i = j+1;
	}

	return result;
}

function calcWordScore(word) {
	let chars = word.split('');
	let score = 0;
	for (let i = 0; i < chars.length; i++) {
		let charCode = chars[i].charCodeAt(0);

		if (charCode >= 65 && charCode <= 90) { // Capital
			score += (charCode - (65 - 1));
		} else if (charCode >= 97 && charCode <= 122) {
			score += (charCode - 97);
		}
	}

	return score;
}
