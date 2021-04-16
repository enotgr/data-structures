class ListNode<T> {
  public value: T;
  public next: ListNode<T> | null;

  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

class SinglyLinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  private _length: number = 0;

  public get length(): number {
    return this._length;
  }

  constructor(...args: T[]) {
    if (args.length) {
      return SinglyLinkedList.from<T>(...args);
    }
  }

  public append(...values: T[]): void {
    for (let value of values) {
      if (value === null || value === undefined) continue;
      this._length++;

      const node = new ListNode<T>(value);

      if (!this.head) {
        this.head = node;
        this.tail = this.head;
        continue;
      }

      if (this.tail) {
        this.tail.next = node;
      }

      this.tail = node;
    }
  }

  public setFirst(value: T): void {
    if (value === null || value === undefined) return;
    this._length++;

    if (!this.head) {
      this.head = new ListNode<T>(value);
      this.tail = this.head;
      return;
    }

    this.head = new ListNode<T>(value, this.head);
  }

  public appendAfter(after: T, value: T): void {
    if (value === null || value === undefined) return;

    const afterNode = this.find(after);

    if (!afterNode) {
      return;
    }

    const node = new ListNode(value, afterNode.next);
    afterNode.next = node;

    this._length++;
  }

  public find(value: T): ListNode<T> | null {
    if (value === null || value === undefined) return null;

    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  public remove(value: T): boolean {
    if (value === null || value === undefined || !this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      this._length--;

      if (!this.length) {
        this.tail = null;
      }

      return true;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      if (currentNode.next.value === value) {
        if (currentNode.next === this.tail) {
          this.tail = currentNode;
        }

        currentNode.next = currentNode.next.next;
        this._length--;
        return true;
      }

      currentNode = currentNode.next;
    }

    return false;
  }

  public values(): T[] {
    const values: T[] = [];

    let currentNode = this.head;

    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return values;
  }

  public toArray(): ListNode<T>[] {
    const nodes: ListNode<T>[] = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  public includes(value: T): boolean {
    return !!this.find(value);
  }

  public forEach(fn: (node: ListNode<T>, index: number) => void): void {
    let currentNode = this.head;
    let i = 0;

    while (currentNode) {
      fn(currentNode, i);
      currentNode = currentNode.next;
      i++;
    }
  }

  public map<R>(fn: (value: T, index: number) => R): SinglyLinkedList<R> {
    const singlyLinkedList = new SinglyLinkedList<R>();

    let currentNode = this.head;
    let i = 0;

    while (currentNode) {
      const changedValue = fn(currentNode.value, i);
      singlyLinkedList.append(changedValue);
      currentNode = currentNode.next;
      i++;
    }

    return singlyLinkedList;
  }

  public filter(fn: (value: T, index: number) => boolean): SinglyLinkedList<T> {
    const singlyLinkedList = new SinglyLinkedList<T>();

    let currentNode = this.head;
    let i = 0;

    while (currentNode) {
      const condition = fn(currentNode.value, i);

      if (!condition) {
        currentNode = currentNode.next;
        continue;
      }

      singlyLinkedList.append(currentNode.value);
      currentNode = currentNode.next;
      i++;
    }

    return singlyLinkedList;
  }

  public reverse(): void {
    if (!this.head) return;

    let previousNode: ListNode<T> | null = null;
    let currentNode = this.head;
    let nextNode = this.head.next;
    this.tail = this.head;

    while (currentNode.next) {
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode!;
      nextNode = currentNode.next;
    }

    currentNode.next = previousNode;
    this.head = currentNode;
  }

  public concat(
    concatedSinglyLinkedList: SinglyLinkedList<T>
  ): SinglyLinkedList<T> {
    const firstSinglyLinkedList = this.clone();
    const secondSinglyLinkedList = concatedSinglyLinkedList.clone();

    if (!firstSinglyLinkedList.tail) {
      return secondSinglyLinkedList;
    }

    if (secondSinglyLinkedList.tail) {
      firstSinglyLinkedList.tail.next = secondSinglyLinkedList.head;
      firstSinglyLinkedList.tail = secondSinglyLinkedList.tail;
      firstSinglyLinkedList._length += secondSinglyLinkedList._length;
    }

    return firstSinglyLinkedList;
  }

  public clone(): SinglyLinkedList<T> {
    const singlyLinkedList = new SinglyLinkedList<T>();

    let currentNode = this.head;

    while (currentNode) {
      singlyLinkedList.append(currentNode.value);
      currentNode = currentNode.next;
    }

    return singlyLinkedList;
  }

  public static from<R>(...args: R[]): SinglyLinkedList<R> {
    const singlyLinkedList = new SinglyLinkedList<R>();

    for (const value of args) {
      singlyLinkedList.append(value);
    }

    return singlyLinkedList;
  }
}

const list = new SinglyLinkedList<string>();
