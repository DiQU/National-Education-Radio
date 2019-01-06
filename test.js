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
    let partC1 = searchPart(file, 'C. LANGUAGE FOCUS', '《Examples》')
    let partC2 = searchPart(file, '《Examples》', 'D. EXERCISES')
    let partD1 = searchPart(file, 'D. EXERCISES', '《Answer Key》')
    partD1 = handleD1(partD1)
    let partD2 = file.match(/《Answer Key》: ?(.+)/)
   
    

    let outFile = `
# Uint ${unit[1]} : ${unit[3]}

<audio controls>
  <source src="">
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
${partC2}

## EXERCISES 
${partD1}

\`《Answer Key》: ${partD2[1]}\`
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
    const speaker=str.match(/[MW]: /g)
    const converstion=str.split(/[MW]: /g).map(elem => elem.replace(/\r\n|\n/g,' '))
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
    // let regexp1 = /\w+ ?\w+ /g
    // let regexp2 = /\((\S+)\)(\[\w?\])*\s\S+/g
    let regexp1 = /(\w+ ?)+ /g
    let regexp2 = /\(.+/g
    let outStr = ''

    let x = str.match(regexp1)
    let y = str.match(regexp2)

    for (let i = 0; i < x.length; i++) {
        outStr += x[i].trim() + "||" + y[i] + '\n';
    }

    return outStr.trim();
}
function handleD1(str) {
    let strArr=str.split(/\n|\r\n/)
    strArr=strArr.map(elem => '* '+elem)
    return strArr.join('\n')
}