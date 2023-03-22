class QueueNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Добавить элемент в конец очереди
  enqueue(element) {
    let newNode = new QueueNode(element);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  // Удалить первый элемент из очереди и вернуть его
  dequeue() {
    if (this.size === 0) {
      return "Queue is empty";
    }

    let data = this.head.data;
    this.head = this.head.next;

    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    this.size--;

    return data;
  }

  // Возвращает первый элемент из очереди без удаления
  front() {
    if (this.size === 0) {
      return "Queue is empty";
    }

    return this.head.data;
  }

  // Проверяет, является ли очередь пустой
  isEmpty() {
    return this.size === 0;
  }

  // Возвращает размер очереди
  size() {
    return this.size;
  }

  // Выводит содержимое очереди в консоль
  print() {
    let current = this.head;
    let str = "";

    while (current) {
      str += current.data + " ";
      current = current.next;
    }

    console.log(str);
  }
}

let queue = new Queue();

console.log(queue.isEmpty()); // true

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.size); // 3
console.log(queue.front()); // 1

queue.dequeue();
queue.print(); // 2 3
