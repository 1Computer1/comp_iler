class Queue {
    constructor(limit) {
        this.limit = limit;
        this.tasks = [];
        this.ongoing = 0;
    }

    get length() {
        return this.tasks.length;
    }

    enqueue(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({ task, resolve, reject });
            if (this.ongoing < this.limit) {
                this.process();
            }
        });
    }

    async process() {
        this.ongoing++;
        const { task, resolve, reject } = this.tasks.shift();
        try {
            const x = await task();
            resolve(x);
        } catch (e) {
            reject(e);
        }

        this.ongoing--;
        while (this.ongoing < this.limit && this.tasks.length > 0) {
            this.process();
        }
    }
}

module.exports = Queue;
