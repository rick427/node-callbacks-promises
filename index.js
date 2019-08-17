const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('File not Found..');
            resolve(data);
        })
    });
}

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file');
            resolve('File was written successfully');
        })
    })
}

//2...
// readFilePromise(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed is ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)

//     })
//     .then(res => {
//         return writeFilePromise('dogImage', res.body.message)
//     })
//     .then(() => {
//         console.log('Random dog image saved to the file');
//     })
//     .catch(err => console.log(err.message))


//1....
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed is ${data}`);

//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .then(res => {
//             console.log(res.body.message);

//             fs.writeFile('dogImage.text', res.body.message, err => {
//                 if (err) return console.log(err.message);
//                 console.log('Random dag saved to files');
//             })
//         })
//         .catch(err => console.log(err.message))
// })

const getDogPicture = async () => {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(`Breed is ${data}`);

        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(res.body.message);

        await writeFilePromise('dogImage.text', res.body.message);
        console.log('Random dag saved to files');
    } catch (error) {
        console.log(error)
        throw err;
    }
    return 'NB: Ready player one'
};

(async () => {
    try {
        console.log('1. Will get dog pics');
        const x = await getDogPicture();
        console.log(x);
        console.log('2. Done getting pics');
    } catch (error) {
        console.log('ERROR!!')
    }
})();

// console.log('1. Will get dog pics');
// getDogPicture().then(x => {
//     console.log(x);
//     console.log('2. Done getting pics');
// })
// .catch(err => console.log('ERROR!!'))