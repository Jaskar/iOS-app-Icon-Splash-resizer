window.onload = function() {

    var type = "icon";
    var rotation = false;
    var img = new Image();

    img.onload = function () {
        URL.revokeObjectURL(img.src);

        var originalCanvas = document.createElement("canvas"),
            originalctx = originalCanvas.getContext("2d");

        originalCanvas.height = img.height;
        originalCanvas.width = img.width;

        if(img.width > img.height) rotation = true;

        originalctx.drawImage(
            img, 0, 0,
            img.width, img.height
        );

        var sizeArray = null;
        if(type == "icon") sizeArray = CONFIG_ICON;
        else if(type == "splash") sizeArray = CONFIG_SPLASH;
        else return;

        for(var i = 0; i < sizeArray.length; i++) {
            var posX = 0,
                posY = 0,
                width = 0,
                height = 0,
                name = 0;

            if(type == "icon") {
                var multiplicator = sizeArray[i].substring(sizeArray[i].length-1);
                width = sizeArray[i].substring(0, sizeArray[i].length-2) * multiplicator;
                height = width;

                name = sizeArray[i];
                if(multiplicator == 1) name = name.substring(0, name.length-2);
            }
            else if(type = "splash") {
                name = sizeArray[i].name;

                if(rotation) {
                    width = sizeArray[i].height;
                    height = sizeArray[i].width;
                    var ratio = originalCanvas.height / originalCanvas.width;
                    var marge = height - width * ratio;
                    posY = Math.round(marge / 2);
                }
                else {
                    width = sizeArray[i].width;
                    height = sizeArray[i].height;
                    var ratio = originalCanvas.height / originalCanvas.width;
                    var marge = height - width * ratio;
                    posY = Math.round(marge / 2);
                }
            }

            var resizedCanvas = document.createElement("canvas"),
                resizedctx = resizedCanvas.getContext("2d");

            resizedCanvas.width = width;
            resizedCanvas.height = height;
            resizedctx.drawImage(
                img, posX, posY,
                width - posX*2, height - posY*2
            );
            resizedctx.beginPath();
            if(rotation) {
                resizedctx.rect(0, 0, width, posY);
                resizedctx.rect(0, height - posY, width, posY);
            }
            else {
                resizedctx.rect(0, 0, posX, height);
                resizedctx.rect(width - posX, 0, posX, height);
            }
            resizedctx.fillStyle = "#000000";
            resizedctx.fill();

            var download = document.createElement("a");
            download.href = resizedCanvas.toDataURL();
            download.download = name + ".png";

            download.click();
        }
    };

    var dropBoxIcon = document.getElementById("dropBoxIcon");
    dropBoxIcon.onchange = function(event) {
        type = "icon";
        img.src = URL.createObjectURL(dropBoxIcon.files[0]);
    };

    var dropBoxSplash = document.getElementById("dropBoxSplash");
    dropBoxSplash.onchange = function(event) {
        type = "splash";
        img.src = URL.createObjectURL(dropBoxSplash.files[0]);
    };

};