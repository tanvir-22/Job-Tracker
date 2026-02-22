# What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
getElementById works on unique id and it returns an element. getElementsByClassName returns a HTMLCollection, which is dynamic. On the other hand, querySelector returns the first element matching with given id or class. querySelectorAll returns a nodelist ,which is static.

# How do you create and insert a new element into the DOM?
Using document.createElement('element Name') we can create an element and using element.appendChild(createdElement) we can add new element into document. To edit this new element we can use either innerHTML or innerText.

# What is Event Bubbling? And how does it work?
When we add an event listener to a child element the event propagates up to its parent element and this process of propagating is called event bubbling. If we have a button inside a div, if button is clicked then, first it is captured from top to the element where the event is fired, then it starts propagating back to the upper/parent elements.

# What is Event Delegation in JavaScript? Why is it useful?
Event delegation is technique to add event in parent instead of children. It saves memory, because if we keep adding events in all children there will be performance issue. Instead if we add event to parent then all the dynamically created children will also get that event.

# What is the difference between preventDefault() and stopPropagation() methods?
PreventDefault is useful when we don't want the default behavior of browser. For example preventing form submission, stop navigating a link etc. StopPropagation is useful when we want that our element stop event bubbling up which helps us to stop firing the parent elements.

