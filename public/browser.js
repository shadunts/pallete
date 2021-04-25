$(window).on('load', function() {

    /* START routing */

    const URL = 'http://localhost:3250';
    let currentPage;

    const handler = page => {
        if (currentPage === page) return; // if page is already open
        else if ($(`#${page}`).length) { // if page has been loaded before
            $(`#${currentPage}`).hide();
            $(`#${page}`).show();
            currentPage = page;
            return;
        }
        $.get(`${URL}/${page}`, html => { // load the page
            $(`#${currentPage}`).hide();
            $('#content').append(html);
            setTimeout(_ => $('#content').show(), 0);
            currentPage = page;
        });
    };

    handler('home');

    // header navigation
    $('.nav-brand').on('click', _ => handler('home'));

    // sidebar navigation
    ['home',
        'linkedList',
        'binaryTree',
        'spiralArray',
        'maze',
        'sudoku',
        'cardioid'
    ].forEach(s => $(`#${s}Link`).on('click', _ => handler(s)));

    /* END routing */

    /* START dom manipulations */

    $('#menu').on('mouseenter', function() {
        $('#menu').addClass('expanded');
        $('#content').css('opacity', '0.6');
    });

    $('#menu').on('mouseleave', function() {
        $('#menu').removeClass('expanded');
        $('#content').css('opacity', '1');
    });

    /* END dom manipulations */
});

$(document).ready(async _ => {
    await timer(800);
    $('#loader').fadeOut();
});