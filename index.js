// Contenteditable
let contenteditable = document.getElementsByClassName('display')
let podKapot = document.getElementsByClassName('podKapot')
const buttons = document.querySelectorAll('button')
const operators = ['/','*','-','+']
const operatorsPriorety = ['/', '*']
const procent = ['%']
let finalArray = []
let numbers = [0]
// contenteditable[0].append(numbers)
let zero = false
let itog = false

// Звуки
const sounds = [
  'audio/Buttons/0.mp3',
  'audio/Buttons/1.mp3',
  'audio/Buttons/2.mp3',
  'audio/Buttons/3.mp3',
  'audio/Buttons/4.mp3',
  'audio/Buttons/5.mp3',
  'audio/Buttons/6.mp3',
  'audio/Buttons/7.mp3',
  'audio/Buttons/8.mp3',
  'audio/Buttons/9.mp3',
  'audio/Buttons/minus.mp3',
  'audio/Buttons/Plus.mp3',
  'audio/Buttons/Ravno.mp3',
];

//! Функция подсчета
function calculator(array) {
    let result = []

    array.forEach((element, i) => {
        if (i === array.length-1) {
            if (operators.includes(element.at(-1))) {
                result.push(...element.slice(0, -1))
                return
            }
            if (procent.includes(element.at(-1))) {
                result.at(-1).pop() 
            }
        }
        result.push(...element)
    }); 
    
    let finalResult = Number(eval(result.join(''))).toFixed(2)
    console.log('finalResult = ', finalResult, typeof finalResult);
    
    if (finalResult.includes('.')) {
        if (finalResult.at(-1) === '0' && finalResult.at(-2) === '0') {
            return Number(Math.trunc(finalResult))
        } else return Number(finalResult)
    }
         return Number(finalResult)
   
}

