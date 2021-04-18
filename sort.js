// running multiple p5 instances on same page
// need to use intance mode instead of global
let sortSketch = s => {
    let values = []; // values to sort
    let states = []; // numbers indicating in which state the value is
    // color of corresponding states: [default, pivot, partition]
    const colors = [COLORS['stroke'], COLORS['sortPivot'], COLORS['sortPartition']];
    let slider;

    let w; // bar width on canvas

    s.setup = () => {
        let renderer = s.createCanvas(300, 300);
        renderer.parent('quickSort');
        setupSlider();
        setupButton();

        generate();
    }

    function generate() {
        w = 35 - slider.value();
        values = [];
        let length = Math.floor(s.width / w);
        // fill array with random values
        values = Array.from({ length }, _ => s.random(s.height - 5));
        // fill states with default
        states = new Array(length).fill(0);
    }

    // create a button in canvas
    function setupButton() {
        label = s.createDiv('Sort!');
        label.addClass('sortBtn');
        label.parent('quickSort');
        label.mousePressed(_ => quickSort(values, 0, values.length - 1));
    }

    function setupSlider() {
        label = s.createDiv('Size:');
        label.addClass('sortSlider');
        label.parent('quickSort');

        slider = s.createSlider(2, 30, 25);
        slider.input(_ => generate());

        slider.style('transform', 'translateY(3px)');
        slider.parent(label);
    }

    async function quickSort(arr, s, e) {
        if (s >= e) return; // base case
        // quick sort partition according to the last element of the given array
        let i = await partition(arr, s, e);
        states[i] = 0;

        // recursively sort resulting subarrays
        await Promise.all([
            quickSort(arr, s, i - 1),
            quickSort(arr, i + 1, e)
        ]);
    }

    // given the array, rearrange the subarray [s, e]
    // such that all elements that are smaller than pivot lay on its left side
    async function partition(arr, s, e) {
        // show the set to sort
        for (let i of range(s, e)) {
            states[i] = 2;
        }

        // take as pivot value last element
        let v = arr[e];
        // start from s
        let pivot = s;
        states[pivot] = 1;

        // move the elements less than pivot to its left
        // and find the appropriate index for the pivot
        for (let i of range(s, e)) {
            if (arr[i] < v) {
                await swap(arr, i, pivot);
                states[pivot] = 0;
                pivot++;
                states[pivot] = 1;
            }
        }
        // move pivot to its index
        await swap(arr, pivot, e);

        return pivot;
    }

    async function swap(arr, i, j) {
        await timer(5 * w);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    s.draw = () => {
        s.background(COLORS['section']);

        for (let i of range(0, values.length)) {
            s.fill(colors[states[i]]);
            s.rect(i * w, s.height - values[i], w, values[i]);
        }
    }

}

let sortInstance = new p5(sortSketch);