var Jimp = require("jimp");

var imagePath = process.argv[2];

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

Jimp.read(imagePath, function (err, image) {
    if (err) {
      console.log(err);
    } else {
      console.log('<table style="border-collapse: collapse; width: '+image.bitmap.width+'px; border: 0">');

      for (var j=0; j<image.bitmap.height; j++) {
        console.log('<tr>');

        for (var i= 0; i < image.bitmap.width; i++ ) {
          var pixelColor = Jimp.intToRGBA(image.getPixelColor(i, j));

          console.log('<td style="height: 1px; width: 1px; padding: 0; border: 0; background-color:');
          console.log( rgb2hex('rgb('+pixelColor.r+','+pixelColor.g+','+pixelColor.b+')') );
          console.log('"></td>');
        }
        console.log('</tr>');
      }

      console.log("</table>")
    }
});
