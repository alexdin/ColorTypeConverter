/**
 * Created by alexdin on 03.05.2017.
 * @author alex_d.93@mail.ru, mralexdin@gmail.com
 */


function colorConvert() {

    this.r = 0;
    this.g = 0;
    this.b = 0;

    this.RgbParseColorFromStr = function (colorString) {
            var rgbArray = colorString.substring(4, colorString.length-1)
                .replace(/ /g, '')
                .split(',');
            this.r = rgbArray[0];
            this.g = rgbArray[1];
            this.b = rgbArray[2];
    }

    this.RgbToHsl =  function (rgbColor) {
        this.RgbParseColorFromStr(rgbColor);
        var rh = this.r/255, gh = this.g/255, bh = this.b/255;
        var Cmax = this.Cmax(rh,gh,bh);
        var Cmin = this.Cmin(rh,gh,bh);
        var delta =  Cmax - Cmin;
        var h = Math.round(this.HslGetH(rh,gh,bh,delta));
        var l = ((Cmax + Cmin) / 2);
        var s = Math.round(this.HslGetS(l,delta)*100);

        return 'hsl('+h+', '+s+'%, '+Math.round(l*100)+'%)';

    };

    this.HslGetH = function (rh,gh,bh,delta) {
        var h = 0;
        var Cmax = this.Cmax(rh,gh,bh), Cmin = this.Cmin(rh,gh,bh);
        if(delta == 0)
            return 0;
        if(Cmax == rh ){
            h = ((gh-bh)/delta)%6;
            // проверить правильно ли посчитан mod6
        }
        if(Cmax == gh){
            h = ((bh - rh)/delta) + 2 ;
        }
        if(Cmax == bh){
            h = ((rh-gh)/delta) + 4 ;
        }
        return 60*h;
    }

    this.HslGetS = function (l,delta) {
        if(delta == 0)
            return 0;

        return delta/(1-Math.abs(2*l-1));
    }

    this.Cmax = function (rh,gh,bh) {
        var max = rh;
        if(max<gh)
            max = gh;
        if(max<bh)
            max = bh;

        return max;
    }
    
    this.Cmin = function (rh,gh,bh) {
        var min = rh;
        if(min>gh)
            min = gh;
        if(min>bh)
            min = bh;

        return min;
    }
    
    this.HexToRgb = function (hexString) {
        if(hexString.length == 7){
            var rh =hexString[1];
            rh = rh+hexString[2];
            console.log(rh);
            var gh = hexString[3];
             gh = gh+hexString[4];
            var bh =hexString[5];
             bh =bh+hexString[6];
            return 'rgb('+parseInt(rh,16)+', '+parseInt(gh,16)+', '+parseInt(bh,16)+')';
        }

    }

    this.HexToHsl = function (hexString) {
        var rgb = this.HexToRgb(hexString);
        return this.RgbToHsl(rgb);
    }
}