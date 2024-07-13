$('li').animate({ top: '+=100%' });

$('.fa-bars').click(() => {
    $('aside').animate({ left: '+=16rem' });
    $('.fa-bars').toggleClass('d-none');
    $('.fa-xmark').toggleClass('d-none');

    $('aside li').animate({ top: '-=100%' });
});

$('.fa-xmark, aside li').click(() => {
    $('aside').animate({ left: '-=16rem' });
    $('.fa-xmark').toggleClass('d-none');
    $('.fa-bars').toggleClass('d-none');

    $('aside li').animate({ top: '+=100%' });
});

$('aside li').click((e) => {
    $('.search').addClass('d-none');
    $('.form-holder').addClass('d-none');

    if (e.target.id == `search-link`) {
        $('#main-row').html(``);
        $('.search').removeClass('d-none');
    } else if (e.target.id == `categories-link`) {
        displayCategories(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    } else if (e.target.id == `area-link`) {
        displayAreas(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    } else if (e.target.id == `ingredients-link`) {
        displayIngredients(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    } else if (e.target.id == `contact-link`) {
        $('#main-row').html(``);
        $('.form-holder').removeClass('d-none');
    }

});
