/**
 * Hiding list elements and adding toggle button if necessary.
 * Toggling fade of hidden elements with more/less button.
 */
document.addEventListener('DOMContentLoaded', function() {
    var btnTextMore = 'Показать больше',
        btnTextLess = 'Показать меньше';

    hideListItems(3);

    var btnMoreLess = document.querySelectorAll('.switcher-more'),
        hiddenItems = document.querySelectorAll('.hidden-items');

    for (var i = 0; i < btnMoreLess.length; i++) {
        var btn = btnMoreLess[i];

        btn.addEventListener('click', moreLess);
    }

    for (var j = 0; j < hiddenItems.length; j++) {
        var item = hiddenItems[j];

        // Adding style to hidden list items to use in variable 'visibility' in moreLess() function
        item.style.display = 'none';
    }

    // Fading in/out list items
    function moreLess() {
        var btnSwitcher = this,
            target = this.closest('.list-items').querySelector('.hidden-items'),
            visibility = target.style.display,
            durationMs = 500,
            step = durationMs / 10; // Opacity changes 10 times

        if (visibility == 'none') {
            target.style.opacity = 0;
            target.style.display = 'block';
            increaseVisibility();
        } else if (visibility == 'block') {
            decreaseVisibility();
        }

        function increaseVisibility() {
            var num = 0;
            var switching = setInterval(function() {
                num += 0.1;
                if (num <= 1) {
                    target.style.opacity = num;
                }
                else {
                    clearInterval(switching);
                    target.style.opacity = '';
                    btnSwitcher.innerHTML = btnTextLess;
                }
            }, step);
        }

        function decreaseVisibility() {
            var num = 1;
            var switching = setInterval(function() {
                num -= 0.1;
                if (num >= 0) {
                    target.style.opacity = num;
                }
                else {
                    clearInterval(switching);
                    target.style.opacity = '';
                    target.style.display = 'none';
                    btnSwitcher.innerHTML = btnTextMore;
                }
            }, step);
        }
    }
	
    function hideListItems(quantityVisible) {
        var lists = document.querySelectorAll('.list-items');

        for (var i = 0; i < lists.length; i++) {
            var list = lists[i],
                listItems = lists[i].querySelectorAll('p');

            if (listItems.length > quantityVisible) {
                var contHidden = document.createElement('div'),
                    btnSwitcher = document.createElement('button');

                contHidden.className = 'hidden-items';
                btnSwitcher.className = 'switcher-more';
                list.appendChild(contHidden);
                list.appendChild(btnSwitcher);

                btnSwitcher.appendChild(document.createTextNode(btnTextMore));

                var newParent = list.querySelector('.hidden-items');

                for (var j = quantityVisible; j < listItems.length; j++) {
                    newParent.appendChild(listItems[j]);
                }
            }
        }
    }
});