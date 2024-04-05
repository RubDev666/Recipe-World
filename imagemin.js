import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';

await imagemin(['./images/*.{jpg,png}'], {
	destination: './src/images',
    plugins: [
		imageminJpegtran(),
		imageminPngquant({
			quality: [0.6, 0.8]
		})
	]
});

console.log('Images optimized');

//en la terminal ejecutar - node imagemin.js