let date_now, year_now, month_now, month_nowInt, week_now,
    last_day, last_day_prev,
    fl_time = 0,
    day_zap = '',
    days_zap = '',
    arrDate_first = [],
    arrDate_last = [1, 2, 3, 4, 5, 6],
    el_items_days = '',
    items_time = document.querySelector('.items_time'),
    items_days = document.querySelector('.items_days'),
    data_order = document.querySelector('.data-order'),
    month_calendar = document.querySelector('.name_month'),
    check_list = document.querySelector(".check_list");


// On Scroll
addEventListener("scroll", function () {
    if (window.pageYOffset > 280) {
        check_list.classList.add('fixed');
    } else {
        check_list.classList.remove('fixed');
    }
});



/*Calendar*/
date_now = new Date();

function get_lastday(year, month) {
    return 33 - new Date(year, month, 33).getDate();
}
year_now = date_now.getFullYear();
month_nowInt = date_now.getMonth();
month_now = date_now.toLocaleString('ru', {
    month: 'long'
});
/*воскресенье 7*/
week_day_first = new Date(year_now, month_nowInt, 1).getDay();
week_day_first = week_day_first == 0 ? 7 : week_day_first;
week_now = date_now.getDay() == 0 ? 7 : date_now.getDay();

month_calendar.textContent = month_now.charAt(0).toUpperCase() + month_now.substring(1);
day_now = date_now.getDate();
last_day = get_lastday(year_now, month_nowInt);
last_day_prev = get_lastday(year_now, month_nowInt - 1);



for (let i = 1; i <= last_day_prev; i++) {
    arrDate_first.push(i);
}
arrDate_first = arrDate_first.slice(1 - week_day_first);
day_next_month = 35 - last_day - arrDate_first.length;
arrDate_last = arrDate_last.slice(0, day_next_month);
new Date().toLocaleString('ru', {
    month: 'long'
});


for (let el of arrDate_first) {
    el_items_days += '<div class="item_day flex_conteiner item_no-active">' + el + '</div>'
}

for (let i = 1; i <= last_day; i++) {
    if (i == day_now) {
        el_items_days += '<div class="item_day flex_conteiner item_active">' + i + '</div>';
    } else if (i < day_now) {
        el_items_days += '<div class="item_day flex_conteiner item_no-active">' + i + '</div>'
    }
    else {
        el_items_days += '<div class="item_day flex_conteiner">' + i + '</div>';
    }
}

for (let el of arrDate_last) {
    el_items_days += '<div class="item_day flex_conteiner item_next">' + el + '</div>'
}

items_days.innerHTML = el_items_days;

function create_day_zap(t) {

    data_order.innerHTML += '<div id = "' + day_zap + '-' + month_nowInt + '-' + year_now + '" class="data-order__item">' + day_zap + ' ' + month_now + ' ' + t + '</div>';

}

items_days.addEventListener('click', (e) => {

    if (e.target.matches(".item_no-active")) {
        return
    } else if (e.target.matches(".choose_day")) {
        if (fl_time == 0) {
            let el_id = e.target.textContent + '-' + month_nowInt + '-' + year_now;
            let del_el = document.getElementById(el_id);
            e.target.classList.remove("choose_day");
            del_el.remove();
        } else {
            e.target.classList.remove("choose_day");
            fl_time = 0;
        }

    } else if (e.target.matches(".item_day")) {
        if (fl_time == 0) {
            day_zap = e.target.textContent;
            e.target.classList.add("choose_day");
            fl_time = 1;
        }

    }
})

items_time.addEventListener('click', (e) => {
    if (e.target.matches(".item_time") && fl_time == 1) {
        create_day_zap(e.target.textContent);
        fl_time = 0;
    }
})


