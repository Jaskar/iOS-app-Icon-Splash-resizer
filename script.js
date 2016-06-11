window.onload = function() {

    var type = "icon";
    var img = new Image();

    img.onload = function () {
        URL.revokeObjectURL(img.src);

        var sizeArray = null;
        if(type == "icon") sizeArray = CONFIG_ICON;
        else if(type == "splash") sizeArray = CONFIG_SPLASH;
        else return;

        for(var i = 0; i < sizeArray.length; i++) {
            var posY = 0,
                width = 0,
                height = 0,
                name = 0;

            name = sizeArray[i].name;
            width = sizeArray[i].width;

            if(type == "icon") height = width;
            else if(type = "splash") height = sizeArray[i].height;

            var canvas = document.createElement("canvas"),
                ctx = canvas.getContext("2d");

            canvas.width = width;
            canvas.height = height;

            // If the image is in portrait sens
            if(height > width) {
                console.log("ROTATE!");
                ctx.translate(width/2, height/2);
                ctx.rotate(90 * Math.PI/180);

                var temp = height;
                height = width;
                width = temp;

                ctx.translate(-width/2, -height/2);
            }

            // If it's a splash scree, maybe we need to add border, to keep the image aspect / ratio
            if(type == "splash") {
                var ratio = img.height / img.width;
                var marge = height - width * ratio;
                posY = Math.round(marge / 2);

                ctx.beginPath();
                ctx.rect(0, 0, width, posY);
                ctx.rect(0, height - posY, width, posY);
                ctx.fillStyle = "#000000";
                ctx.fill();
            }

            // Draw the image
            ctx.drawImage(
                img, 0, posY,
                width, height - posY*2
            );

            // Then, download the image
            var download = document.createElement("a");
            if(width > 1024 || height > 1024) download.href = canvas.toDataURL('image/jpeg', 0.8);
            else download.href = canvas.toDataURL('image/png', 1.0);
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