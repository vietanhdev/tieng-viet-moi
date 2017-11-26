$(document).ready(function(){

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

var originTextArea = $('#origin-text');
var resultTextArea = $('#converted-text');
var copyBtn = document.querySelector('#copy-result');


// Function to convert string to new Vietnamese style
function newVietnameseStyle(str, convertMap) {
    for (let i = 0; i < convertMap.length; i++) {
		const element = convertMap[i];
		const searchRegEx = new RegExp(element[0], 'gi')
		var subStrIndex;
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


function doConversion() {
	var originText = originTextArea.val();
	resultTextArea.val(newVietnameseStyle(originText, convertMap));
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


originTextArea.bind('input propertychange', function() {
	doConversion();
});


// Sample paragraph
originTextArea.val(`LUẬT GIÁO DỤC.

Điều 7. Ngôn ngữ dùng trong nhà trường và cơ sở giáo dục khác; dạy và học tiếng nói, chữ viết của dân tộc thiểu số; dạy ngoại ngữ.

1. Tiếng Việt là ngôn ngữ chính thức dùng trong nhà trường và cơ sở giáo dục khác. Căn cứ vào mục tiêu giáo dục và yêu cầu cụ thể về nội dung giáo dục, Thủ tướng chính phủ quy định việc dạy và học bằng tiếng nước ngoài trong nhà trường và cơ sở giáo dục khác....

`);

doConversion();

});