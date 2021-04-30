$(window).on('load', function() {

    /* START routing */

    let currentPage = 'home';

    const handler = options => {
        const { page, mode } = options;
        if (currentPage === page) return; // if page is already open

        $(`#${currentPage}`).hide();
        $(`#${page}`).show();

        if (mode === 'p5' && !window[`${page}Instance`]) {
            window[`${page}Instance`] = new p5(window[`${page}Sketch`]);
        } else if (mode === 'js' && !window[`rendered${page}`]) {
            window[`rendered${page}`] = true;
            window[`start${page.capitalizeFirst()}`]();
        }
        currentPage = page;
    };


    // header navigation
    $('.nav-brand').on('click', _ => {
        $(`#${currentPage}`).hide();
        $('#home').show();
        currentPage = 'home';
    });

    // sidebar navigation
    [{ page: 'home', mode: 'p5' },
        { page: 'linkedList', mode: 'p5' },
        { page: 'binaryTree', mode: 'p5' },
        { page: 'spiralArray', mode: 'p5' },
        { page: 'maze', mode: 'js' },
        { page: 'sudoku', mode: 'p5' },
        { page: 'cardioid', mode: 'p5' },
        { page: 'home', mode: 'p5' }
    ].forEach(s => $(`#${s.page}Link`).on('click', _ => handler(s)));

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
    await timer(1500);
    $('#loader').fadeOut();
});