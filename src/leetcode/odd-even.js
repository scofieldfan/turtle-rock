var oddEvenList = function(head) {
    let odd = head,
        evenHead = head.next,
        even = head.next;
    while (even != null && even.next != null) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
};
