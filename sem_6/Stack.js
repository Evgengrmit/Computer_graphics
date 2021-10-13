class Stack {
    constructor() {
        this._size = 0;
        this._storage = {};
    }

    push(data) {
        this._size++;
        this._storage[this._size] = data;
    };

    pop() {
        let pop_data;

        if (this._size) {
            pop_data = this._storage[this._size];

            delete this._storage[this._size];
            this._size--;

            return pop_data;
        }
    };

    not_empty() {
        return this._size !== 0;
    }
}