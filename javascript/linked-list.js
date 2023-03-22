class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor(...args) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (args.length) {
      return SinglyLinkedList.from(...args);
    }
  }

  append(...values) {
    for (let value of values) {
      if (value === null || value === undefined) continue;
      this.length++;

      const node = new ListNode(value);

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

  setFirst(value) {
    if (value === null || value === undefined) return;
    this.length++;

    if (!this.head) {
      this.head = new ListNode(value);
      this.tail = this.head;
      return;
    }

    this.head = new ListNode(value, this.head);
  }

  appendAfter(after, value) {
    if (value === null || value === undefined) return;

    const afterNode = this.find(after);

    if (!afterNode) {
      return;
    }

    const node = new ListNode(value, afterNode.next);
    afterNode.next = node;

    this.length++;
  }

  find(value) {
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

  remove(value) {
    if (value === null || value === undefined || !this.head) return false;

    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;

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
        this.length--;
        return true;
      }

      currentNode = currentNode.next;
    }

    return false;
  }

  values() {
    const values = [];

    let currentNode = this.head;

    while (currentNode) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return values;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  includes(value) {
    return !!this.find(value);
  }

  forEach(fn) {
    let currentNode = this.head;
    let i = 0;

    while (currentNode) {
      fn(currentNode, i);
      currentNode = currentNode.next;
      i++;
    }
  }

  map(fn) {
    const singlyLinkedList = new SinglyLinkedList();

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

  filter(fn) {
    const singlyLinkedList = new SinglyLinkedList();

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

  reverse() {
    if (!this.head) return;

    let previousNode = null;
    let currentNode = this.head;
    let nextNode = this.head.next;
    this.tail = this.head;

    while (currentNode.next) {
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
      nextNode = currentNode.next;
    }

    currentNode.next = previousNode;
    this.head = currentNode;
  }

  concat(concatedSinglyLinkedList) {
    const firstSinglyLinkedList = this.clone();
    const secondSinglyLinkedList = concatedSinglyLinkedList.clone();

    if (!firstSinglyLinkedList.tail) {
      return secondSinglyLinkedList;
    }
    
    if (secondSinglyLinkedList.tail) {
      firstSinglyLinkedList.tail.next = secondSinglyLinkedList.head;
      firstSinglyLinkedList.tail = secondSinglyLinkedList.tail;
      firstSinglyLinkedList.length += secondSinglyLinkedList.length;
    }
    
    return firstSinglyLinkedList;
  }

  clone() {
    const singlyLinkedList = new SinglyLinkedList();

    let currentNode = this.head;

    while (currentNode) {
      singlyLinkedList.append(currentNode.value);
      currentNode = currentNode.next;
    }

    return singlyLinkedList;
  }

  static from(...args) {
    const singlyLinkedList = new SinglyLinkedList();
    for (const value of args) {
      singlyLinkedList.append(value);
    }
    
    return singlyLinkedList;
  }
}

// создание пустого списка и добавление элементов
const list = new SinglyLinkedList();
list.append(1, 2, 3);
console.log(list.length); // 3
console.log(list.values()); // [1, 2, 3]

// добавление элемента в начало списка
list.setFirst(0);
console.log(list.length); // 4
console.log(list.values()); // [0, 1, 2, 3]

// добавление элемента после заданного элемента
list.appendAfter(1, 1.5);
console.log(list.length); // 5
console.log(list.values()); // [0, 1, 1.5, 2, 3]

// поиск элемента в списке
const node = list.find(2);
console.log(node); // { value: 2, next: { value: 3, next: null } }

// удаление элемента из списка
list.remove(1.5);
console.log(list.length); // 4
console.log(list.values()); // [0, 1, 2, 3]

// создание списка из массива
const list2 = SinglyLinkedList.from(4, 5, 6);
console.log(list2.values()); // [4, 5, 6]

// объединение двух списков
const list3 = list.concat(list2);
console.log(list3.values()); // [0, 1, 2, 3, 4, 5, 6]

// изменение списка с помощью map
const list4 = list3.map((value) => value * 2);
console.log(list4.values()); // [0, 2, 4, 6, 8, 10, 12]

// фильтрация списка с помощью filter
const list5 = list4.filter((value) => value > 5);
console.log(list5.values()); // [6, 8, 10, 12]

// обращение списка с помощью reverse
list5.reverse();
console.log(list5.values()); // [12, 10, 8, 6]

// получение массива узлов списка
const nodes = list5.toArray();
console.log(nodes); // [{ value: 12, next: {...} }, { value: 10, next: {...} }, { value: 8, next: {...} }, { value: 6, next: null }]

// проверка наличия элемента в списке
console.log(list5.includes(8)); // true
console.log(list5.includes(5)); // false

// перебор элементов списка с помощью forEach
list5.forEach((node, index) => console.log(`node ${index}: ${node.value}`));
// node 0: 12
// node 1: 10
// node 2: 8
// node 3: 6
