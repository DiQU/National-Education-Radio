const fs = require('fs')
fs.readFile('unitInput.txt', 'utf8', (err, file) => {
    if (err) console.log(err)
    else {
        console.log('讀取成功\n', file)
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
    let partB = searchPart(file, 'B. WORDS & PHRASES', 'C. LANGUAGE FOCUS')
    partB = handleB(partB)

    let outFile = `
# Uint ${unit[1]} : ${unit[3]}

## WORDS & PHRASES
單字 vocabulary|發音 pronunciation|翻譯 translation
---|---|---
${partB}

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
    let title = /- (\d+) -(\r\n|\n) ([\w ?!]+)/
    return file.match(title)
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

    return outStr;
}
partA = /[M|W]:[\S ]+/g