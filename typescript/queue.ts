class QueueNode<T> {
  public data: T;
  public next: QueueNode<T> | null = null;
  public prev: QueueNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

class Queue<T> {
  private head: QueueNode<T> | null = null;
  private tail: QueueNode<T> | null = null;
  private _size: number = 0;

  // Добавить элемент в конец очереди
  public enqueue(element: T): void {
    const newNode = new QueueNode(element);

    if (this._size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this._size++;
  }

  // Удалить первый элемент из очереди и вернуть его
  public dequeue(): T | "Queue is empty" {
    if (this._size === 0) {
      return "Queue is empty";
    }

    const data = this.head!.data;
    this.head = this.head!.next;

    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }

    this._size--;

    return data;
  }

  // Возвращает первый элемент из очереди без удаления
  public front(): T | "Queue is empty" {
    if (this._size === 0) {
      return "Queue is empty";
    }

    return this.head!.data;
  }

  // Проверяет, является ли очередь пустой
  public isEmpty(): boolean {
    return this._size === 0;
  }

  // Возвращает размер очереди
  public size(): number {
    return this._size;
  }

  // Выводит содержимое очереди в консоль
  public print(): void {
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