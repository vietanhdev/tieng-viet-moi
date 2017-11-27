$(document).ready(function(){

// Convert map from old Vietnamese to new Vietnamese
// Follow the method of Associate Professor Bui Hien
// https://news.zing.vn/toan-bo-de-xuat-cai-tien-phu-am-tieq-viet-cua-pgs-bui-hien-post799107.html
var convertMap = [
	['kh', 'x'],
	['c(?!h)', 'k'],
	['q', 'k'],
	['tr', 'c'],
	['ch', 'c'],
	['d', 'z'],
	['gi', 'z'],
	['r', 'z'],
	['đ', 'd'],
	['ph', 'f'],
	['ngh?', 'q'],
	['gh', 'g'],
	['th', 'w'],
	['nh', 'n\'']
];

// Textbox for original text
var originTextArea = $('#origin-text');

// Textbox for converted text
var resultTextArea = $('#converted-text');

// Copy button used for copying result
var copyBtn = document.querySelector('#copy-result');


// Function to convert storring to new Vietnamese style
function newVietnameseStyle(str, convertMap) {
    for (let i = 0; i < convertMap.length; i++) {
		const element = convertMap[i];
		const searchRegEx = new RegExp(element[0], 'i');
		subStrIndex = str.search(searchRegEx);

		while(subStrIndex != -1) {

			if (str[subStrIndex] == str[subStrIndex].toUpperCase()) {
				str = str.replace(searchRegEx, element[1].toUpperCase());
			} else {
				str = str.replace(searchRegEx, element[1]);
			}

			subStrIndex = str.search(searchRegEx);
		}
       
	}
    return str;
}

var wB = ["ngh", "ng", "kh", "nh", "ph", "gh", "ch", "th", "tr", "b", "c", "d", "đ", "g", "h", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "x"];
var wE = ["c", "ch", "m", "n", "ng", "nh", "p", "t"];
var wM_RegEx = /[ueoaiưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừÝửữựỳỵỷỹ]+/i;
// Check if the string is Vietnamese
function isVietnamese(str) {

	// Remove prefix
	for (let i = 0; i < wB.length; i++) {
		if (new RegExp("^" + wB[i],"i").test(str)) {
			str = str.substr(wB[i].length);
			break;
		}
	}

	// Remove suffix
	for (let i = 0; i < wE.length; i++) {
		if (new RegExp(wE[i] + "$","i").test(str)) {
			str = str.substr(0, str.length - wB[i].length);
			break;
		}
	}

	if (str.length == 0) {
		return 1;
	}

	return wM_RegEx.test(str);
}


function doConversion() {
	var originText = originTextArea.val();

	// Regexp to determine a Vietnamese word
	let wordRegEx = new RegExp("[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]");

	var begin; // begin of a word;
	var endBound = 0; // end bound of a word
	var x = 0; // begin of considered substring

	begin = 0;

	var result = "";
	var word = "";

	while (begin < originText.length) {
		
		// Find a word
		while (begin < originText.length && !wordRegEx.test(originText.substr(begin,1))) {
			begin++;
		}
		
		
		// No more word
		if (begin >= originText.length) {
			result += originText.substr(x);
			break;
		}


		// Determine the end bound of word
		endBound = begin;
		do {
			endBound++;
		} while (endBound < originText.length && wordRegEx.test(originText.substr(endBound, 1)));

		
		word = originText.substr(begin, endBound-begin);
		
		// Only convert if word is Vietnamese
		if (isVietnamese(word)) {
			word = newVietnameseStyle(word, convertMap);
		}

		result += originText.substr(x, begin - x);
		result += word;

		begin = endBound;
		x = endBound;	

	}

	resultTextArea.val(result);
}


// Put a text area to clipboard when clicking copy button
copyBtn.addEventListener('click', function(event) {
	resultTextArea.select();
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);
	} catch (err) {
		console.log('Oops, unable to copy');
	}
});



// Realtime converting old Vietnamese to new Vietnamese
originTextArea.bind('input propertychange', function() {
	doConversion();
});


// Sample paragraph
originTextArea.val("LUẬT GIÁO DỤC.\n"
+"Điều 7. Ngôn ngữ dùng trong nhà trường và cơ sở giáo dục khác; dạy và học tiếng nói, chữ viết của dân tộc thiểu số; dạy ngoại ngữ.\n"
+"1. Tiếng Việt là ngôn ngữ chính thức dùng trong nhà trường và cơ sở giáo dục khác. Căn cứ vào mục tiêu giáo dục và yêu cầu cụ thể về nội dung giáo dục, Thủ tướng chính phủ quy định việc dạy và học bằng tiếng nước ngoài trong nhà trường và cơ sở giáo dục khác....\n");
doConversion();

});