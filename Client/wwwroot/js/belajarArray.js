// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// array one dimensional
let array = [1, 2, 3, 4];
//array multidimensional
let arrayMultiDimensional = ['a', 'b', 'c', [1, 2, 'e'], true];
console.log(array[2]);
console.log(arrayMultiDimensional[3]);

let element = null;
for (let i = 0; i < array.length; i++) {
    element = array[i];
}
console.log(element);

array.push('haloo');
array.push('haloo2');
console.log(array);
array.pop();
console.log(array);
array.unshift('ini didepan');
console.log(array);
array.shift();
console.log(array);

let mahasiswa = {
    nama: "sharon",
    nim: "a12345",
    umur: 23,
    hobby: ['main game', 'nonton film', 'baca komik'],
    isActive: true
}
console.log(mahasiswa);

const user = {};
user.nama = "budi";
user.umur = 30;
console.log(user);

let key = 'umur';
console.log(user);
console.log(user[key]);

//arrow function
const hitung = (num1, num2) => num1 + num2;
const hitung2 = (num, num2) => {
    const jumlah = num1 + num2;
    return jumlah;
}
console.log(hitung(5, 10));
console.log(hitung(7, 10));

const animals = [
    { name: 'Nemo', species: 'fish', class: { name: 'invertebrata' } },
    { name: 'Simba', species: 'Cat', class: { name: 'Mamalia' } },
    { name: 'Dory', species: 'fish', class: { name: 'invertebrata' } },
    { name: 'Panther', species: 'Cat', class: { name: 'Mamalia' } },
    { name: 'Leo', species: 'Cat', class: { name: 'Mamalia' } },
    { name: 'Butterfly', species: 'Rhopalocera', class: { name: 'Insect' } },
    { name: 'GrassHopper', species: 'Orthoptera', class: { name: 'Insect' } },
    { name: 'Dolphin', species: 'Artiodactyla', class: { name: 'Aves' } },
]

console.log(animals[1].class.name);

//Tugas 1
for (i = 0; i < animals.length; i++) {
    if (animals[i].species == "fish") {
        animals[i].class.name = "non-mamalia";
    } else if (animals[i].name == "Dolphin") {
        animals[i].class.name = "mamalia";
    }
}
console.log(animals);

//Tugas 2
const onlyCat = [];
for (i = 0; i < animals.length; i++) {
    if (animals[i].species == "Cat") {
        onlyCat.push(animals[i]);
    }
}
console.log(onlyCat);