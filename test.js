const fs = require('fs')
fs.readFile('unitInput.txt', 'utf8', (err, file) => {
    if (err) console.log(err)
    else {
        console.log('讀取成功\n')
        outFile = printGitbook(file)
        fs.writeFile('unitOutput.md', outFile, (err) => {
            if (err) console.log(err)
            else {
                console.log('寫入成功')
            }
        })
    }
})

function printGitbook(file) {
    file = file.trim()
    let unit = handleUnit(file)
    let partA = searchPart(file, 'A. CONVERSATION', 'B. WORDS & PHRASES')
    partA = handleA(partA)
    let partB = searchPart(file, 'B. WORDS & PHRASES', 'C. LANGUAGE FOCUS')
    partB = handleB(partB)

    let outFile = `
# Uint ${unit[1]} : ${unit[3]}

<audio controls>
  <source src="https://channelplus.ner.gov.tw/api/audio/5ad2e606f95e3500064f42f3">
</audio>

## CONVERSATION
${partA}

## WORDS & PHRASES
單字 vocabulary|發音 pronunciation|翻譯 translation
---|---|---
${partB}

## LANGUAGE FOCUS 
<h3> ${partC1}</h3>

##### 《Examples》

`
    return outFile.trim()
}

/**
 * 分開段落
 * @param {String} file -the file
 * @param {String} start -part start
 * @param {String} end -part end
 */
function searchPart(file, start, end) {
    let indexs = file.search(start)
    let indexe = file.search(end)

    return file.slice(indexs, indexe).slice(start.length,).trim()
}

function handleUnit(file) {
    let title = /- (\d+) -(\r\n|\n) ([\S ]+)/
    // console.log(file.match(title))
    return file.match(title)
    
}

function handleA(str) {
    //以'M: '或'W: '為分割點，將字串內容存入陣列 ，去除第一個空字串
    speaker=str.match(/[MW]: /g)
    converstion=str.split(/[MW]: /g).map(elem => elem.replace(/\r\n|\n/g,' '))
    converstion.shift()
    // console.log(converstion)
    let outStr = ''
    for(let i=0;i<speaker.length;i++){
        outStr += '* ' +speaker[i]+converstion[i]+'\n'
    }
    // console.log(speaker)
    return outStr.trim()
}

function handleB(str) {
    regexp1 = /\w+ ?\w+ /g
    regexp2 = /\((\S+)\)(\[\w?\])*\s\S+/g
    let outStr = ''

    x = str.match(regexp1)
    y = str.match(regexp2)

    for (let i = 0; i < x.length; i++) {
        outStr += x[i].trim() + "||" + y[i].trim() + '\n';
    }

    return outStr.trim();
}