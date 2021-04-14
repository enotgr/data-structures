var ListNode = /** @class */ (function () {
    function ListNode(value, next) {
        if (next === void 0) { next = null; }
        this.value = value;
        this.next = next;
    }
    return ListNode;
}());
var SinglyLinkedList = /** @class */ (function () {
    function SinglyLinkedList() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.head = null;
        this.tail = null;
        this._length = 0;
        if (args.length) {
            return SinglyLinkedList.from.apply(SinglyLinkedList, args);
        }
    }
    Object.defineProperty(SinglyLinkedList.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    SinglyLinkedList.prototype.append = function (value, next) {
        if (next === void 0) { next = null; }
        if (value === null || value === undefined)
            return;
        this._length++;
        var node = new ListNode(value, next);
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
            return;
        }
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
    };
    SinglyLinkedList.prototype.setFirst = function (value) {
        if (value === null || value === undefined)
            return;
        this._length++;
        if (!this.head) {
            this.head = new ListNode(value);
            this.tail = this.head;
            return;
        }
        this.head = new ListNode(value, this.head);
    };
    SinglyLinkedList.prototype.appendAfter = function (after, value) {
        if (value === null || value === undefined)
            return;
        var afterNode = this.find(after);
        if (!afterNode) {
            return;
        }
        var node = new ListNode(value, afterNode.next);
        afterNode.next = node;
        this._length++;
    };
    SinglyLinkedList.prototype.find = function (value) {
        if (value === null || value === undefined)
            return null;
        var currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    };
    SinglyLinkedList.prototype.remove = function (value) {
        if (value === null || value === undefined || !this.head)
            return false;
        if (this.head.value === value) {
            this.head = this.head.next;
            this._length--;
            return true;
        }
        var currentNode = this.head;
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
    };
    SinglyLinkedList.prototype.values = function () {
        var values = [];
        var currentNode = this.head;
        while (currentNode) {
            values.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return values;
    };
    SinglyLinkedList.prototype.includes = function (value) {
        return !!this.find(value);
    };
    SinglyLinkedList.prototype.forEach = function (fn) {
        var currentNode = this.head;
        var i = 0;
        while (currentNode) {
            fn(currentNode, i);
            currentNode = currentNode.next;
            i++;
        }
    };
    SinglyLinkedList.prototype.map = function (fn) {
        var singlyLinkedList = new SinglyLinkedList();
        var currentNode = this.head;
        var i = 0;
        while (currentNode) {
            var changedValue = fn(currentNode.value, i);
            singlyLinkedList.append(changedValue);
            currentNode = currentNode.next;
            i++;
        }
        return singlyLinkedList;
    };
    SinglyLinkedList.prototype.filter = function (fn) {
        var singlyLinkedList = new SinglyLinkedList();
        var currentNode = this.head;
        var i = 0;
        while (currentNode) {
            var condition = fn(currentNode.value, i);
            if (!condition) {
                currentNode = currentNode.next;
                continue;
            }
            singlyLinkedList.append(currentNode.value);
            currentNode = currentNode.next;
            i++;
        }
        return singlyLinkedList;
    };
    SinglyLinkedList.from = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var singlyLinkedList = new SinglyLinkedList();
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var value = args_1[_a];
            singlyLinkedList.append(value);
        }
        return singlyLinkedList;
    };
    return SinglyLinkedList;
}());
var list = new SinglyLinkedList();
