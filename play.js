function setupPlay(cells) {
    //start from top left
    let player = cells[0];

    document.addEventListener('keydown', function(e) {
        if (!window.isPlayMode) return;

        var code = e.which || e.keyCode;
        var moves = {
            37: 'left',
            38: 'top',
            39: 'right',
            40: 'bottom'
        };
        move(moves[code]);
    })

    playButton.removeAttribute('disabled');
    playButton.onclick = _ => {
        player = cells[0];
        window.isPlayMode = true;
        play();
    };

    function move(direction) {
        if (!direction) return;
        let neighbours = player.getAllNeighbours();
        // index of each of the neighbour in neighbours array
        const index = {
            top: 0,
            right: 1,
            bottom: 2,
            left: 3
        };
        let moveTo = neighbours[index[direction]];
        // if there is cell to move to, and there is no wall between them
        if (moveTo && player.can(direction)) {
            player.highlight(player.color);
            player = moveTo;
        }
    }

    function play() {
        let frame = requestAnimationFrame(play);
        player.highlight('#008CBA');
        // if reached end -> end game
        if (player === cells[cells.length - 1]) {
            window.isPlayMode = false;
            cancelAnimationFrame(frame);
        }
    }
}