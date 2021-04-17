// running multiple p5 instances on same page
// need to use intance mode instead of global
let linkedListSketch = s => {
    let list;
    s.setup = () => {
        let renderer = s.createCanvas(400, 400);
        renderer.parent('linkedListCtx');
        s.rectMode(s.CENTER);
        s.textAlign(s.CENTER, s.CENTER);

        LinkedList.sketch = s;
        LinkedListNode.sketch = s;

        list = new LinkedList();

        for (let i = 0; i < 18; i++) {
            list.add(i + 1);
        }

        setupReverse();
    }

    // setup the reverse button with callback
    function setupReverse() {
        let button = s.createButton('Reverse');
        button.addClass('nes-btn reverseBtn');
        button.parent('linkedListCtx');
        button.mousePressed(_ => {
            list.reverse();
            s.redraw();
        });
    }

    s.draw = () => {
        s.background(51);
        list.show();
        s.noLoop();
    }

    // insert into linked list functionality
    $('#linkedListInsert').on('keydown', function(e) {
        const $this = $(this);
        const v = $this.val();
        // add node on hiting enter if there is value in input
        if (e.keyCode === 13 && v) {
            list.add(+v);
            $this.val('');
            s.redraw();
        }
    });

    // remove from linked list functionality
    $('#linkedListRemove').on('keydown', function(e) {
        const $this = $(this);
        const v = $this.val();
        // add node on hiting enter if there is value in input
        if (e.keyCode === 13 && v) {
            list.remove(+v);
            $this.val('');
            s.redraw();
        }
    });

    // for visualisation purposes limit the input to 3 digit numbers
    $('#linkedListInsert, #linkedListRemove').on('input', function(e) {
        const $this = $(this);
        const v = $this.val();
        const maxLength = $this.attr('max').length;
        if (v.length > maxLength) {
            $this.val(v.slice(0, maxLength));
        }
    });
}

let linkedListInstance = new p5(linkedListSketch);