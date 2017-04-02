'use strict';

function progress() {
    var progr = document.getElementById('progress');
    var percent = document.getElementById('countText');
    var counter = 5;
    var progress = 25;
    var id = setInterval(frame, 50);

    function frame() {
        if (progress == 500 && counter == 100) {
            clearInterval(id);
            document.getElementById("loader").style.display = "none";
            // document.getElementById("my_page").style.display = "flex";
        } else {
                progress += 5;
                counter += 1;
                progr.style.width = progress + 'px';
                percent.innerHTML = counter + '%';
            }
    }
}

progress();