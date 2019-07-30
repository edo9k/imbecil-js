const request = require('request')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
const file = require('fs')

baseURL = 'https://www.sinonimos.com.br/'

let words = "Imbecil, genocida, verme, desprezível, torpe, porco, fardola, vil, vão, abjeto, asqueroso, burro, lheguelhé, incompetente, desonesto, patife, larápio, fétido, repulsivo, indigno, corrupto, farsante, escroque, horrível, desumano, ladrão, desgraçado, rude, canalha, embusteiro, cretino, hipócrita, acintoso, infame, seboso, traidor, cruel, ímprobo, indecente, perverso, infeliz, maligno, bobo, odioso, frívolo, incapaz, abutre, pústula, vendido, pavoroso, cagão, aberrante, macabro, imprestável, nauseante, danoso, asno, mocarongo, arregão, impiedoso, farsante, arrogante, atroz, maléfico, néscio, facínora, sanguessuga, baba-ovo, bobo-da-corte, indigno, irresponsável, desleal, trapaceiro, decadente, aleivoso, escabroso, tóxico, manipulador, insolente, desonrado, indecoroso, abominável, oportunista, interesseiro, retrógrado, leviano, pérfido , tinhoso, descarado, sórdido, descartável, purulento, covarde, filistinista, obscurantista, carunchento, demagogo, podre, ridículo, vigarista, indigno, lixo, marionete, lesivo, grotesco, babaca, tosco, idiota, tedioso, incauto, raso, despreparado, doloso, manipulável, rato, sujo, estorvo, superficial, excremento, medíocre, vergonhoso, risível, trevoso, desalmado, troglodita, insosso, energúmeno, gaslighter, monstro, boçal, pateta, capacho, escória, presunçoso, rasteiro, mentiroso, parasita, parvo, ignóbil, pulha, capacitista, ageísta, xenofóbico, misógino, homofóbico, racista"

const cleanChars = s => 
  s
    .replace(/[áàãâä]/gui, 'a')
    .replace(/[éèêë]/gui, 'e')
    .replace(/[íìîï]/gui, 'i')
    .replace(/[óòõôö]/gui, 'o')
    .replace(/[úùûü]/gui, 'u')
    .replace(/[ç]/gui, 'c')


words = cleanChars(words)
words = words.toLocaleLowerCase().split(', ').sort()

words = ['idiota', 'trouxa']

for (word of words) {
  const url = baseURL + word
  console.log(url)

  request({method: 'GET', url, encoding: null}, (err, res, body) => {
    if (err) reject(err)
  
    let html = iconv.decode(body, 'ISO-8859-1')
    let $ = cheerio.load(html) //, { decodeEntities: false } )
    let $sins = $('.sinonimo')
    let wordList = []


    $sins.each(function() { 
      wordList.push( $(this).text() )          
    })

    console.log(`${word} -> ${wordList.join(', ')}.`)
    console.log('---- *** ---')

    file.writeFileSync(`./${word}.txt`, wordList.join('\n'))

  })
}