//! Слушатель событий на все кнопки
buttons.forEach(button => {
    // Слушатель кликов по кнопкам
    button.addEventListener('click', function(event) {
        const number = Number(event.target.innerText)
        const simbol = event.target.className
        const idSimbol = event.target.id
    // Звуки кнопок
    const randomIndex = Math.floor(Math.random() * sounds.length);
    const audio = new Audio(sounds[randomIndex]);
    audio.play().catch(error => console.log('Звук заблокирован:', error));
        
// Кнопка включения и выключения калькулятора
        if (simbol === 'buttons_up-line_of-on') {
            zero = false
          if (contenteditable[0].innerText !== '') {
            contenteditable[0].innerHTML = ''
            numbers = [0]
            podKapot[0].innerHTML = ''
            podKapot[0].classList.remove('active')
            const audio = new Audio('audio/podKapot.mp3')
            audio.play()          
            return
          } else {
            contenteditable[0].innerHTML = numbers.join('');
            podKapot[0].innerHTML = numbers.join('');
            itog = false
            finalArray = []
            podKapot[0].classList.add('active')
            const audio = new Audio('audio/podKapot.mp3')
            audio.play()
          }
          return
    }

// Проверка включен калькулятор или нет
    if (contenteditable[0].innerText === '') {
        alert('Калькулятор выключен');
        return
    }

// Кнопка стереть символ
    if (idSimbol === 'del') {
        if (numbers.length === 1) {
            zero = false
            numbers = [0]
            contenteditable[0].innerHTML = numbers.join('')
            podKapot[0].innerHTML = numbers.join('')
        } else {
            numbers.pop()
            contenteditable[0].innerHTML = numbers.join('')
            podKapot[0].innerHTML = numbers.join('')
        }
        return
    }

// Кнопка "Очистить экран"
    if (simbol === 'buttons_up-line_clean') {
        zero = false
        numbers = [0]
        finalArray = []
        contenteditable[0].innerHTML = numbers.join('')
        podKapot[0].innerHTML = numbers.join('')
        itog = false
        return
    }

// Кнопка процент
    if (simbol === 'buttuns_operators_%') {
        if (itog) {
            itog = false
            finalArray = []
            const proc = Number(numbers.join('')/100)
            numbers = String(proc).split('')
            contenteditable[0].innerHTML = numbers.join('')
            podKapot[0].innerHTML = numbers.join('')
            itog = false
            console.log(`Один процент от ${numbers} =`, numbers);
            return
        }

        if (numbers.length < 1) {return}
        if (Number(numbers[0]) === 0 &&  numbers.length === 1) {
            zero = true
            return
        }
        if (numbers.at(-1) === '.') {
            console.log('Число заканчивается на точку')
            return
            ;}
        
        if (finalArray.length < 1 && numbers.length > 0) {
            const proc = Number(numbers.join('')/100)
            numbers = String(proc).split('')
            contenteditable[0].innerHTML = numbers.join('')
            podKapot[0].innerHTML = numbers.join('')
            itog = false
            console.log(`Один процент от ${numbers} =`, numbers);
            return
        }
        
        if (finalArray.length > 0) {
                //Проверка деления на ноль
                if (zero === true) {
                    if (finalArray.at(-1).at(-1) === '/') {
                        zero = false
                        console.log('zero ', zero);
                        contenteditable[0].innerHTML = 'Делить на ноль нельзя'
                        console.log('Деление на ноль невозможно');
                        return
                        ;}
                        zero = false
                        numbers.push('%')
                        console.log('zero ', zero);
                        contenteditable[0].innerHTML = numbers.join('')
                        podKapot[0].innerHTML = numbers.join('')
                        itog = false
                        return
                    }} 
        
        if (numbers.length > 0) {
            if (numbers.length === 1 && numbers[0] === 0) {
                console.log('Какие 0%?');
                return
            }
            if (finalArray.length > 0) {
                if (operators.includes(finalArray.at(-1).at(-1))) {
                    if (finalArray.length === 1) {
                        const simb = finalArray.at(-1).join("").at(-1)
                        const numb = Number(finalArray.at(-1).slice(0, -1).join(''))
                        const howMachProc = Number(numbers.join(''))
                        const finalProc = String(numb / 100 * howMachProc)
                        contenteditable[0].innerHTML = finalProc
                        podKapot[0].innerHTML = `${numb}${simb}${finalProc}`
                        console.log(typeof finalProc);
                        numbers = finalProc.split('')
                        console.log('процент от одного числа');
                        return
                    }
                    const preResult = String(calculator(finalArray))
                    const simb = finalArray.at(-1).at(-1)
                    const howMachProc = Number(numbers.join(''))
                    const finalProc = String(preResult / 100 * howMachProc)
            // Если отрицательный number (условия под каждого оператора)
                    if (finalProc[0] === '-') {
                        if (simb === '-' ) {
                        finalArray = [preResult.split('')]
                        finalArray[0].push('+')
                        numbers = finalProc.split('').slice(1)
                        podKapot[0].innerHTML = `${preResult}${simb}(${finalProc})`
                        contenteditable[0].innerHTML = finalProc
                        return
                        }
                        if (simb === '+') {
                        finalArray = [preResult.split('')]
                        finalArray[0].push('-')
                        numbers = finalProc.split('').slice(1)
                        podKapot[0].innerHTML = `${preResult}${simb}(${finalProc})`
                        contenteditable[0].innerHTML = finalProc
                        return
                        }
                        if (simb === '*') {
                             finalArray = [preResult.split('')]
                         // Умножение двух отрицательных чисел
                            if (finalArray[0][0] === '-') {
                                finalArray = [preResult.split('').slice(1)]
                                finalArray[0].push('*')
                                numbers = finalProc.split('').slice(1)
                                podKapot[0].innerHTML = `${preResult}${simb}(${finalProc})`
                                contenteditable[0].innerHTML = finalProc
                                return 
                           // Если только number отрицательный
                            } else {
                                console.log(finalArray[0][0]);
                                finalArray = [preResult.split('')]
                                finalArray[0].push('*')
                                numbers = finalProc.split('').slice(1)
                                podKapot[0].innerHTML = `${preResult}${simb}(${finalProc})`
                                contenteditable[0].innerHTML = finalProc
                                return 
                            }
                        }
                        }
                        if (simb === '/') {
                                finalArray = [preResult.split('')]
                         // Деление двух отрицательных чисел
                            if (finalArray[0][0] === '-') {
                                finalArray = [preResult.split('').slice(1)]
                                finalArray[0].push('/')
                                numbers = finalProc.split('').slice(1)
                                podKapot[0].innerHTML = `${preResult}${simb}(${finalProc})`
                                contenteditable[0].innerHTML = finalProc
                                return 
                           // Если только number отрицательный
                            } else {
                                console.log(finalArray[0][0]);
                                finalArray = [preResult.split('')]
                                finalArray[0].push('/')
                                numbers = finalProc.split('').slice(1)
                                podKapot[0].innerHTML = `${preResult}${simb}(${finalProc})`
                                contenteditable[0].innerHTML = finalProc
                                return 
                            }
                    }
                    numbers = finalProc.split('');
                    finalArray = []
                    finalArray.push([String(preResult.split(''))])
                    podKapot[0].innerHTML = `${preResult}${simb}${finalProc}`
                    contenteditable[0].innerHTML = numbers.join('')
                    return
                }
                // Получаем мат.оператора и число из предыдущего уравнения в списке 
                const simb = finalArray.at(-1).join("").at(-1)
                const numb = calculator(finalArray)
                // Какое число в numbers - столько процентов надо
                const howMachProc = Number(numbers.join(''))
                const finalProc = numb / 100 * howMachProc
                numbers = String(finalProc).split('')
                finalArray = [`${numb}${simb}`.split('')]
                podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                contenteditable[0].innerHTML = numbers.join('')
                itog = false
                console.log(`Нам нужно ${numb} ${simb} ${howMachProc} процентов от ${numb}`)
                console.log(`То есть ${numb} ${simb} ${finalProc}`);
                return 
            } else {
                console.log('Нет предыдущего числа');
                return
            }
        }
  
        return
    }

// Кнопка поделить
    if (idSimbol === 'divive') {
        if (numbers.at(-1) === '.') {
            console.log('Число заканчивается на точку')
            return
            ;}        
        if (numbers.length < 1) {return}
        if (numbers.at(-1) === 0 && numbers.length === 1) {
            if (finalArray.length > 0) {
                //Проверка деления на ноль
                if (zero === true) {
                    if (finalArray.at(-1).at(-1) === '/') {
                        zero = false
                        contenteditable[0].innerHTML = 'Делить на ноль нельзя'
                        console.log('Деление на ноль невозможно');
                        return
                        ;}
                zero = false
                console.log('zero ', zero);
                 numbers.push('/')
                 finalArray.push(numbers)
                 numbers = [0]
                 contenteditable[0].innerHTML = numbers.join('')
                 podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                 itog = false
                return
                } else {
                        finalArray.at(-1).pop()
                        finalArray.at(-1).push('/')
                        podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                        itog = false
                        return     
                        } 
            }
            console.log('Ноль не делится. Он жадный')
            return
            ;}
        if (numbers.at(-1) === '/') {
            console.log('Два разделения? Завязывай')
            return
        }

        if (itog) {
            itog = false
            finalArray = []
            numbers.push('/')
            finalArray.push(numbers)
            numbers = [0]
            podKapot[0].innerHTML = finalArray.join('').split(',').join('')
            contenteditable[0].innerHTML = numbers.join('')
            console.log('finalArray', finalArray);
            console.log('numbers', numbers);
            return
        }

        numbers.push('/')
        finalArray.push(numbers)
        numbers = [0]
        contenteditable[0].innerHTML = numbers.join('')
        podKapot[0].innerHTML = finalArray.join('').split(',').join('')
        itog = false
        return
    }

// Кнопка умножить
    if (simbol === 'buttuns_operators_x') {
        if (numbers.at(-1) === '.') {
            console.log('Число заканчивается на точку')
            return
            ;}

        if (numbers.length < 1) {return}    

        if (numbers.at(-1) === 0 && numbers.length === 1) {
             if (finalArray.length > 0) {
                    //Проверка деления на ноль
                    if (zero === true) {
                        if (finalArray.at(-1).at(-1) === '/') {
                        zero = false
                        contenteditable[0].innerHTML = 'Делить на ноль нельзя'
                        console.log('Деление на ноль невозможно');
                        return
                        ;}
                        zero = false
                        numbers.push('*')
                        finalArray.push(numbers)
                        numbers = [0]
                        contenteditable[0].innerHTML = numbers.join('')
                        podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                        itog = false
                        return
                    } else {
                    finalArray.at(-1).pop()
                    finalArray.at(-1).push('*')
                    podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                    itog = false
                }
             return 
            }
            console.log('Поумножай ноль мне еще тут')
            return
            ;}

            if (itog) {
            itog = false
            finalArray = []
            numbers.push('*')
            finalArray.push(numbers)
            numbers = [0]
            podKapot[0].innerHTML = finalArray.join('').split(',').join('')
            contenteditable[0].innerHTML = numbers.join('')
            console.log('finalArray', finalArray);
            console.log('numbers', numbers);
            return
        }

        numbers.push('*')
        finalArray.push(numbers)
        numbers = [0]
        contenteditable[0].innerHTML = numbers.join('')
        podKapot[0].innerHTML = finalArray.join('').split(',').join('')
        itog = false
        return
    }

// Кнопка минус
    if (simbol === 'buttuns_operators_-') {
        //Проверка на точку в конце
        if (numbers.at(-1) === '.') {
            console.log('Число заканчивается на точку')
            return
            ;}
        if (numbers.length < 1) {return}
        if (numbers.at(-1) === 0 && numbers.length === 1) {
             if (finalArray.length > 0) {
                //Проверка деления на ноль
                    if (zero === true) {
                        if (finalArray.at(-1).at(-1) === '/') {
                        zero = false
                        contenteditable[0].innerHTML = 'Делить на ноль нельзя'
                        console.log('Деление на ноль невозможно');
                        return
                        ;}
                    zero = false
                    numbers.push('-')
                    finalArray.push(numbers)
                    numbers = [0]
                    contenteditable[0].innerHTML = numbers.join('')
                    podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                    itog = false
                    return
                    } 
                    else {
                    finalArray.at(-1).pop()
                    finalArray.at(-1).push('-')
                    podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                    itog = false
                    }
                    return
            }}

            if (itog) {
            itog = false
            finalArray = []
            numbers.push('-')
            finalArray.push(numbers)
            numbers = [0]
            podKapot[0].innerHTML = finalArray.join('').split(',').join('')
            contenteditable[0].innerHTML = numbers.join('')
            console.log('finalArray', finalArray);
            console.log('numbers', numbers);
            return
        }

        numbers.push('-')
        finalArray.push(numbers)
        numbers = [0]
        contenteditable[0].innerHTML = numbers.join('')
        podKapot[0].innerHTML = finalArray.join('').split(',').join('')
        itog = false
        return
    }

//Кнопка плюс
    if (simbol === 'buttuns_operators_+') {
        console.log('finalArray', finalArray);
        console.log('numbers', numbers);
        
          //Проверка на точку в конце
        if (numbers.at(-1) === '.') {
            console.log('Число заканчивается на точку')
            return
            ;}
        if (numbers.length < 1) {
            return
        }
        if (numbers.at(-1) === 0 && numbers.length === 1) {
             if (finalArray.length > 0) {
                //Проверка деления на ноль
                    if (zero === true) {
                        if (finalArray.at(-1).at(-1) === '/') {
                        zero = false
                        contenteditable[0].innerHTML = 'Делить на ноль нельзя'
                        console.log('Деление на ноль невозможно');
                        return
                        ;}
                    zero = false
                    numbers.push('+')
                    finalArray.push(numbers)
                    numbers = [0]
                    contenteditable[0].innerHTML = numbers.join('')
                    podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                    itog = false
                    return
                    } 
                    else {
                    finalArray.at(-1).pop()
                    finalArray.at(-1).push('+')
                    podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                    itog = false
                    }
                    return
            }}
        if (itog) {
            itog = false
            finalArray = []
            numbers.push('+')
            finalArray.push(numbers)
            numbers = [0]
            podKapot[0].innerHTML = finalArray.join('').split(',').join('')
            contenteditable[0].innerHTML = numbers.join('')
            console.log('finalArray', finalArray);
            console.log('numbers', numbers);
            return
        }
        numbers.push('+')
        finalArray.push(numbers)
        numbers = [0]
        contenteditable[0].innerHTML = numbers.join('')
        podKapot[0].innerHTML = finalArray.join('').split(',').join('')
        console.log('finalArray', finalArray);
        console.log('numbers', numbers);
        console.log('itog', itog);
        return
    }

// Кнопка равно
    if (simbol === 'buttuns_numbers_=') {
        if (itog) {
            contenteditable[0].innerHTML = numbers.join('')
            return}
       //Проверка на точку в конце
        if (numbers.at(-1) === '.') {
            console.log('Число заканчивается на точку')
            return
            ;}
        // Последний символ - 0, длина масива = 1
        if (numbers.at(-1) === 0 && numbers.length === 1) {
             if (finalArray.length > 0) {
                //Проверка деления на ноль
                    if (zero === true) {
                        if (finalArray.at(-1).at(-1) === '/') {
                        zero = false
                        console.log('zero ', zero);
                        contenteditable[0].innerHTML = 'Делить на ноль нельзя'
                        console.log('Деление на ноль невозможно');
                        return
                        ;}
                    zero = false
                    finalArray.push(numbers)
                    numbers = [calculator(finalArray)]
                    contenteditable[0].innerHTML = numbers.join('')
                    podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                    itog = true
                    return
                    } 
                    else {
                    finalArray.at(-1).pop()
                    numbers = [calculator(finalArray)]
                    contenteditable[0].innerHTML = numbers.join('')
                    podKapot[0].innerHTML = finalArray.join('').split(',').join('')
                    itog = true
                    }
                    return
            }}
            if (numbers && finalArray.length < 1) {console.log('Повторное нажатие на =');}
        finalArray.push(numbers)
        numbers = String(calculator(finalArray)).split('')
        contenteditable[0].innerHTML = numbers.join('')
        podKapot[0].innerHTML = finalArray.join('').split(',').join('')
        finalArray = []
        itog = true
        console.log('finalArray', finalArray);
        console.log('numbers', numbers);
        return
    }


// Проверяем нажата ли цифра
    if (number || number === 0 && event.target.innerText !== '') {
        if (itog) {
            itog = false
            numbers = [0]
            finalArray = []
        }
        console.log('Клик по цифре:', number);
            // Если нажат 0, на на экране только 0
            if (number === 0 && numbers.length === 1 && numbers[0] === 0) {
            zero = true
            return
            } else {
                zero = false
                //Если на экране 0 и нажата другая цифра, без точки    
                if (numbers[0] === 0 && numbers[1] !== '.') {
                    numbers.shift()
                    numbers.push(number)
                    contenteditable[0].innerHTML = numbers.join('')
                    return
                } else {
                    numbers.push(number)
                    contenteditable[0].innerHTML = numbers.join('')
                    return
                }
            }
    } else if (event.target.innerText === '.') {
            // Если нажата точка
            if (numbers.length >= 1) {
                    // Нажатие второй раз на точку
                if (numbers.at(-1) === '.'){return}
            numbers.push('.')
            contenteditable[0].append('.')
                } else {
                console.log('Клик по другой кнопке:', event.target.innerText);
                }
            }
    return
})
});

