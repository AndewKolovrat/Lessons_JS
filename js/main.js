const txt = `One: 'Hi Mary.' 
    Two: 'Oh, hi.'
    One: 'How are you doing?'
    Two: 'I'm doing alright.How about you ?'
    One: 'Not too bad. The weather is great isn't it ?'
    Two: 'Yes. It's absolutely beautiful today.'
    One: 'I wish it was like this more frequently.'
    Two: 'Me too.'
    One: 'So where are you going now?'
    Two: 'I'm going to meet a friend of mine at the department store.'
    One: 'Going to do a little shopping?'
    Two: 'Yeah, I have to buy some presents for my parents.'
    One: 'What's the occasion ?'
    Two: 'It's their anniversary.'
    One: 'That's great.Well, you better get going.You don't want to be late.'
    Two: 'I'll see you next time.'
    One: 'Sure. Bye.'`;

window.onload = () => {
    const list = new ProductsList(new Cart());
    // хром (CORS) ругается на запросы к файловой системе :(
    //list.getJson('./getProducts.json').then(data => list.handleData(data));

    // ищем все кавычки перед которыми не граница слова
    console.log(txt.replace(/\B\'/gm, '"'));

    const form = document.querySelector('.footer_feedback'),
        name = form.querySelector('.footer_feedback_name'),
        phone = form.querySelector('.footer_feedback_phone'),
        mail = form.querySelector('.footer_feedback_email'),
        msg = form.querySelector('.footer_feedback_msg'),
        wrg = form.querySelector('.footer_feedback_warning');

    msg.value = txt.replace(/\B\'/gm, '"');

    form.querySelector('.footer_feedback_btn').addEventListener('click', event => {
        // все латинские буквы, цифры и знак подчеркивания
        let re = /^[\w]+$/i;
        if (!re.test(name.value)) {
            wrg.textContent = `Warning! Wrong name field!`;
            name.classList.add('warning');
        }
        else {
            name.classList.remove('warning');
            wrg.textContent = '';
        }

        // +цифра(3 цифры)3цифры-4цифры
        re = /^\+\d\([\d]{3}\)[\d]{3}\-[\d]{4}$/i;
        if (!re.test(phone.value)) {
            wrg.textContent = `Warning! Wrong phone field!`;
            phone.classList.add('warning');
        }
        else {
            phone.classList.remove('warning');
            wrg.textContent = '';
        }

        // (1 символ) (от 1 символа, точки или тирэ)
        // ( @ ) ( от 1 символа ) ( точка ) ( от 2х до 4х символов )
        re = /^[\w]{1}[\w\.\-]+@[\w]+\.[a-z]{2,4}$/i;
        if (!re.test(mail.value)) {
            wrg.textContent = `Warning! Wrong mail field!`;
            mail.classList.add('warning');
        }
        else {
            mail.classList.remove('warning');
            wrg.textContent = '';
        }

    });

};