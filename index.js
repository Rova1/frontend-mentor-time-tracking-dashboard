function update(event) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var timing = event.target.id;
            var selectors = document.getElementsByClassName('selector');
            for (var i = 0; i < selectors.length; i++) {
                selectors[i].classList.remove('active');
            }
            event.target.classList.add('active');
            data = JSON.parse(xhttp.responseText);
            for (var i = 0; i < data.length; i++) {
                var title = data[i].title;
                var cardTitle = document.querySelector('.' + title.toLowerCase().replace(' ','') + ' .card-title');
                cardTitle.textContent = title;
                var currentTime = document.querySelector('.' + title.toLowerCase().replace(' ','') + ' .current-time');
                currentTime.textContent = data[i].timeframes[timing].current + 'hrs';
                var previousTime = document.querySelector('.' + title.toLowerCase().replace(' ','') + ' .previous-time');
                previousTime.textContent = event.target.dataset.timeformat + ' - ' + data[i].timeframes[timing].previous + 'hrs';
            }
        }
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
}

var daily = document.getElementById('daily');
var weekly = document.getElementById('weekly');
var monthly = document.getElementById('monthly');

daily.addEventListener('click', update);
weekly.addEventListener('click', update);
monthly.addEventListener('click', update);