(function() {
    var Progress = function(element) {
        this.context = element.getContext("2d");
        this.refElement = element.parentNode;
        this.loaded = 0;
        this.start = 4.72;
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
        this.total = parseInt(this.refElement.dataset.percent, 10);
        this.timer = null;

        this.diff = 0;

        this.init();
    };

    Progress.prototype = {
        init: function() {
            var self = this;
            self.timer = setInterval(function() {
                self.run();
            }, 10); // Reduced delay here
        },
        run: function() {
            var self = this;

            self.diff = ((self.loaded / 100) * Math.PI * 2 * 10).toFixed(2);
            self.context.clearRect(0, 0, self.width, self.height);
            self.context.lineWidth = 6;
            self.context.fillStyle = "white";
            self.context.strokeStyle = "#ffb400";
            self.context.textAlign = "center";

            self.context.fillText(self.loaded + "%", self.width * .5, self.height * .5 + 2, self.width);
            self.context.beginPath();
            self.context.arc(35, 35, 30, self.start, self.diff / 10 + self.start, false);
            self.context.stroke();

            if (self.loaded >= self.total) {
                clearInterval(self.timer);
            }

            self.loaded++;
        }
    };

    var CircularSkillBar = function(elements) {
        this.bars = document.querySelectorAll(elements);
        if (this.bars.length > 0) {
            this.init();
        }
    };

    CircularSkillBar.prototype = {
        init: function() {
            this.tick = 10; // Reduced delay here
            this.progress();
        },
        progress: function() {
            var self = this;
            var index = 0;
            var firstCanvas = self.bars[0].querySelector("canvas");
            var firstProg = new Progress(firstCanvas);

            var timer = setInterval(function() {
                index++;

                var canvas = self.bars[index].querySelector("canvas");
                var prog = new Progress(canvas);

                if (index == self.bars.length) {
                    clearInterval(timer);
                }

            }, self.tick * 100);
        }
    };

    var button = document.getElementById("softs");
    button.addEventListener("click", function() {
        var circularBars = new CircularSkillBar("#sbars .sbar");
    }, false);

    document.addEventListener("DOMContentLoaded", function() {
        var circularBars = new CircularSkillBar("#hbars .hbar");
    });
})();

$(document).ready(function() {
    $("#hards").click(function() {
        $(".sbar")
            .filter(function() {
                return !$(this).is(":hidden");
            })
            .fadeOut(100, function() { // Reduced delay here
                $('.hbar,.hbars').fadeIn(150); // Reduced delay here
            });
        $('#softs').removeClass("bactive");
        $('#hards').addClass("bactive");
    });
    $("#softs").click(function() {
        $(".hbar")
            .filter(function() {
                return !$(this).is(":hidden");
            })
            .fadeOut(100, function() { // Reduced delay here
                $('.sbar,.sbars').fadeIn(150); // Reduced delay here
            });
        $('#hards').removeClass("bactive");
        $('#softs').addClass("bactive");
    });
});
